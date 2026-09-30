(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const asset = name => `assets/${name}`;
  const sources = {
    mountain: 'https://www.lianping.gov.cn/zjlp/lyxx/fjms/content/post_597020.html',
    peach: 'https://www.lianping.gov.cn/zwgk/zfdt/lpxw/content/mpost_644824.html',
    market: 'https://www.lianping.gov.cn/zwgk/xxzc/ysz/',
    riverHistory: 'https://www.heyuan.gov.cn/bmjy/hysdfzbgs/tzgg/content/post_268577.html',
    lantern: 'https://www.lianping.gov.cn/zjlp/lpwh/ctxs/content/post_580381.html'
  };

  const scenes = {
    mountain: {
      title: '九连山郊野', eyebrow: '山野 · 溪源', art: 'scene-jiulian-mountain-scroll.png', start: .05,
      storyTitle: '九连山下 · 林溪相依',
      story: '连平山地连绵，溪流穿林而下。沿着山径看林木、田畴与村舍，树荫下还留着邻里对弈、歇脚的日常。', source: sources.mountain,
      stops: [{label:'古树公园',at:0,person:[19,73,9]},{label:'九连山溪',at:.48,person:[75,73,9]},{label:'山麓田园',at:1,person:[91,73,9]}],
      points: [{x:19,y:53,label:'古树下对弈',action:'mountainChess',person:[19,73,9]},{x:75,y:73,label:'溪谷听水',action:'mountainListen',person:[75,73,9]}],
      actions: [{id:'mountainListen',label:'听溪'},{id:'mountainChess',label:'落一子'}]
    },
    peach: {
      title: '上坪桃源', eyebrow: '上坪镇 · 桃园时序', art: 'scene-shangping-peach-scroll.png', start: .04,
      storyTitle: '春看桃花 · 夏尝鹰嘴蜜桃',
      story: '上坪的桃花与鹰嘴蜜桃构成当地鲜明的季节风物。循着桃林小径前行，看看花期与果季如何把山村串起来。', source: sources.peach,
      stops: [{label:'桃林入口',at:0,person:[17,69,9]},{label:'花田深处',at:.5,person:[48,69,9]},{label:'溪畔果园',at:1,person:[83,69,9]}],
      points: [{x:17,y:58,label:'摘一枚蜜桃',action:'peachPick',person:[17,69,9]},{x:67,y:59,label:'看看桃花',action:'peachStory',person:[67,68,9]}],
      actions: [{id:'peachPick',label:'摘蜜桃'},{id:'peachReset',label:'归篮重来'}]
    },
    song: {
      title: '客家声腔', eyebrow: '元善大埠村垇肚倒流水 · 茶山乡音', art: 'scene-lianping-tea-song-scroll.png', start: .13,
      storyTitle: '茶山起歌 · 一唱一和',
      story: '茶垄、山径和村落构成对歌背景。点击“听山歌对答”播放本地连平山歌；采茶戏入口呈现唱演动作，两种声腔分开体验。', source: '',
      stops: [{label:'茶垄山径',at:0,person:[28,68,11]},{label:'茶山歇脚亭',at:.5,person:[52,66,10]},{label:'村巷戏台',at:1,person:[76,66,10]}],
      points: [{x:36,y:68,label:'山歌对答',action:'songCall',person:[28,68,11]},{x:80,y:64,label:'采茶戏唱演',action:'songOpera',person:[76,66,10]}],
      actions: [{id:'songCall',label:'听山歌对答'},{id:'songOpera',label:'听采茶戏'}]
    },
    lantern: {
      title: '忠信花灯', eyebrow: '忠信镇 · 国家级非遗', art: 'scene-zhongxin-lantern-scroll.png', start: .18,
      storyTitle: '竹骨纸面 · 一灯一作',
      story: '忠信花灯以竹篾扎作骨架，结合剪纸、描画、裱糊等工序完成。走近作坊，先扎灯架、再糊灯面，最后点亮灯火。', source: sources.lantern,
      stops: [{label:'花灯作坊',at:0,person:[25,78,15]},{label:'灯市巷口',at:.48,person:[53,76,15]},{label:'花灯巡游',at:1,person:[82,76,15]}],
      points: [{x:25,y:53,label:'扎竹灯骨',action:'lanternNext',person:[25,78,15]},{x:53,y:52,label:'糊灯面',action:'lanternNext',person:[53,76,15]},{x:82,y:61,label:'点亮花灯',action:'lanternLight',person:[82,76,15]}],
      actions: [{id:'lanternNext',label:'制作花灯'},{id:'lanternReset',label:'再做一盏'}]
    },
    market: {
      title: '元善滨河', eyebrow: '两河四岸 · 滨河路亲水步道', art: 'scene-yuanshan-waterfront-scroll.png', start: .23,
      storyTitle: '沿滨河路慢行 · 走进元善街市',
      story: '元善城区以“两河四岸”为脉络，沿滨河路亲水步道慢慢看河岸，再转入步行街与中心市场。这里表现的是当下的沿河散步和街市生活，不设置不符合现状的河上航行。', source: sources.market,
      stops: [{label:'滨河亲水步道',at:0,person:[41,60,9]},{label:'两河四岸',at:.5,person:[59,60,9]},{label:'步行街·中心市场',at:1,person:[80,61,9]}],
      points: [{x:41,y:59,label:'沿滨河步道慢行',action:'marketWalk',person:[41,60,9]},{x:80,y:59,label:'步行街与中心市场',action:'marketMarket',person:[80,61,9]}],
      actions: [{id:'marketWalk',label:'沿河慢行'},{id:'marketMarket',label:'逛步行街'}]
    },
    newtown: {
      title: '连平新城', eyebrow: '三馆一中心 · 体育公园 · 南山', art: 'scene-lianping-newtown-scroll.png', start: .18,
      storyTitle: '新城日常 · 山水相邻',
      story: '文化场馆、体育设施、公园绿地与居住街区共同构成新城生活。由三馆一中心向体育公园慢行，远处山脊仍是连平的风景底色。', source: '',
      stops: [{label:'三馆一中心',at:0,person:[24,61,8]},{label:'体育公园',at:.5,person:[75,64,8]},{label:'南山公园',at:1,person:[91,63,8]}],
      points: [{x:24,y:48,label:'公共文化空间',action:'newtownStory',person:[24,61,8],storyKey:'newtownCulture',response:'先到三馆一中心，看看公共文化空间。'},{x:75,y:55,label:'体育公园投篮',action:'newtownShoot',person:[75,64,8]},{x:91,y:35,label:'南山远眺',action:'newtownStory',person:[91,63,8],storyKey:'newtownMountain',response:'我们到南山公园，看看连平山脊。'}],
      actions: [{id:'newtownShoot',label:'投一球'},{id:'newtownReset',label:'再来一轮'}]
    }
  };

  const waterScenes = new Set(['mountain', 'peach', 'song', 'market', 'newtown']);
  const streamMasks = {
    mountain: 'M558 105 C584 108 607 124 614 147 C620 170 637 190 650 211 C667 237 693 251 730 263 C811 289 894 294 1000 303 L1000 360 C899 352 811 338 733 319 C684 307 645 286 623 257 C601 228 593 197 579 171 C567 148 552 128 558 105 Z',
    peach: 'M0 274 C28 270 52 258 75 259 C101 261 111 292 140 310 C164 324 192 327 224 329 L224 360 L0 360 Z M490 235 C528 239 547 263 563 282 C581 301 606 302 634 313 C677 330 722 329 778 337 C850 347 920 343 1000 350 L1000 360 L490 360 Z',
    song: 'M504 224 C541 226 560 245 575 263 C591 283 613 290 635 301 C671 318 708 317 749 327 C818 345 910 349 1000 356 L1000 360 L520 360 Z',
    market: 'M0 168 C128 174 245 194 372 207 C503 222 615 239 721 253 C825 268 917 286 1000 298 L1000 360 L0 360 Z',
    newtown: 'M0 312 C136 320 269 324 397 322 C468 321 501 314 527 296 C546 283 564 282 580 292 C611 309 628 329 679 333 C787 340 890 334 1000 338 L1000 360 L0 360 Z'
  };

  const atlasView = $('#atlasView');
  const sceneView = $('#sceneView');
  const atlasStage = $('#atlasStage');
  const atlasPicture = $('#atlasPicture');
  const atlasArt = $('#atlasArt');
  const sceneViewport = $('#sceneViewport');
  const sceneWorld = $('#sceneWorld');
  const sceneArt = $('#sceneArt');
  const streamFlows = $('#streamFlows');
  const scenePeople = $('#scenePeople');
  const taoGuide = new window.TaoGuide();
  const storyPanel = $('#sceneStory');
  const storyExtra = $('#storyExtra');
  const toast = $('#toast');
  const worldPoints = $('#worldPoints');
  const sceneActions = $('#sceneActions');
  const sceneStops = $('#sceneStops');
  const weatherCanvas = $('#weatherCanvas');
  const weatherCtx = weatherCanvas.getContext('2d');
  const backgroundMusic = $('#backgroundMusic');
  const fireworksMusic = $('#fireworksMusic');
  const audioFadeState = new WeakMap();
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
  let currentScene = null;
  let camera = 0;
  let cameraMax = 0;
  let cameraStart = 0;
  let zoom = 1;
  let walkDirection = 0;
  let walkHoldAt = 0;
  let autoWalk = false;
  let paused = false;
  let rain = false;
  let night = false;
  let sound = false;
  let musicEnabled = true;
  let musicFailed = false;
  let musicSyncRevision = 0;
  let sceneActionState = {};
  let sceneHasWater = false;
  let toastTimer = 0;
  let audioContext = null;
  let ambientGain = null;
  let rainWidth = 0;
  let rainHeight = 0;
  let lastFrame = 0;

  let visits = 1;
  try {
    visits = Number(localStorage.getItem('lianping-visits') || 0) + 1;
    localStorage.setItem('lianping-visits', String(visits));
  } catch (_) { /* file:// may restrict localStorage; the page still works. */ }
  $('#visitCount').textContent = String(visits).padStart(4, '0');
  $('#sceneVisitCount').textContent = String(visits).padStart(4, '0');

  function toastMessage(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
  }

  function fitAtlas() {
    const box = atlasStage.getBoundingClientRect();
    if (!atlasArt.naturalWidth || !box.width || !box.height) return;
    const scale = Math.max(box.width / atlasArt.naturalWidth, box.height / atlasArt.naturalHeight);
    const width = atlasArt.naturalWidth * scale;
    const height = atlasArt.naturalHeight * scale;
    atlasPicture.style.width = `${width}px`;
    atlasPicture.style.height = `${height}px`;
    atlasPicture.style.left = `${(box.width - width) / 2}px`;
    atlasPicture.style.top = `${(box.height - height) / 2}px`;
    atlasArt.style.width = `${width}px`;
    atlasArt.style.height = `${height}px`;
  }

  function openScene(id) {
    const scene = scenes[id];
    if (!scene) return;
    stopFolkSong(true);
    currentScene = scene;
    currentScene.id = id;
    sceneActionState = {};
    autoWalk = false;
    walkDirection = 0;
    paused = false;
    rain = false;
    night = false;
    zoom = 1;
    sceneHasWater = waterScenes.has(id);
    sound = sceneHasWater;
    sceneView.className = `scene-view scene-${id}${night ? ' night' : ''}`;
    sceneView.hidden = false;
    sceneView.classList.toggle('water-live', sceneHasWater);
    renderStreamFlows(id);
    updateSoundControl();
    setWaterSound(sound, false);
    atlasView.hidden = true;
    atlasView.classList.remove('active');
    atlasView.setAttribute('aria-hidden', 'true');
    syncSiteMusic();
    $('#sceneEyebrow').textContent = scene.eyebrow;
    $('#sceneTitle').textContent = scene.title;
    $('#storyKicker').textContent = `${scene.eyebrow} · 画中记`;
    $('#storyTitle').textContent = scene.storyTitle;
    $('#storyCopy').textContent = scene.story;
    const sourceLink = $('#storySource');
    sourceLink.href = scene.source || '#';
    sourceLink.hidden = !scene.source;
    storyPanel.hidden = true;
    $('#storyToggle').setAttribute('aria-expanded', 'false');
    $('#nightToggle').setAttribute('aria-pressed', String(night));
    $('#rainToggle').setAttribute('aria-pressed', 'false');
    $('#zoomToggle').setAttribute('aria-pressed', 'false');
    $('#motionToggle').setAttribute('aria-pressed', 'false');
    $('#autoWalk').setAttribute('aria-pressed', 'false');
    sceneArt.alt = `${scene.title}互动场景`;
    $('#sceneBackdrop').style.backgroundImage = `url("${asset(scene.art)}")`;
    sceneArt.onload = () => layoutScene(true);
    sceneArt.src = asset(scene.art);
    createStops(scene.stops);
    createHotspots(scene.points);
    createActions(scene.actions);
    // The scene actions are first in the control strip; start at the beginning every time.
    $('.scene-controls').scrollLeft = 0;
    if (id === 'lantern') updateLanternControl(0);
    createPeople(id);
    $('#sceneViewport').focus({ preventScroll: true });
    setTimeout(() => $('#sceneHint').classList.add('show'), 120);
    setTimeout(() => $('#sceneHint').classList.remove('show'), 2800);
    if (sceneArt.complete && sceneArt.naturalWidth) layoutScene(true);
    resizeWeatherCanvas();
  }

  function returnToAtlas() {
    if (sceneView.dataset.leaving === 'true') return;
    sound = false;
    updateSoundControl();
    setWaterSound(false, false);
    sceneView.dataset.leaving = 'true';
    taoGuide.leave(() => { delete sceneView.dataset.leaving; finishReturnToAtlas(); });
  }

  function finishReturnToAtlas() {
    stopFolkSong(true);
    sceneView.hidden = true;
    sceneView.className = 'scene-view';
    atlasView.hidden = false;
    atlasView.classList.add('active');
    atlasView.removeAttribute('aria-hidden');
    currentScene = null;
    syncSiteMusic();
    autoWalk = false;
    walkDirection = 0;
    $('.atlas-journey').scrollLeft = 0;
    closeStory();
    fitAtlas();
  }

  function createStops(items) {
    sceneStops.replaceChildren();
    items.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = item.label;
      button.dataset.at = String(item.at);
      button.setAttribute('aria-current', index === 0 ? 'true' : 'false');
      button.addEventListener('click', () => {
        if (taoGuide.busy) { toastMessage('桃小鹰正在互动，请稍候再前往'); return; }
        if (paused) {
          paused = false;
          sceneView.classList.remove('paused');
          $('#motionToggle').setAttribute('aria-pressed', 'false');
          $('#motionToggle').textContent = 'Ⅱ';
          taoGuide.pause(false);
        }
        autoWalk = false;
        $('#autoWalk').setAttribute('aria-pressed', 'false');
        if (item.person) {
          const [ , y, size] = item.person;
          const center = (cameraMax * item.at + sceneViewport.clientWidth / 2) / Math.max(1, sceneWorld.clientWidth) * 100;
          const target = [Math.max(2, Math.min(98, center)), y, size];
          taoGuide.visit(target, item.label, () => markStop(index));
        } else {
          moveTo(item.at);
          markStop(index);
        }
      });
      sceneStops.append(button);
    });
  }

  function markStop(activeIndex) {
    $$('button', sceneStops).forEach((button, index) => button.setAttribute('aria-current', String(index === activeIndex)));
  }

  function createHotspots(points) {
    worldPoints.replaceChildren();
    points.forEach((point, index) => {
      const button = document.createElement('button');
      button.className = 'scene-hotspot';
      button.type = 'button';
      button.style.setProperty('--x', `${point.x}%`);
      button.style.setProperty('--y', `${point.y}%`);
      button.setAttribute('aria-label', point.label);
      button.dataset.action = point.action;
      button.addEventListener('click', () => perform(point.action, point));
      worldPoints.append(button);
    });
  }

  function createActions(actions) {
    sceneActions.replaceChildren();
    actions.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-control';
      button.dataset.action = item.id;
      button.textContent = item.label;
      if (sceneActions.children.length === 0) button.classList.add('primary-action');
      button.addEventListener('click', () => perform(button.dataset.action));
      sceneActions.append(button);
    });
  }

  function createPeople(id) {
    scenePeople.replaceChildren();
    $('#worldLights').replaceChildren();
    delete $('#worldLights').dataset.lanternStage;
    if (id === 'lantern') {
      [[9,46], [20,57], [33,38], [49,52], [65,43], [78,56], [91,42]].forEach(([x,y], index) => {
        const glow = document.createElement('i');
        glow.className = 'ambient-lantern';
        glow.style.left = `${x}%`;
        glow.style.top = `${y}%`;
        glow.style.setProperty('--delay', `${index * -.47}s`);
        $('#worldLights').append(glow);
      });
    }
    taoGuide.mount(id, scenePeople, sceneViewport, perform, x => {
      autoWalk = false; walkDirection = 0;
      $('#autoWalk').setAttribute('aria-pressed', 'false');
      setCamera(sceneWorld.clientWidth * x / 100 - sceneViewport.clientWidth / 2);
    });
  }

  function positionPeople() {
    taoGuide.place();
  }

  function layoutScene(reset = false) {
    if (!currentScene || !sceneArt.naturalWidth) return;
    const oldProgress = cameraMax > 0 ? camera / cameraMax : currentScene.start;
    const width = sceneViewport.clientWidth;
    const height = sceneViewport.clientHeight;
    const scale = Math.max(width / sceneArt.naturalWidth, height / sceneArt.naturalHeight) * zoom;
    const artWidth = sceneArt.naturalWidth * scale;
    const artHeight = sceneArt.naturalHeight * scale;
    sceneWorld.style.width = `${artWidth}px`;
    sceneWorld.style.height = `${artHeight}px`;
    sceneWorld.style.top = `${(height - artHeight) / 2}px`;
    sceneArt.style.width = `${artWidth}px`;
    sceneArt.style.height = `${artHeight}px`;
    positionPeople(artWidth, artHeight);
    cameraMax = Math.max(0, artWidth - width);
    cameraStart = currentScene.start;
    setCamera(reset ? cameraMax * cameraStart : cameraMax * oldProgress);
  }

  function setCamera(value) {
    camera = Math.max(0, Math.min(cameraMax, value));
    sceneWorld.style.transform = `translate3d(${-camera}px,0,0)`;
    if (cameraMax > 0) {
      const progress = camera / cameraMax;
      const stops = [...sceneStops.querySelectorAll('button')];
      let nearest = 0;
      stops.forEach((stop, index) => {
        if (Math.abs(Number(stop.dataset.at) - progress) < Math.abs(Number(stops[nearest]?.dataset.at ?? 0) - progress)) nearest = index;
      });
      stops.forEach((stop, index) => stop.setAttribute('aria-current', String(index === nearest)));
    }
  }

  function moveTo(progress) { setCamera(cameraMax * Math.max(0, Math.min(1, progress))); }
  function stepCamera(direction, ratio = .17) { setCamera(camera + direction * Math.max(100, sceneViewport.clientWidth * ratio)); }

  function openStory(key = 'default') {
    const scene = currentScene;
    if (!scene) return;
    if (key !== 'song') stopFolkSong(true);
    const stories = {
      default: {title:scene.storyTitle,copy:scene.story,source:scene.source},
      chess: {title:'古树下的对弈',copy:'在古树公园里找一处树荫，和邻里落几手棋。点击棋盘交叉点，黑白轮流应手。',source:sources.mountain},
      peach: {title:'鹰嘴蜜桃 · 桃园采摘',copy:'桃小鹰会走到桃树边采下一枚果子，蜜桃飞进竹篮并更新数量。共三枚；装满后可清篮重来。成熟季节与实际采摘时间以当地公告为准。',source:sources.peach},
      stream: {title:'溪声入画',copy:'九连山地林木与溪谷构成连平山乡的底色。点击“听溪”可让雾气与水纹在画面里流动。',source:sources.mountain},
      song: {title:'连平客家山歌 · 山野应答',copy:'播放陈菊芬、柏菲音乐演唱的《满山满坡都是歌（连平山歌）》。点击“听山歌对答”开始播放，也可使用播放器暂停、拖动和调节音量。',source:''},
      opera: {title:'连平采茶戏 · 一唱众和',copy:'连平采茶戏以客家方言演唱，唱腔融入本地山歌调，并由锣鼓管弦伴奏。此处展示桃小鹰参与唱演的场景动作；页面不把山歌录音错配成采茶戏。',source:''},
      lantern: {title:'忠信花灯制作',copy:'体验顺序：扎竹篾灯架、糊灯面、点亮花灯。忠信花灯的材料和工序说明以县级文化资料为准。',source:sources.lantern},
      riverWalk: {title:'滨河亲水步道',copy:'元善镇以“两河四岸”组织城区空间，滨河路有亲水步道。桃小鹰沿岸慢慢走，水面光纹随步行动起来。',source:sources.market},
      market: {title:'步行街 · 中心市场',copy:'沿滨河路从河岸转入元善步行街和中心市场，看看沿街商铺与日常采买。历史资料记载连平河旧时航运因河道淤塞而停航，这里不再安排河上行船。',source:sources.market},
      newtown: {title:'连平新城',copy:'在三馆一中心、体育中心、体育公园与南山公园之间慢行，看看新城公共空间如何与山水相接。',source:''},
      newtownCulture: {title:'三馆一中心 · 公共文化空间',copy:'桃小鹰带你走近连平新城的公共文化场馆，看看文化、展览与公共服务如何融入日常生活。',source:''},
      newtownMountain: {title:'南山公园 · 山脊远眺',copy:'从新城向南山公园慢行，停在山脚开阔处远眺九连山脉与连平城区。',source:''}
    };
    const data = stories[key] || stories.default;
    $('#storyKicker').textContent = `${scene.eyebrow} · 画中记`;
    $('#storyTitle').textContent = data.title;
    $('#storyCopy').textContent = data.copy;
    $('#storySource').href = data.source || '#';
    $('#storySource').hidden = !data.source;
    storyExtra.replaceChildren();
    if (key === 'chess') renderBoard();
    if (key === 'song') renderRecording('song');
    if (key === 'opera') renderRecording('opera');
    if (key === 'riverWalk' || key === 'market') renderMarketSources();
    storyPanel.hidden = false;
    $('#storyToggle').setAttribute('aria-expanded', 'true');
  }

  function renderRecording(kind) {
    if (kind !== 'song' && kind !== 'opera') return;
    const card = document.createElement('section');
    card.className = 'recording-card';
    const heading = document.createElement('strong');
    heading.textContent = kind === 'song'
      ? '《满山满坡都是歌》（连平山歌） · 陈菊芬、柏菲音乐'
      : '连平采茶戏唱演';
    const note = document.createElement('p');
    if (kind === 'song') {
      note.textContent = '点击“听山歌对答”后开始播放；也可用播放器暂停、拖动或调节音量。';
      const audio = document.createElement('audio');
      audio.id = 'folkSongAudio';
      audio.controls = true;
      audio.preload = 'none';
      audio.volume = .66;
      audio.src = `${asset('audio/lianping-manshan-shange.mp3')}?v=20260929f`;
      audio.setAttribute('aria-label', '播放连平山歌《满山满坡都是歌》');
      card.append(heading, note, audio);
    } else {
      note.textContent = '点击“听采茶戏”体验桃小鹰的唱演动作。当前没有配置连平采茶戏录音，因此不会播放其他地区戏曲或山歌代替。';
      card.append(heading, note);
    }
    storyExtra.append(card);
  }

  function stopFolkSong(reset = false) {
    const audio = $('#folkSongAudio');
    if (!audio) return;
    audio.pause();
    if (reset) {
      try { audio.currentTime = 0; } catch (_) { /* Metadata may not have loaded yet. */ }
    }
  }

  function toggleFolkSong() {
    const audio = $('#folkSongAudio');
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      toastMessage('连平山歌已暂停');
      return;
    }
    const playing = audio.play();
    if (playing?.then) {
      playing.then(() => toastMessage('正在播放《满山满坡都是歌》'))
        .catch(() => toastMessage('播放器暂时无法播放，请检查本地音频文件'));
    }
  }

  function renderMarketSources() {
    const links = document.createElement('div');
    links.className = 'culture-source-links';
    [[sources.market, '元善镇政府：两河四岸与亲水步道'], [sources.riverHistory, '河源市地方志：连平河航运史料']].forEach(([href, label]) => {
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = label;
      links.append(anchor);
    });
    storyExtra.append(links);
  }

  function renderBoard() {
    const board = document.createElement('div');
    board.className = 'mini-board';
    board.setAttribute('aria-label', '点击交叉点落子');
    const status = document.createElement('span');
    status.className = 'board-status';
    status.textContent = '黑先 · 点击棋盘落子';
    let turn = 0;
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.setAttribute('aria-label', `棋盘交叉点 ${i + 1}`);
      cell.addEventListener('click', () => {
        if (cell.dataset.stone) return;
        cell.dataset.stone = turn % 2 === 0 ? 'black' : 'white';
        cell.setAttribute('aria-label', `已落${turn % 2 === 0 ? '黑' : '白'}子`);
        turn++;
        status.textContent = turn % 2 === 0 ? '黑先 · 轮到黑方' : '白方应手';
      });
      board.append(cell);
    }
    storyExtra.append(board, status);
  }

  function closeStory() {
    stopFolkSong();
    storyPanel.hidden = true;
    $('#storyToggle').setAttribute('aria-expanded', 'false');
  }

  function peachIcon() {
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M23 13c4-8 1-10-1-12 8 3 11 8 8 14 8-4 16 1 16 10 0 11-9 20-22 20S2 36 2 25c0-10 9-16 18-11 1-1 2-1 3-1Z" fill="#ef9a69" stroke="#813f31" stroke-width="2"/><path d="M27 13c5-8 12-9 17-7-2 6-8 10-16 10" fill="#71804f" stroke="#48563a" stroke-width="1.5"/><path d="M24 16c-2 10-3 21 0 28" fill="none" stroke="#b6654d" stroke-width="1.4"/><ellipse cx="15" cy="25" rx="5" ry="8" fill="#f5b17f" opacity=".55"/></svg>';
  }

  function renderPeachHarvest(count) {
    const lights = $('#worldLights');
    lights.querySelector('.harvest-basket')?.remove();
    lights.querySelector('.peach-flight')?.remove();
    if (!count) return;
    const basket = document.createElement('div');
    basket.className = 'harvest-basket';
    basket.setAttribute('aria-label', `已摘 ${count} 枚鹰嘴蜜桃`);
    basket.style.left = '24%'; basket.style.top = '61%';
    basket.innerHTML = `<span class="basket-title">桃篮</span><div class="basket-fruits">${Array.from({length:3},(_,i)=>`<span class="basket-fruit ${i<count?'filled':''}">${i<count?peachIcon():'·'}</span>`).join('')}</div><small>${count} / 3 枚</small>`;
    lights.append(basket);
    const fruit = document.createElement('i');
    fruit.className = 'peach-flight';
    fruit.innerHTML = peachIcon();
    fruit.style.left = '17%'; fruit.style.top = '54%';
    lights.append(fruit);
    fruit.addEventListener('animationend', () => fruit.remove(), {once:true});
  }

  function setLanternStage(stage) {
    const lights = $('#worldLights');
    lights.dataset.lanternStage = String(stage);
    sceneView.classList.remove('lantern-frame', 'lantern-paper', 'lanterns-awake');
    if (stage === 1) sceneView.classList.add('lantern-frame');
    if (stage === 2) sceneView.classList.add('lantern-paper');
    if (stage >= 3) sceneView.classList.add('lanterns-awake');
    lights.querySelector('.lantern-workflow')?.remove();
    lights.querySelector('.lantern-flight')?.remove();
    if (!stage) return;
    const work = document.createElement('div');
    work.className = `lantern-workflow stage-${stage}`;
    const [workX, workY] = [[25,78],[53,76],[82,76]][Math.min(stage,3)-1];
    work.style.left = `${workX}%`; work.style.top = `${workY}%`;
    work.setAttribute('aria-hidden', 'true');
    if (stage === 3) {
      work.innerHTML = `<span class="lantern-complete"><img src="${asset('zhongxin-lantern-flight.png')}" alt=""></span><span class="lantern-step"></span>`;
    } else {
      work.innerHTML = '<i class="lantern-top"></i><i class="lantern-rib r1"></i><i class="lantern-rib r2"></i><i class="lantern-rib r3"></i><i class="lantern-rib r4"></i><i class="lantern-tassel"></i><span class="lantern-step"></span>';
    }
    lights.append(work);
    if (stage === 3) {
      const lantern = work.querySelector('.lantern-complete');
      requestAnimationFrame(() => lantern?.classList.add('lantern-rising'));
      lantern?.addEventListener('animationend', () => lantern.remove(), {once:true});
    }
  }

  function updateLanternControl(stage) {
    const button = sceneActions.querySelector('[data-lantern-primary="true"]') || sceneActions.querySelector('[data-action="lanternNext"]');
    if (!button) return;
    const labels = ['扎竹骨', '糊灯面', '点花灯', '再做一盏'];
    button.textContent = labels[Math.min(stage, 3)];
    button.dataset.lanternPrimary = 'true';
    button.dataset.action = 'lanternNext';
  }

  function renderScoreboard() {
    const lights = $('#worldLights');
    lights.querySelector('.court-score')?.remove();
    const score = document.createElement('div');
    score.className = 'court-score';
    score.textContent = `投篮 ${sceneActionState.shots || 0} / 3 · 命中 ${sceneActionState.score || 0}`;
    lights.append(score);
  }

  function getAudioContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContext) audioContext = new AudioCtx();
    return audioContext;
  }

  function playNotes(notes, wave = 'sine', volume = .035) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const start = ctx.currentTime;
    notes.forEach(([frequency, duration = .2, delay = 0]) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const at = start + delay;
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, at);
      gain.gain.setValueAtTime(.0001, at);
      gain.gain.exponentialRampToValueAtTime(volume, at + .025);
      gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(at);
      oscillator.stop(at + duration + .03);
    });
  }

  function playInteractionSound(action) {
    switch (action) {
      case 'mountainListen': playNotes([[392,.38,0],[523,.42,.28],[440,.55,.6]], 'sine', .025); break;
      case 'mountainChess': playNotes([[247,.16,0],[196,.18,.08]], 'triangle', .04); break;
      case 'peachPick': playNotes([[659,.14,0],[784,.18,.13],[988,.25,.28]], 'sine', .03); break;
      case 'peachReset': playNotes([[523,.16,0],[392,.2,.14],[330,.25,.3]], 'triangle', .03); break;
      case 'peachStory': playNotes([[523,.18,0],[659,.22,.14]], 'sine', .025); break;
      case 'lanternNext': {
        const stage = sceneActionState.lanternStage || 0;
        if (stage === 0) playNotes([[330,.09,0],[330,.09,.16],[392,.14,.34],[440,.18,.52]], 'triangle', .032);
        else if (stage === 1) playNotes([[587,.16,0],[659,.2,.19],[784,.25,.43]], 'sine', .028);
        else if (stage === 2) playNotes([[440,.14,0],[659,.18,.15],[880,.22,.32],[1175,.4,.52]], 'sine', .035);
        else playNotes([[523,.18,0],[392,.2,.17],[293,.28,.34]], 'triangle', .028);
        break;
      }
      case 'lanternLight': case 'lanternCycle':
        if ((sceneActionState.lanternStage || 0) < 2) playNotes([[293,.2,0],[247,.25,.16]], 'triangle', .03);
        else playNotes([[440,.14,0],[659,.18,.15],[880,.22,.32],[1175,.4,.52]], 'sine', .035);
        break;
      case 'lanternReset': playNotes([[523,.18,0],[392,.2,.17],[293,.28,.34]], 'triangle', .028); break;
      case 'marketStory': case 'newtownStory': playNotes([[523,.18,0],[659,.22,.15]], 'sine', .025); break;
      case 'newtownShoot': playNotes([[196,.12,0],[392,.16,.13],[587,.22,.28]], 'triangle', .035); break;
      case 'newtownReset': playNotes([[392,.16,0],[523,.19,.15]], 'triangle', .03); break;
    }
  }

  function perform(action, point = null) {
    if (!currentScene || sceneView.dataset.leaving === 'true') return;
    if (paused) {
      paused = false; sceneView.classList.remove('paused');
      $('#motionToggle').setAttribute('aria-pressed','false');
      $('#motionToggle').textContent='Ⅱ';
      taoGuide.pause(false);
    }
    if (taoGuide.busy) {
      toastMessage('桃小鹰还在行动，请稍候');
      return;
    }
    if (action === 'peachPick' && (sceneActionState.peaches || 0) >= 3) {
      toastMessage('桃篮已满，先点“归篮重来”');
      return;
    }
    if (action === 'newtownShoot' && (sceneActionState.shots || 0) >= 3) {
      toastMessage('本轮三球已结束，点击“再来一轮”');
      return;
    }
    if (action === 'songCall') {
      if (!$('#folkSongAudio')) openStory('song');
      else if (storyPanel.hidden) {
        storyPanel.hidden = false;
        $('#storyToggle').setAttribute('aria-expanded', 'true');
      }
      toggleFolkSong();
    } else if (action === 'songOpera') {
      stopFolkSong(true);
    }
    if (action === 'newtownStory' && point?.storyKey) sceneActionState.newtownStory = point.storyKey;
    playInteractionSound(action);
    taoGuide.action(action, sceneActionState, () => executeAction(action), point?.person, point?.response, action === 'songCall' || action === 'songOpera');
  }

  function executeAction(action) {
    if (!currentScene) return;
    switch (action) {
      case 'mountainListen':
        sceneView.classList.toggle('mist-on');
        toastMessage(sceneView.classList.contains('mist-on') ? '山雾沿着溪谷缓缓散开' : '雾收山静，溪声仍在');
        openStory('stream');
        break;
      case 'mountainChess': openStory('chess'); break;
      case 'peachPick': {
        const picked = Math.min(3, (sceneActionState.peaches || 0) + 1);
        sceneActionState.peaches = picked;
        sceneView.classList.toggle('peaches-picked', picked > 0);
        renderPeachHarvest(picked);
        toastMessage(picked < 3 ? `摘下第 ${picked} 枚鹰嘴蜜桃 · 共 3 枚` : '三枚桃子入篮，桃园采摘完成');
        break;
      }
      case 'peachReset': sceneActionState.peaches = 0; sceneView.classList.remove('peaches-picked'); renderPeachHarvest(0); toastMessage('桃篮已清空，再去树间寻果'); break;
      case 'peachStory': openStory('peach'); break;
      case 'songCall':
        sceneView.classList.toggle('song-answer');
        toastMessage(sceneView.classList.contains('song-answer') ? '桃小鹰起歌，茶亭那边接声应和' : '山歌应答停下了');
        break;
      case 'songOpera':
        sceneView.classList.toggle('performing');
        toastMessage(sceneView.classList.contains('performing') ? '采茶戏唱演开始：一唱众和、锣鼓相伴' : '采茶戏唱演收住');
        openStory('opera');
        break;
      case 'lanternNext': {
        if ((sceneActionState.lanternStage || 0) >= 3) {
          executeAction('lanternReset');
          break;
        }
        const stage = Math.min(3, (sceneActionState.lanternStage || 0) + 1);
        sceneActionState.lanternStage = stage;
        const steps = [null,
          ['第一步 · 扎竹骨', '竹篾从灯架向外撑开，花灯骨架成形。下一步糊灯面。'],
          ['第二步 · 糊灯面', '纸面从骨架上慢慢铺开，花纹与灯色逐渐显现。下一步点花灯。'],
          ['第三步 · 点花灯', '灯芯亮起，花灯离开作坊上升，融入夜空。']
        ];
        const [title, copy] = steps[stage];
        $('#storyTitle').textContent = title;
        $('#storyCopy').textContent = copy;
        setLanternStage(stage);
        updateLanternControl(stage);
        toastMessage(stage === 1 ? '竹篾骨架扎好了' : stage === 2 ? '灯面糊贴完成' : '花灯点亮，正向夜空升起');
        break;
      }
      case 'lanternLight': case 'lanternCycle':
        if ((sceneActionState.lanternStage || 0) < 2) {
          toastMessage('先扎好竹骨、糊好灯面，再点灯');
          openStory('lantern');
        } else {
          sceneActionState.lanternStage = 3;
          setLanternStage(3);
          updateLanternControl(3);
          toastMessage('忠信花灯点亮了');
          openStory('lantern');
        }
        break;
      case 'lanternReset': sceneActionState.lanternStage = 0; setLanternStage(0); updateLanternControl(0); toastMessage('灯架复原，可以再做一盏'); break;
      case 'marketWalk':
        sceneView.classList.toggle('market-walk');
        sceneView.classList.remove('market-market');
        toastMessage(sceneView.classList.contains('market-walk') ? '桃小鹰沿滨河亲水步道慢慢走，河面光影轻轻起伏' : '停在滨河步道边看一会儿水');
        openStory('riverWalk');
        break;
      case 'marketMarket':
        sceneView.classList.add('market-market');
        sceneView.classList.remove('market-walk');
        toastMessage('转入元善步行街与中心市场');
        openStory('market');
        break;
      case 'newtownShoot': shootBasket(); break;
      case 'newtownReset': sceneActionState.shots = 0; sceneActionState.score = 0; renderScoreboard(); toastMessage('记分已归零，再投三球'); break;
      case 'newtownStory': openStory(sceneActionState.newtownStory || 'newtownCulture'); break;
      default: openStory();
    }
  }

  function shootBasket() {
    if ((sceneActionState.shots || 0) >= 3) { toastMessage('本轮三球已结束，点击“再来一轮”'); return; }
    const attempt = (sceneActionState.shots || 0) + 1;
    const made = [true, false, true][attempt - 1];
    sceneActionState.shots = attempt;
    sceneActionState.score = (sceneActionState.score || 0) + Number(made);
    renderScoreboard();
    sceneView.classList.add('basketball');
    const ball = document.createElement('div');
    ball.className = 'ball-flight';
    sceneViewport.append(ball);
    ball.addEventListener('animationend', () => {
      ball.remove();
      if (!$('.ball-flight')) sceneView.classList.remove('basketball');
    }, {once:true});
    toastMessage(`${attempt} / 3 · ${made ? '命中，球入篮' : '擦框而过，再试试'}`);
    if (attempt === 3) setTimeout(() => toastMessage(`三球结束 · 命中 ${sceneActionState.score} 球`), 1200);
  }

  function resizeWeatherCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    rainWidth = sceneViewport.clientWidth;
    rainHeight = sceneViewport.clientHeight;
    weatherCanvas.width = Math.max(1, Math.round(rainWidth * ratio));
    weatherCanvas.height = Math.max(1, Math.round(rainHeight * ratio));
    weatherCanvas.style.width = `${rainWidth}px`;
    weatherCanvas.style.height = `${rainHeight}px`;
    weatherCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawRain(now) {
    weatherCtx.clearRect(0, 0, rainWidth, rainHeight);
    if (!rain || paused) return;
    weatherCtx.lineWidth = 1;
    weatherCtx.strokeStyle = 'rgba(231,238,226,.38)';
    weatherCtx.beginPath();
    const count = Math.floor(rainWidth * rainHeight / 12500);
    for (let i = 0; i < count; i++) {
      const x = (i * 97.3 + now * .085) % (rainWidth + 40) - 20;
      const y = (i * 53.7 + now * .32) % (rainHeight + 20) - 10;
      weatherCtx.moveTo(x, y);
      weatherCtx.lineTo(x - 5, y + 13);
    }
    weatherCtx.stroke();
  }

  function renderStreamFlows(sceneId) {
    if (!streamFlows) return;
    streamFlows.replaceChildren();
    const maskShape = streamMasks[sceneId];
    if (!waterScenes.has(sceneId) || !maskShape || !scenes[sceneId]?.art) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(svgNS, 'defs');
    const clip = document.createElementNS(svgNS, 'clipPath');
    const clipId = `stream-clip-${sceneId}`;
    clip.id = clipId;
    clip.setAttribute('clipPathUnits', 'userSpaceOnUse');
    const water = document.createElementNS(svgNS, 'path');
    water.setAttribute('d', maskShape);
    clip.append(water);
    defs.append(clip);
    const filter = document.createElementNS(svgNS, 'filter');
    const filterId = `stream-current-${sceneId}`;
    filter.id = filterId;
    filter.setAttribute('x', '0'); filter.setAttribute('y', '0');
    filter.setAttribute('width', '1000'); filter.setAttribute('height', '360');
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    const turbulence = document.createElementNS(svgNS, 'feTurbulence');
    turbulence.setAttribute('type', 'fractalNoise');
    turbulence.setAttribute('baseFrequency', '.012 .03');
    turbulence.setAttribute('numOctaves', '1');
    turbulence.setAttribute('seed', '5');
    turbulence.setAttribute('result', 'water-noise');
    const textureMotion = document.createElementNS(svgNS, 'animate');
    textureMotion.setAttribute('attributeName', 'baseFrequency');
    textureMotion.setAttribute('values', '.012 .03;.02 .018;.012 .03');
    textureMotion.setAttribute('dur', '10s');
    textureMotion.setAttribute('repeatCount', 'indefinite');
    turbulence.append(textureMotion);
    const displace = document.createElementNS(svgNS, 'feDisplacementMap');
    displace.setAttribute('in', 'SourceGraphic');
    displace.setAttribute('in2', 'water-noise');
    displace.setAttribute('scale', '1.5');
    displace.setAttribute('xChannelSelector', 'R');
    displace.setAttribute('yChannelSelector', 'G');
    const rippleMotion = document.createElementNS(svgNS, 'animate');
    rippleMotion.setAttribute('attributeName', 'scale');
    rippleMotion.setAttribute('values', '1.1;2.6;1.1');
    rippleMotion.setAttribute('dur', '6.8s');
    rippleMotion.setAttribute('repeatCount', 'indefinite');
    displace.append(rippleMotion);
    filter.append(turbulence, displace);
    defs.append(filter);
    streamFlows.append(defs);
    const movingWater = document.createElementNS(svgNS, 'image');
    movingWater.setAttribute('class', 'stream-water-copy');
    movingWater.setAttribute('x', '0'); movingWater.setAttribute('y', '0');
    movingWater.setAttribute('width', '1000'); movingWater.setAttribute('height', '360');
    movingWater.setAttribute('preserveAspectRatio', 'none');
    movingWater.setAttribute('href', asset(scenes[sceneId].art));
    movingWater.setAttribute('clip-path', `url(#${clipId})`);
    movingWater.setAttribute('filter', `url(#${filterId})`);
    streamFlows.append(movingWater);
  }

  function setWaterSound(active, notifyUnsupported = false) {
    if (!active && !ambientGain) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      if (notifyUnsupported) toastMessage('此浏览器不支持流水声');
      return;
    }
    if (!audioContext) audioContext = new AudioCtx();
    if (!ambientGain) {
      const bufferLength = audioContext.sampleRate * 5;
      const buffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * .32;
      const fadeLength = Math.floor(audioContext.sampleRate * .08);
      for (let i = 0; i < fadeLength; i++) {
        const index = bufferLength - fadeLength + i;
        const mix = i / fadeLength;
        data[index] = data[index] * (1 - mix) + data[i] * mix;
      }
      const noise = audioContext.createBufferSource();
      const body = audioContext.createBiquadFilter();
      const low = audioContext.createBiquadFilter();
      const high = audioContext.createBiquadFilter();
      const highSoft = audioContext.createBiquadFilter();
      const lowGain = audioContext.createGain();
      const highGain = audioContext.createGain();
      const mix = audioContext.createGain();
      ambientGain = audioContext.createGain();
      noise.buffer = buffer;
      noise.loop = true;
      body.type = 'highpass';
      body.frequency.value = 105;
      low.type = 'lowpass';
      low.frequency.value = 720;
      high.type = 'highpass';
      high.frequency.value = 560;
      highSoft.type = 'lowpass';
      highSoft.frequency.value = 2100;
      lowGain.gain.value = .56;
      highGain.gain.value = .2;
      ambientGain.gain.value = 0;
      noise.connect(body);
      body.connect(low).connect(lowGain).connect(mix);
      body.connect(high).connect(highSoft).connect(highGain).connect(mix);
      mix.connect(ambientGain).connect(audioContext.destination);
      noise.start();
    }
    audioContext.resume().then(() => {
      ambientGain.gain.cancelScheduledValues(audioContext.currentTime);
      ambientGain.gain.setTargetAtTime(active && sceneHasWater ? .16 : 0, audioContext.currentTime, .7);
    }).catch(() => {
      if (notifyUnsupported) toastMessage('无法启动流水声，请再点一次声音按钮');
    });
  }

  function fadeAudioTrack(audio, target, duration = 900, onComplete) {
    if (!audio) return;
    const previous = audioFadeState.get(audio);
    if (previous?.frame) cancelAnimationFrame(previous.frame);
    const state = { frame: 0 };
    audioFadeState.set(audio, state);
    const from = audio.volume;
    const start = performance.now();
    const step = now => {
      if (audioFadeState.get(audio) !== state) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = t * t * (3 - 2 * t);
      audio.volume = from + (target - from) * eased;
      if (t < 1) {
        state.frame = requestAnimationFrame(step);
        return;
      }
      audio.volume = target;
      audioFadeState.delete(audio);
      onComplete?.();
    };
    state.frame = requestAnimationFrame(step);
  }

  function siteTrackShouldPlay(audio) {
    const onAtlas = !atlasView.hidden && atlasView.classList.contains('active');
    return musicEnabled && ((audio === backgroundMusic && !onAtlas) || (audio === fireworksMusic && onAtlas));
  }

  function startSiteTrack(audio, target, revision) {
    if (!audio) return;
    if (!audio.paused) {
      fadeAudioTrack(audio, target);
      return;
    }
    audio.volume = 0;
    Promise.resolve(audio.play()).then(() => {
      if (revision !== musicSyncRevision) {
        if (!siteTrackShouldPlay(audio)) fadeAudioTrack(audio, 0, 500, () => audio.pause());
        return;
      }
      fadeAudioTrack(audio, target);
    }).catch(() => {
      if (revision !== musicSyncRevision) return;
      musicEnabled = false;
      musicFailed = true;
      updateMusicControls();
      syncSiteMusic();
      if (!sceneView.hidden) toastMessage('音乐暂时无法播放，再点一次音乐按钮试试');
    });
  }

  function stopSiteTrack(audio) {
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0;
      return;
    }
    fadeAudioTrack(audio, 0, 700, () => {
      if (!siteTrackShouldPlay(audio)) audio.pause();
    });
  }

  function syncSiteMusic() {
    const revision = ++musicSyncRevision;
    if (!musicEnabled) {
      stopSiteTrack(backgroundMusic);
      stopSiteTrack(fireworksMusic);
      return;
    }
    const onAtlas = !atlasView.hidden && atlasView.classList.contains('active');
    if (onAtlas) {
      // Keep the creek-like daytime ambience off the homepage; let the fireworks music lead.
      stopSiteTrack(backgroundMusic);
      startSiteTrack(fireworksMusic, .28, revision);
    } else {
      startSiteTrack(backgroundMusic, .18, revision);
      stopSiteTrack(fireworksMusic);
    }
  }

  function updateMusicControls() {
    const homeLabel = musicEnabled ? '关闭首页烟花音乐' : '开启首页烟花音乐';
    const sceneLabel = musicEnabled ? '关闭场景背景音乐' : '开启场景背景音乐';
    const homeButton = $('#homeMusicToggle');
    const sceneButton = $('#sceneMusicToggle');
    if (homeButton) {
      homeButton.setAttribute('aria-pressed', String(musicEnabled));
      homeButton.setAttribute('aria-label', homeLabel);
      homeButton.title = musicFailed ? '音频未能播放，点击重试' : homeLabel;
      $('.music-label', homeButton).textContent = musicFailed ? '重试音乐' : (musicEnabled ? '关闭音乐' : '开启音乐');
    }
    if (sceneButton) {
      sceneButton.setAttribute('aria-pressed', String(musicEnabled));
      sceneButton.setAttribute('aria-label', sceneLabel);
      sceneButton.title = musicFailed ? '音频未能播放，点击重试' : sceneLabel;
    }
  }

  function toggleSiteMusic() {
    musicFailed = false;
    musicEnabled = !musicEnabled;
    updateMusicControls();
    syncSiteMusic();
    if (!musicEnabled) removeMusicGestureFallback();
    if (!sceneView.hidden) toastMessage(musicEnabled ? '背景音乐已开启，首页烟花声会在返回全景时播放' : '背景音乐已关闭');
  }

  function removeMusicGestureFallback() {
    window.removeEventListener('click', retrySiteMusicFromGesture);
  }

  function retrySiteMusicFromGesture(event) {
    if (event.target.closest?.('#homeMusicToggle, #sceneMusicToggle')) return;
    if (musicFailed) {
      musicEnabled = true;
      musicFailed = false;
      updateMusicControls();
      syncSiteMusic();
      return;
    }
    if (!musicEnabled) return;
    const onAtlas = !atlasView.hidden && atlasView.classList.contains('active');
    const activeTrack = onAtlas ? fireworksMusic : backgroundMusic;
    if (activeTrack.paused) syncSiteMusic();
  }

  function updateSoundControl() {
    const button = $('#soundToggle');
    if (!button) return;
    const available = sceneHasWater;
    button.disabled = !available;
    button.setAttribute('aria-pressed', String(Boolean(sound && available)));
    const label = available ? (sound ? '关闭流水声' : '开启流水声') : '当前画面没有溪流水声';
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  function toggleSound() {
    if (!sceneHasWater) return;
    sound = !sound;
    updateSoundControl();
    setWaterSound(sound, true);
    toastMessage(sound ? '溪流声已开启' : '溪流声已关闭');
  }

  function animationFrame(now) {
    taoGuide.pause(paused);
    const dt = lastFrame ? Math.min(48, now - lastFrame) : 16;
    lastFrame = now;
    if (currentScene && !paused) {
      if (walkDirection) {
        sceneWorld.classList.add('moving');
        setCamera(camera + walkDirection * dt * .22);
      } else if (autoWalk) {
        sceneWorld.classList.add('moving');
        let next = camera + dt * .045;
        if (next >= cameraMax) next = 0;
        setCamera(next);
      } else {
        sceneWorld.classList.remove('moving');
      }
      drawRain(now);
    } else {
      sceneWorld.classList.remove('moving');
    }
  }

  // Subtle fireworks stay above the distant roofline; particles never fall over the town.
  const fireCanvas = $('#atlasFireworks');
  const fireCtx = fireCanvas.getContext('2d');
  let fireW = 0, fireH = 0, fireLast = 0;
  const fireworks = [];
  const launches = [];
  function resizeFireworks() {
    const rect = atlasStage.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    fireW = rect.width; fireH = rect.height;
    fireCanvas.width = Math.round(fireW * ratio); fireCanvas.height = Math.round(fireH * ratio);
    fireCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function burstFirework(now, x, y, color) {
    const particleCount = 50;
    for (let i=0;i<particleCount;i++) {
      const angle = Math.PI * 2 * i / particleCount;
      const speed = 60 + Math.random() * 55;
      fireworks.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:72+Math.random()*32,color,start:now});
    }
  }
  function launchFirework(now) {
    const sites = [.12,.25,.4,.6,.75,.88];
    const color = ['#ffe2a2','#f3c878','#fff0cc','#f1b89c','#dfc5ff'][Math.floor(Math.random()*5)];
    launches.push({x:fireW*sites[Math.floor(Math.random()*sites.length)],y:fireH*.43,targetY:fireH*(.06+Math.random()*.13),start:now,duration:690+Math.random()*270,color});
  }
  function drawFireworks(now) {
    fireCtx.clearRect(0,0,fireW,fireH);
    if (reduceMotion || !atlasView.classList.contains('active')) return;
    if (now-fireLast > 820 + Math.random()*420) {
      const volleys = Math.random() > .42 ? 2 : 1;
      for (let volley=0; volley<volleys && launches.length<5; volley++) launchFirework(now);
      fireLast = now;
    }
    for (let i=launches.length-1;i>=0;i--) {
      const rocket = launches[i];
      const t = Math.min(1,(now-rocket.start)/rocket.duration);
      const y = rocket.y+(rocket.targetY-rocket.y)*(1-(1-t)*(1-t));
      fireCtx.globalAlpha=.35+t*.65; fireCtx.strokeStyle=rocket.color; fireCtx.shadowColor=rocket.color; fireCtx.shadowBlur=7;
      fireCtx.beginPath(); fireCtx.moveTo(rocket.x,y+18); fireCtx.lineTo(rocket.x,y); fireCtx.stroke();
      fireCtx.beginPath(); fireCtx.arc(rocket.x,y,1.8,0,Math.PI*2); fireCtx.fillStyle=rocket.color; fireCtx.fill();
      if(t>=1){burstFirework(now,rocket.x,rocket.targetY,rocket.color);launches.splice(i,1)}
    }
    for (let i=fireworks.length-1;i>=0;i--) {
      const s=fireworks[i];
      s.x += s.vx*.016; s.y += s.vy*.016; s.vx*=.988; s.vy=s.vy*.988+.006; s.life--;
      if (s.life<=0 || s.y > fireH*.43) { fireworks.splice(i,1); continue; }
      fireCtx.globalAlpha=Math.min(.72,s.life/24);
      fireCtx.fillStyle=s.color; fireCtx.shadowColor=s.color; fireCtx.shadowBlur=6;
      fireCtx.beginPath(); fireCtx.arc(s.x,s.y,1.45,0,Math.PI*2); fireCtx.fill();
    }
    fireCtx.globalAlpha=1; fireCtx.shadowBlur=0;
  }

  function raf(now) { animationFrame(now); drawFireworks(now); requestAnimationFrame(raf); }

  // Main-scene destinations use the same visual coordinates as the contain-fitted painting.
  $$('[data-open]').forEach(button => button.addEventListener('click', () => openScene(button.dataset.open)));
  $('#backAtlas').addEventListener('click', returnToAtlas);
  $('#storyToggle').addEventListener('click', () => storyPanel.hidden ? openStory() : closeStory());
  $('#storyClose').addEventListener('click', closeStory);
  $('#nightToggle').addEventListener('click', event => {
    night = !night;
    sceneView.classList.toggle('night', night);
    event.currentTarget.setAttribute('aria-pressed', String(night));
    toastMessage(night ? '夜色渐深，灯火亮起' : '天色转明');
  });
  $('#rainToggle').addEventListener('click', event => {
    rain = !rain;
    sceneView.classList.toggle('raining', rain);
    sceneView.classList.toggle('water-live', sceneHasWater);
    event.currentTarget.setAttribute('aria-pressed', String(rain));
    toastMessage(rain ? '连平时雨 · 檐下听雨' : '雨歇天青');
  });
  $('#zoomToggle').addEventListener('click', event => {
    const progress = cameraMax ? camera / cameraMax : 0;
    zoom = zoom === 1 ? 1.24 : 1;
    layoutScene(false);
    setCamera(cameraMax * progress);
    event.currentTarget.setAttribute('aria-pressed', String(zoom > 1));
    toastMessage(zoom > 1 ? '放大画中细节' : '恢复全景视野');
  });
  $('#motionToggle').addEventListener('click', event => {
    paused = !paused;
    sceneView.classList.toggle('paused', paused);
    event.currentTarget.setAttribute('aria-pressed', String(paused));
    event.currentTarget.textContent = paused ? '▶' : 'Ⅱ';
    event.currentTarget.setAttribute('aria-label', paused ? '继续动画' : '暂停动画');
  });
  $('#soundToggle').addEventListener('click', toggleSound);
  $('#homeMusicToggle').addEventListener('click', toggleSiteMusic);
  $('#sceneMusicToggle').addEventListener('click', toggleSiteMusic);
  backgroundMusic.addEventListener('playing', removeMusicGestureFallback);
  fireworksMusic.addEventListener('playing', removeMusicGestureFallback);
  window.addEventListener('click', retrySiteMusicFromGesture);
  updateMusicControls();
  syncSiteMusic();
  $('#fullToggle').addEventListener('click', () => {
    if (!document.fullscreenElement) $('#site').requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  function bindWalkButton(button, direction) {
    button.addEventListener('pointerdown', event => {
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      walkDirection = direction;
      walkHoldAt = performance.now();
      autoWalk = false;
      $('#autoWalk').setAttribute('aria-pressed','false');
    });
    button.addEventListener('pointerup', () => {
      if (walkDirection === direction) {
        const held = performance.now() - walkHoldAt;
        walkDirection = 0;
        if (held < 170) stepCamera(direction, .13);
      }
    });
    button.addEventListener('pointercancel', () => { if (walkDirection === direction) walkDirection = 0; });
  }
  bindWalkButton($('#walkLeft'), -1);
  bindWalkButton($('#walkRight'), 1);
  $('#autoWalk').addEventListener('click', event => {
    autoWalk = !autoWalk;
    walkDirection = 0;
    event.currentTarget.setAttribute('aria-pressed', String(autoWalk));
    toastMessage(autoWalk ? '开始沿长卷漫游' : '停在此处看景');
  });

  let dragging = false;
  let dragX = 0;
  let dragCamera = 0;
  sceneViewport.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;
    dragging = true; dragX = event.clientX; dragCamera = camera;
    sceneViewport.classList.add('dragging');
    sceneViewport.setPointerCapture?.(event.pointerId);
  });
  sceneViewport.addEventListener('pointermove', event => {
    if (dragging) setCamera(dragCamera - (event.clientX - dragX));
  });
  const stopDrag = () => { dragging = false; sceneViewport.classList.remove('dragging'); };
  sceneViewport.addEventListener('pointerup', stopDrag);
  sceneViewport.addEventListener('pointercancel', stopDrag);
  sceneViewport.addEventListener('wheel', event => {
    if (Math.abs(event.deltaX) > 2 || Math.abs(event.deltaY) > 2) {
      event.preventDefault(); setCamera(camera + (event.deltaX || event.deltaY) * .8);
    }
  }, {passive:false});
  sceneViewport.addEventListener('dblclick', () => {
    zoom = zoom === 1 ? 1.24 : 1;
    layoutScene(false);
  });

  document.addEventListener('keydown', event => {
    if (sceneView.hidden) return;
    if (event.key === 'Escape') {
      if (!storyPanel.hidden) closeStory(); else returnToAtlas();
    } else if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
      event.preventDefault(); walkDirection = -1; walkHoldAt = performance.now();
    } else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
      event.preventDefault(); walkDirection = 1; walkHoldAt = performance.now();
    } else if (event.code === 'Space') {
      event.preventDefault(); paused = !paused; sceneView.classList.toggle('paused',paused);
      $('#motionToggle').setAttribute('aria-pressed',String(paused));
      $('#motionToggle').textContent = paused ? '▶' : 'Ⅱ';
    }
  });
  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') if (walkDirection < 0) walkDirection = 0;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') if (walkDirection > 0) walkDirection = 0;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { autoWalk = false; walkDirection = 0; }
    else { lastFrame = performance.now(); }
  });
  window.addEventListener('resize', () => { fitAtlas(); layoutScene(false); resizeFireworks(); resizeWeatherCanvas(); }, {passive:true});
  atlasArt.addEventListener('load', fitAtlas);
  fitAtlas();
  resizeFireworks();
  if (currentScene) layoutScene(false);
  requestAnimationFrame(raf);
})();
