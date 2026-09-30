/* One Tao Xiao Ying guide per scene. Pose assets are derived from the owner's design. */
(() => {
  const home = {
    mountain: [23,74,10,'listen','mountainListen'],
    peach: [29,70,9,'peach','peachPick'],
    song: [25,68,10,'listen','songCall'],
    lantern: [43,80,16,'craft','lanternNext'],
    market: [25,61,9,'wave','marketWalk'],
    newtown: [23,83,8,'wave','newtownShoot']
  };
  const marks = {
    mountain:{mountainListen:[75,73,9],mountainChess:[19,73,9]},
    peach:{peachPick:[17,69,9],peachReset:[17,69,9],peachStory:[67,68,9]},
    song:{songCall:[28,68,11],songOpera:[76,66,10]},
    lantern:{lanternNext:[25,78,15],lanternLight:[82,76,15],lanternCycle:[82,76,15],lanternReset:[43,80,16]},
    market:{marketWalk:[41,60,9],marketMarket:[80,61,9]},
    newtown:{newtownShoot:[75,64,8],newtownReset:[75,64,8],newtownStory:[24,61,8]}
  };
  const responses = {
    mountainListen:['listen','嘘，听溪水流过石头。'], mountainChess:['craft','我陪你落一子。'],
    peachPick:['peach','把桃乡的甜，分你一半！'], peachReset:['wave','果篮收好了，再摘一回。'], peachStory:['listen','来看看我长大的桃园。'],
    songCall:['sing','你一句，我一句，一起应和。'], songOpera:['sing','跟我拍着节拍，看看采茶身段。'],
    lanternNext:['craft','先扎竹骨，再糊灯面。'], lanternLight:['release','灯亮了，抬头看它飞起来！'], lanternCycle:['release','一起看花灯升空。'], lanternReset:['craft','重新摆好材料，再做一盏。'],
    marketWalk:['listen','沿滨河步道慢慢走，听水声、看两岸。'], marketMarket:['wave','到步行街和中心市场逛一逛。'],
    newtownShoot:['release','看我抬手，投一球！'], newtownReset:['wave','轮到新的一局啦！'], newtownStory:['listen','跟我看看连平新城。']
  };
  function speakAsTao(text) {
    const synth=window.speechSynthesis;
    if(!synth || !window.SpeechSynthesisUtterance) return;
    const utterance=new SpeechSynthesisUtterance(text);
    const voices=synth.getVoices();
    const chinese=voices.filter(v=>/^zh([-_]|$)/i.test(v.lang));
    const childVoice=chinese.find(v=>/xiaoshuang|xiaoyou|child|kid|young|童声|童音|小优|小双/i.test(v.name));
    const youthfulVoice=chinese.find(v=>/yaoyao|xiaoxiao|xiaomeng|xiaohan|瑶瑶|小萌|小涵|晓晓/i.test(v.name));
    const softVoice=chinese.find(v=>/huihui|tingting|xiaoyi|慧慧|婷婷|小艺/i.test(v.name));
    const preferred=childVoice||youthfulVoice||softVoice||chinese.find(v=>/female|女/i.test(v.name));
    utterance.voice=preferred||chinese[0]||null;
    utterance.lang=utterance.voice?.lang||'zh-CN';
    // Use a quicker, brighter delivery so the mascot sounds young and playful.
    utterance.rate=1.04;
    utterance.pitch=1.46;
    utterance.volume=.72;
    synth.cancel();
    synth.speak(utterance);
  }
  class TaoGuide {
    constructor() { this.token=0; this.busy=false; this.motion=null; }
    mount(id, root, viewport, act, focus) {
      this.clear(); this.id=id; this.root=root; this.viewport=viewport; this.act=act; this.focus=focus;
      const cfg=home[id]; this.cfg=cfg;
      const el=document.createElement('button'); el.type='button'; el.className='tao-guide';
      el.setAttribute('aria-label','桃小鹰：点击一起体验');
      el.innerHTML='<img class="tao-body" alt="桃小鹰" draggable="false"><span class="tao-bubble" role="status"></span><span class="tao-prop" aria-hidden="true"></span>';
      this.el=el; this.img=el.querySelector('img'); this.bubble=el.querySelector('.tao-bubble');
      this.current={x:cfg[0],y:cfg[1],size:cfg[2]};
      el.addEventListener('click',()=>act(cfg[4])); root.append(el); this.pose(cfg[3]);
      // Keep real image nodes cached so the first action has no empty-frame flicker.
      for(const pose of ['wave','listen','peach','craft','sing','release','climb','walk']){const i=new Image();i.src=`assets/taoxiaoying-${pose}.png?v=20260929b`;}
      this.place();
      const token=this.token;
      requestAnimationFrame(()=>{if(token===this.token) this.enter();});
    }
    pose(name) { if(this.img) this.img.src=`assets/taoxiaoying-${name}.png?v=20260929b`; }
    place() {
      if(!this.el || this.edge) return;
      if(this.busy)return;
      const p=this.current||{x:this.cfg[0],y:this.cfg[1],size:this.cfg[2]};
      this.el.style.left=`${p.x}%`;this.el.style.top=`${p.y}%`;
      this.el.style.height=`${this.root.clientHeight*p.size/100}px`;
    }
    async walkTo(target, token) {
      if(!target || !this.el) return true;
      const [x,y,size]=target, w=this.root.clientWidth, h=this.root.clientHeight;
      const from={x:this.current.x*w/100,y:this.current.y*h/100,size:this.current.size*h/100};
      const to={x:x*w/100,y:y*h/100,size:size*h/100};
      const distance=Math.hypot(to.x-from.x,to.y-from.y);
      if(Math.abs(x-this.current.x)>1) this.el.dataset.facing=x<this.current.x?'left':'right';
      if(distance<18){this.el.style.left=`${to.x}px`;this.el.style.top=`${to.y}px`;this.el.style.height=`${to.size}px`;this.current={x,y,size};return true;}
      this.pose('walk'); this.el.classList.add('walking');
      const duration=Math.max(1000,Math.min(3600,750+distance/0.19));
      const anim=this.el.animate([
        {left:`${from.x}px`,top:`${from.y}px`,height:`${from.size}px`},
        {left:`${to.x}px`,top:`${to.y}px`,height:`${to.size}px`}
      ],{duration,easing:'ease-in-out',fill:'forwards'});
      this.motion=anim;
      let raf=0;
      const follow=()=>{
        if(this.motion!==anim || token!==this.token)return;
        const px=parseFloat(getComputedStyle(this.el).left)||from.x;
        this.focus(px/w*100);
        if(anim.playState!=='finished') raf=requestAnimationFrame(follow);
      };
      raf=requestAnimationFrame(follow);
      try{await anim.finished;}catch{cancelAnimationFrame(raf);return false;}
      cancelAnimationFrame(raf);
      if(token!==this.token || !this.el)return false;
      this.el.style.left=`${to.x}px`;this.el.style.top=`${to.y}px`;this.el.style.height=`${to.size}px`;
      anim.cancel();if(this.motion===anim)this.motion=null;
      this.current={x,y,size};this.el.classList.remove('walking');this.focus(x);
      await new Promise(resolve=>setTimeout(resolve,180));
      return token===this.token;
    }
    async visit(target, label, arrived) {
      if(this.busy || !this.el)return;
      this.busy=true;const token=this.token;
      if(!await this.walkTo(target,token) || token!==this.token){if(token===this.token)this.busy=false;return;}
      this.pose('listen');this.say(`到了${label}。`);
      if(!await this.tween([{transform:'translate(-50%,-100%)'},{transform:'translate(-50%,-104%)'},{transform:'translate(-50%,-100%)'}],{duration:650,easing:'ease-in-out'}) || token!==this.token)return;
      this.el.classList.remove('talking');this.pose(this.cfg[3]);this.busy=false;
      if(arrived)arrived();
    }
    async tween(frames, options) {
      const anim=this.el.animate(frames,{...options,fill:'forwards'}); this.motion=anim;
      try { await anim.finished; } catch { return false; }
      if(this.motion===anim)this.motion=null;
      anim.cancel(); return true;
    }
    say(text, voiced=true) {
      this.bubble.textContent=text;this.el.classList.add('talking');
      if(voiced) speakAsTao(text);
      else window.speechSynthesis?.cancel();
    }
    async enter() {
      if(!this.el)return;
      this.busy=true;this.pose('climb'); this.focus(this.cfg[0]);
      this.say('我是桃小鹰，一起入画吧。');
      const ok=await this.tween([{transform:'translate(-50%, calc(-100% + 100vh)) rotate(-12deg)',opacity:0},{offset:.72,transform:'translate(-50%, -108%) rotate(3deg)',opacity:1},{transform:'translate(-50%,-100%)',opacity:1}],{duration:1400,easing:'ease-out'});
      if(!ok || !this.el)return; this.pose(this.cfg[3]);this.busy=false;this.el.classList.remove('talking');
    }
    async action(action, state, commit, targetOverride, responseOverride, suppressSpeech=false) {
      if(this.busy || !this.el)return;
      this.busy=true;const token=this.token;
      const target=this.id==='lantern'&&action==='lanternNext'
        ? [[25,78,15],[53,76,15],[82,76,15],[43,80,16]][Math.min(state.lanternStage||0,3)]
        : targetOverride || marks[this.id]?.[action];
      if(!await this.walkTo(target,token) || token!==this.token)return;
      this.busy=true;
      let [pose,words]=responses[action] || ['wave','一起看看这里。'];
      if(responseOverride) words=responseOverride;
      if(action==='lanternNext'){
        const n=state.lanternStage||0; pose=n===2?'release':'craft';
        words=['把竹篾一根根扎起来。','慢慢贴好灯面。','灯芯亮了，送它上天空。','收好工具，再做一盏。'][n];
      }
      this.pose(pose);this.say(words,!suppressSpeech); this.el.dataset.action=action;
      this.el.classList.toggle('holding-ball',action==='newtownShoot');
      const craft=pose==='craft';
      const frames=craft?[{transform:'translate(-50%,-100%) rotate(-4deg)'},{transform:'translate(-50%,-100%) rotate(4deg)'},{transform:'translate(-50%,-100%) rotate(-3deg)'},{transform:'translate(-50%,-100%)'}]:[{transform:'translate(-50%,-100%)'},{transform:'translate(-50%,-106%) rotate(-5deg)'},{transform:'translate(-50%,-100%)'}];
      if(!await this.tween(frames,{duration:craft?1000:850,easing:'ease-in-out'}) || token!==this.token)return;
      this.el.classList.remove('holding-ball'); commit();
      if(token!==this.token)return;
      if(action==='lanternNext'||action==='lanternLight'||action==='lanternCycle'){
        this.pose(state.lanternStage===3?'release':'craft');
      }
      const hold=action.startsWith('lantern')?1800:1100;
      if(!await this.tween([{opacity:1},{opacity:1}],{duration:hold}) || token!==this.token)return;
      this.el.classList.remove('talking'); delete this.el.dataset.action;
      this.pose(this.cfg[3]);this.busy=false;
    }
    async leave(done) {
      if(!this.el){done();return;}
      window.speechSynthesis?.cancel();
      this.token++;this.motion?.cancel();this.busy=true;this.pose('climb');this.el.classList.remove('talking');
      const a=this.el.getBoundingClientRect(),v=this.viewport.getBoundingClientRect();
      this.edge=true;this.viewport.append(this.el);this.el.style.left=`${a.left-v.left+a.width/2}px`;this.el.style.top=`${a.bottom-v.top}px`;this.el.style.height=`${a.height}px`;
      const dx=v.width-45-(a.left-v.left+a.width/2),dy=-(a.bottom-v.top)-a.height;
      await this.tween([{transform:'translate(-50%,-100%)'},{offset:.55,transform:`translate(calc(-50% + ${dx}px),-115%) rotate(7deg)`},{transform:`translate(calc(-50% + ${dx}px),calc(-100% + ${dy}px)) rotate(-7deg)`}],{duration:1500,easing:'ease-in-out'});
      this.clear();done();
    }
    clear(){window.speechSynthesis?.cancel();this.token++;this.motion?.cancel();this.el?.remove();this.el=null;this.edge=false;this.busy=false;}
    pause(value){if(this.motion) value?this.motion.pause():this.motion.play();}
  }
  window.TaoGuide=TaoGuide;
})();
