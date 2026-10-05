/* BioManta Pozuzo — visual prototype. All generated scenario outputs are qualitative hypotheses. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

// Navigation and reading progress.
const menuToggle = $('.menu-toggle');
const mobileNav = $('.mobile-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
});
$$('.mobile-nav a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
}));
function updateProgress() {
  const range = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = `${Math.max(0, Math.min(100, scrollY / Math.max(1, range) * 100))}%`;
}
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Banana plant interactive explainer.
const plantPanels = {
  fruit: {
    index: '01 / FRUTO', title: 'El fruto es la cosecha',
    text: 'El plátano es el producto principal. El plan económico provincial documenta su cultivo en el distrito de Pozuzo.',
    note: 'BioManta no usa el fruto. Busca aprovechar una parte de la biomasa que queda tras la cosecha.'
  },
  stem: {
    index: '02 / PSEUDOTALLO', title: 'Capas que contienen fibra',
    text: 'El pseudotallo no es un tronco leñoso: está formado por vainas foliares superpuestas. De él pueden extraerse fibras vegetales.',
    note: 'La propuesta requiere seleccionar pseudotallos, separar y limpiar fibra, y ensayar si funciona en una malla para suelo.'
  }
};
$$('[data-plant]').forEach(button => button.addEventListener('click', () => {
  const data = plantPanels[button.dataset.plant];
  $$('#recurso [data-plant]').forEach(b => b.classList.toggle('active', b === button));
  $('#plantDetail .detail-index').textContent = data.index;
  $('#plantDetail h3').textContent = data.title;
  $('#plantDetail p').textContent = data.text;
  $('#plantDetail small').textContent = data.note;
  $('.fiber-zoom').classList.toggle('active', button.dataset.plant === 'stem');
}));

const featureText = {
  fiber: 'Fibra vegetal extraída del pseudotallo. Deben determinarse resistencia, variabilidad y rendimiento de extracción.',
  bio: 'La biodegradación es una expectativa de diseño, no una duración demostrada. Se debe medir su vida funcional en condiciones locales.',
  mesh: 'La geometría abierta podría retener semillas y permitir brotes. Separación, densidad y tamaño del rollo están por ensayar.',
  rain: 'La malla busca reducir exposición directa a gotas y arrastre superficial. No controla movimientos de masa profundos.',
  green: 'Se espera que las plantas atraviesen la malla y establezcan cobertura. Requiere comparación experimental y seguimiento.'
};
$$('[data-feature]').forEach(button => button.addEventListener('click', () => {
  $$('#featureGrid button').forEach(b => b.classList.toggle('active', b.dataset.feature === button.dataset.feature));
  $('#featureDetail').textContent = featureText[button.dataset.feature];
  $('#productCallout').textContent = featureText[button.dataset.feature];
  $('#productCallout').hidden = false;
}));

// Interactive production sequence.
const processSteps = [
  ['🍌', 'Cosecha', 'Se cosecha el plátano como producto principal.'],
  ['🌿', 'Recolección', 'Se selecciona una parte del pseudotallo disponible después de la cosecha.'],
  ['⚙', 'Extracción', 'Se propone separar mecánicamente las fibras de las vainas vegetales.'],
  ['💧', 'Limpieza', 'Se eliminan restos vegetales. Se estudiará el consumo y manejo del agua.'],
  ['☀', 'Secado', 'Se reduce la humedad de la fibra antes de transformarla.'],
  ['🧵', 'Preparación', 'Se clasifican las fibras y se forman hilos o haces.'],
  ['▦', 'Tejido', 'Se construye una malla abierta; su densidad es variable por validar.'],
  ['◉', 'Acabado', 'Se corta el tejido y se forman rollos de dimensiones por definir.'],
  ['⛰', 'Instalación', 'Se fija sobre suelo vulnerable apropiado con anclajes por ensayar.']
];
let processIndex = 0;
$('#processTrack').innerHTML = processSteps.map((step, index) => `<button type="button" data-index="${index}" aria-label="Paso ${index + 1}: ${step[1]}"><b>${String(index + 1).padStart(2, '0')}</b><span>${step[1]}</span></button>`).join('');
function setProcess(index) {
  processIndex = Math.max(0, Math.min(processSteps.length - 1, index));
  const [icon, title, description] = processSteps[processIndex];
  $('#processIcon').textContent = icon;
  $('#processTitle').textContent = title;
  $('#processText').textContent = description;
  $('#processCount').textContent = `${String(processIndex + 1).padStart(2, '0')} / 09`;
  $$('#processTrack button').forEach((button, i) => button.classList.toggle('active', i === processIndex));
  $('#processPrev').disabled = processIndex === 0;
  $('#processNext').disabled = processIndex === 8;
  $('.process-core').classList.remove('animate');
  void $('.process-core').offsetWidth;
  $('.process-core').classList.add('animate');
}
$('#processTrack').addEventListener('click', event => {
  const button = event.target.closest('button[data-index]');
  if (button) setProcess(Number(button.dataset.index));
});
$('#processPrev').addEventListener('click', () => setProcess(processIndex - 1));
$('#processNext').addEventListener('click', () => setProcess(processIndex + 1));
setProcess(0);

// Main qualitative slope simulation. This is an illustrative animation, not a numerical model.
const canvas = $('#simCanvas');
const ctx = canvas.getContext('2d');
const scenario = { rain: 1, slope: 1, vegetation: 1, mat: true };
let simWidth = 900, simHeight = 500, simTime = 0, deployment = 1;
let simVisible = false, lastSimFrame = 0;
new IntersectionObserver(entries => { simVisible = entries[0]?.isIntersecting ?? false; }, { threshold: .01 }).observe(canvas);
const tau = Math.PI * 2;
function resizeCanvas() {
  const bounds = canvas.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  simWidth = bounds.width;
  simHeight = bounds.height;
  canvas.width = Math.round(simWidth * dpr);
  canvas.height = Math.round(simHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
const resizeObserver = new ResizeObserver(resizeCanvas);
resizeObserver.observe(canvas);
function seeded(n) { const v = Math.sin(n * 127.37 + 9.23) * 43758.5453; return v - Math.floor(v); }
function groundAt(localX, width, height) {
  const relative = Math.max(0, Math.min(1, localX / width));
  const rise = [0.11, 0.19, 0.28][scenario.slope];
  return height * (.53 - rise * .4 + rise * relative) + Math.sin(relative * 8) * 3;
}
function drawClouds(x, width, height, t) {
  const travel = (t * .003) % (width + 180);
  for (let i = 0; i < 4; i++) {
    const cx = x + ((i * width * .39 + travel) % (width + 200)) - 100;
    const cy = height * (.16 + (i % 2) * .045);
    ctx.fillStyle = '#c9dfcf32';
    ctx.beginPath(); ctx.ellipse(cx, cy, width * .18, 18, 0, 0, tau); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 25, cy - 8, width * .1, 18, 0, 0, tau); ctx.fill();
  }
}
function drawPanel(x, width, height, isMat, t) {
  ctx.save(); ctx.beginPath(); ctx.rect(x, 0, width, height); ctx.clip();
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#1b4947'); sky.addColorStop(.6, '#658271'); sky.addColorStop(1, '#213b31');
  ctx.fillStyle = sky; ctx.fillRect(x, 0, width, height);
  drawClouds(x, width, height, t);
  // Forested mountain layers suggest Selva Alta; they are scenery, not a location-specific map.
  for (let layer = 0; layer < 3; layer++) {
    ctx.beginPath(); ctx.moveTo(x - 10, height * (.4 + layer * .07));
    for (let xx = -10; xx <= width + 20; xx += 12) {
      const yy = height * (.38 + layer * .09) + Math.sin(xx / 50 + layer * 1.8) * (25 - layer * 4) + Math.sin(xx / 19 + layer) * 4;
      ctx.lineTo(x + xx, yy);
    }
    ctx.lineTo(x + width, height); ctx.lineTo(x, height); ctx.closePath();
    ctx.fillStyle = ['#385f50', '#2c594a', '#244e40'][layer]; ctx.fill();
  }
  const px = 14, planeWidth = width - 28;
  const topY = local => groundAt(local, width, height);
  // Deep soil body and a lighter top plane give an isometric cutaway impression.
  ctx.beginPath(); ctx.moveTo(x, topY(0));
  for (let xx = 0; xx <= width; xx += 8) ctx.lineTo(x + xx, topY(xx));
  ctx.lineTo(x + width, height); ctx.lineTo(x, height); ctx.closePath();
  const soil = ctx.createLinearGradient(0, height * .5, 0, height);
  soil.addColorStop(0, '#a47a50'); soil.addColorStop(.32, '#795438'); soil.addColorStop(1, '#3b3229');
  ctx.fillStyle = soil; ctx.fill();
  for (let i = 0; i < 220; i++) {
    const sx = seeded(i * 3.7 + (isMat ? 100 : 0)) * width;
    const sy = topY(sx) + 9 + seeded(i * 2.9) * (height - topY(sx) - 12);
    ctx.fillStyle = i % 3 ? '#3b332c5a' : '#c2a07a66';
    ctx.fillRect(x + sx, sy, 1.3 + seeded(i) * 2, 1.3 + seeded(i * 4) * 2);
  }
  // Surface plane edge.
  ctx.beginPath(); ctx.moveTo(x + px, topY(px));
  for (let xx = px; xx <= width - px; xx += 6) ctx.lineTo(x + xx, topY(xx));
  ctx.strokeStyle = '#d0a879'; ctx.lineWidth = 5; ctx.stroke();
  // Mat deploys progressively with a woven, open grid. No implication of structural reinforcement.
  if (isMat && deployment > .01) {
    const effective = planeWidth * deployment;
    ctx.save(); ctx.lineWidth = 3;
    for (let offset = 0; offset < 4; offset++) {
      const dy = offset * 9;
      ctx.beginPath();
      for (let xx = px; xx <= px + effective; xx += 5) {
        const yy = topY(xx) - 3 + dy;
        if (xx === px) ctx.moveTo(x + xx, yy); else ctx.lineTo(x + xx, yy);
      }
      ctx.strokeStyle = offset % 2 ? '#dec695ca' : '#e6d4a8e0'; ctx.stroke();
    }
    for (let xx = px; xx <= px + effective; xx += 22) {
      ctx.beginPath(); ctx.moveTo(x + xx, topY(xx) - 4); ctx.lineTo(x + xx + 8, topY(xx + 8) + 27);
      ctx.strokeStyle = '#ead2a3e8'; ctx.lineWidth = 2.4; ctx.stroke();
    }
    for (const xx of [px + 15, Math.min(width - 20, px + effective - 10)]) {
      ctx.beginPath(); ctx.moveTo(x + xx, topY(xx) - 11); ctx.lineTo(x + xx + 2, topY(xx) + 30);
      ctx.strokeStyle = '#dac290'; ctx.lineWidth = 5; ctx.stroke();
      ctx.fillStyle = '#d8c18e'; ctx.fillRect(x + xx - 4, topY(xx) - 13, 10, 3);
    }
    ctx.restore();
  }
  // Runoff path, smaller and slower under the proposed mat.
  const waterWeight = isMat ? .42 : 1;
  const waterAlpha = .38 + .13 * scenario.rain;
  for (let trail = 0; trail < (isMat ? 2 : 3); trail++) {
    ctx.beginPath();
    const start = (t * (isMat ? .01 : .024) + trail * 95) % (width + 130) - 100;
    for (let k = 0; k < 95; k += 5) {
      const xx = start + k;
      const yy = topY(xx) + 7 + trail * 7 + Math.sin(k * .17 + t * .01) * 2;
      if (k === 0) ctx.moveTo(x + xx, yy); else ctx.lineTo(x + xx, yy);
    }
    ctx.strokeStyle = `rgba(121,198,208,${waterAlpha * waterWeight})`;
    ctx.lineWidth = 2 + scenario.rain * 1.4; ctx.stroke();
  }
  // Soil particles and seeds move more in the uncovered scenario. Purely illustrative.
  const particles = isMat ? 7 : 21;
  for (let i = 0; i < particles; i++) {
    const motion = t * (isMat ? .004 : .015) * (1 + scenario.slope * .35);
    const xx = (seeded(i * 6.1 + 2) * width + motion) % width;
    const yy = topY(xx) + 8 + seeded(i * 4.8) * 20;
    ctx.beginPath(); ctx.arc(x + xx, yy, isMat ? 1.4 : 1.8 + scenario.rain * .4, 0, tau);
    ctx.fillStyle = i % 5 === 0 ? '#eee0a5' : '#c18d61'; ctx.fill();
  }
  // Established vegetation appears in both; on the proposed mat a few illustrative recruits appear.
  const sprouts = [0, 5, 11][scenario.vegetation] + (isMat ? 4 : 0);
  for (let i = 0; i < sprouts; i++) {
    const xx = 24 + seeded(i * 4.78 + 8) * (width - 48);
    const yy = topY(xx) - (isMat ? 4 : 0);
    const stem = (scenario.vegetation === 2 ? 20 : 12) + seeded(i * 7.3) * 12;
    ctx.beginPath(); ctx.moveTo(x + xx, yy); ctx.quadraticCurveTo(x + xx + 2, yy - stem / 2, x + xx - 3, yy - stem);
    ctx.strokeStyle = '#6eaf6c'; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x + xx - 7, yy - stem * .62, 7, 3, -.55, 0, tau);
    ctx.ellipse(x + xx + 5, yy - stem * .7, 6, 3, .5, 0, tau);
    ctx.fillStyle = '#8bc481'; ctx.fill();
  }
  // Rain streaks, with partial interception visually suggested by drops stopping at the mat.
  const dropCount = [24, 48, 76][scenario.rain];
  for (let i = 0; i < dropCount; i++) {
    const rx = seeded(i * 3.93 + 24) * width;
    const speed = [1.2, 1.8, 2.5][scenario.rain];
    const ry = ((seeded(i * 8.51) * height + t * speed) % (height * .9)) - 30;
    const hitY = topY(rx) - (isMat ? 8 : 2);
    if (ry > hitY) continue;
    ctx.beginPath(); ctx.moveTo(x + rx, ry); ctx.lineTo(x + rx - 3, ry + 10 + scenario.rain * 3);
    ctx.strokeStyle = isMat ? '#b8e0dcaa' : '#d1e8e5b9'; ctx.lineWidth = 1.3; ctx.stroke();
    if (ry + 17 > hitY && ry + 10 < hitY) {
      ctx.beginPath(); ctx.arc(x + rx, hitY, isMat ? 2 : 3.5, Math.PI, tau);
      ctx.strokeStyle = isMat ? '#d9e6b9' : '#badfdd'; ctx.stroke();
    }
  }
  const vignette = ctx.createLinearGradient(0, 0, 0, height);
  vignette.addColorStop(0, '#06221d19'); vignette.addColorStop(.7, '#08231b05'); vignette.addColorStop(1, '#061a19c9');
  ctx.fillStyle = vignette; ctx.fillRect(x, 0, width, height);
  ctx.restore();
}
function renderSim(timestamp) {
  requestAnimationFrame(renderSim);
  if (!simVisible || document.hidden || timestamp - lastSimFrame < 28) return;
  lastSimFrame = timestamp;
  simTime = reducedMotion.matches ? 0 : timestamp / 15;
  deployment += ((scenario.mat ? 1 : 0) - deployment) * .065;
  ctx.clearRect(0, 0, simWidth, simHeight);
  drawPanel(0, simWidth / 2, simHeight, false, simTime);
  drawPanel(simWidth / 2, simWidth / 2, simHeight, scenario.mat && deployment > .03, simTime);
  ctx.fillStyle = '#e8f2e5a8'; ctx.fillRect(simWidth / 2 - .5, 0, 1, simHeight);
}
requestAnimationFrame(renderSim);
const qualitative = {
  protected: [
    ['Impacto directo de lluvia', 'Alto en A', 'Reducido en B'],
    ['Escorrentía superficial', 'Mayor en A', 'Potencialmente menor en B'],
    ['Arrastre de partículas', 'Mayor en A', 'Potencialmente menor en B'],
    ['Retención de semillas', 'Menor en A', 'Mayor esperada en B'],
    ['Revegetación', 'Suelo más expuesto en A', 'Condiciones más favorables en B']
  ],
  bare: [
    ['Impacto directo de lluvia', 'Alto en A', 'Alto en B'],
    ['Escorrentía superficial', 'Mayor en A', 'Similar en B'],
    ['Arrastre de partículas', 'Mayor en A', 'Similar en B'],
    ['Retención de semillas', 'Menor en A', 'Similar en B'],
    ['Revegetación', 'Depende de cobertura inicial', 'Sin aporte de la malla en B']
  ]
};
function updateScenario() {
  $$('.segmented').forEach(group => {
    const key = group.dataset.control;
    $$('button', group).forEach(button => {
      const selected = Number(button.dataset.value) === scenario[key];
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  });
  $('#matToggle').checked = scenario.mat;
  $('#switchWord').textContent = scenario.mat ? 'Activada' : 'Desactivada';
  $('#panelBTitle').textContent = scenario.mat ? 'CON BIOMANTA' : 'SIN BIOMANTA';
  const values = scenario.mat ? qualitative.protected : qualitative.bare;
  const context = [
    `Lluvia ${['baja','media','alta'][scenario.rain]}`,
    `Pendiente ${['baja','media','alta'][scenario.slope]}`,
    `Vegetación ${['ausente','inicial','establecida'][scenario.vegetation]}`,
    `Pendiente ${['baja','media','alta'][scenario.slope]}`,
    `Vegetación ${['ausente','inicial','establecida'][scenario.vegetation]}`
  ];
  $('#resultGrid').innerHTML = values.map((entry, index) => `<div><small>0${index + 1} / ${entry[0]}<br>${context[index]}</small><strong>${entry[1]}</strong><em>${entry[2]}</em></div>`).join('');
}
$$('.segmented').forEach(group => group.addEventListener('click', event => {
  const button = event.target.closest('button[data-value]');
  if (!button) return;
  scenario[group.dataset.control] = Number(button.dataset.value);
  updateScenario();
}));
$('#matToggle').addEventListener('change', event => { scenario.mat = event.target.checked; updateScenario(); });
$('#resetSim').addEventListener('click', () => { Object.assign(scenario, {rain:1,slope:1,vegetation:1,mat:true}); updateScenario(); });
updateScenario();

// Staged usage visualization.
const stages = [
  ['Instalación','Se instala la geomanta sobre suelo preparado y se fija con anclajes apropiados.'],
  ['Lluvia','La malla podría reducir la exposición directa y ayudar a retener material superficial.'],
  ['Germinación','Las semillas podrían permanecer en los espacios mientras emergen los primeros brotes.'],
  ['Revegetación','Se espera que aumente la cobertura vegetal y asuma gradualmente mayor función protectora.'],
  ['Biodegradación','La fibra natural comienza a degradarse. Su duración funcional real debe medirse.']
];
function setStage(index) {
  const stage = stages[index];
  $('#stageNumber').textContent = `${String(index + 1).padStart(2,'0')} / 05`;
  $('#stageTitle').textContent = stage[0];
  $('#stageText').textContent = stage[1];
  $('#stageRange').value = index;
  $('#stageRange').style.background = `linear-gradient(90deg,#b7d690 ${index * 25}%,#40644e ${index * 25}%)`;
  $('#stageRain').style.opacity = index === 1 || index === 2 ? '.75' : index > 2 ? '.25' : '0';
  $('#stageMesh').style.opacity = index === 4 ? '.35' : '1';
  $('#stageMesh').style.transform = index === 0 ? 'scaleX(.65)' : 'scaleX(1)';
  $('#stageGrowth').style.opacity = [0,0,.2,.65,.9][index];
  $('#stageGrowth').style.transform = `translateY(${[50,50,30,12,2][index]}px)`;
}
$('#stageRange').addEventListener('input', event => setStage(Number(event.target.value)));
setStage(0);

// Charts use ordinal directions only; no invented quantities.
const metrics = {
  soil: { title:'Arrastre superficial',caption:'Sin BioManta: tendencia mayor. Con BioManta: tendencia potencialmente menor.',bare:'M30 210 C150 205 210 140 310 125 S510 62 650 40',mat:'M30 210 C150 205 210 190 310 180 S510 166 650 150'},
  seed: { title:'Retención de semillas',caption:'Sin BioManta: menor retención esperada. Con BioManta: mayor retención potencial.',bare:'M30 205 C170 190 290 182 410 176 S560 170 650 165',mat:'M30 205 C150 185 270 138 400 104 S550 70 650 55'},
  plant:{title:'Establecimiento vegetal',caption:'En suelo expuesto la progresión podría ser más difícil; con malla, potencialmente más favorable.',bare:'M30 210 C150 205 260 190 360 170 S540 154 650 137',mat:'M30 210 C150 200 260 165 360 130 S540 82 650 63'},
  cover:{title:'Cobertura vegetal',caption:'Inicio → establecimiento → mayor cobertura: secuencia conceptual, dependiente de ensayos y condiciones del sitio.',bare:'M30 210 C150 205 265 190 390 174 S540 147 650 128',mat:'M30 210 C150 204 250 175 360 132 S530 73 650 50'}
};
function setMetric(key) {
  const data = metrics[key];
  $$('#metricList button').forEach(b => b.classList.toggle('active', b.dataset.metric === key));
  $('#metricTitle').textContent = data.title;
  $('#metricCaption').textContent = data.caption;
  $('#chartBare').setAttribute('d', data.bare);
  $('#chartMat').setAttribute('d', data.mat);
  $('#chartArea').setAttribute('d', `${data.mat} L650 220 L30 220 Z`);
  $('#metricChart').setAttribute('aria-label', `${data.title}: tendencias conceptuales sin valores numéricos para suelo sin y con BioManta`);
}
$('#metricList').addEventListener('click', event => {
  const button = event.target.closest('button[data-metric]'); if (button) setMetric(button.dataset.metric);
});
setMetric('soil');

// Future laboratory illustration. The button never claims an experiment happened.
let labTimeout;
$('#runLab').addEventListener('click', () => {
  $('.lab-visual').classList.remove('running');
  void $('.lab-visual').offsetWidth;
  $('.lab-visual').classList.add('running');
  $('#runLab').textContent = '↺ Repetir hipótesis visual';
  clearTimeout(labTimeout);
  labTimeout = setTimeout(() => $('.lab-visual').classList.remove('running'), 12500);
});

// Technical validation cards.
const variables = [
  ['🧵','Resistencia a tracción','¿Cuánta tensión soporta el tejido?','Ensayo mecánico de fibras y malla.'],
  ['💧','Absorción de agua','¿Cómo cambia la fibra húmeda?','Comparar masa y propiedades antes/después de humectación.'],
  ['🌧','Resistencia a lluvia','¿Conserva su estructura?','Ensayos con lluvia simulada y evaluación visual.'],
  ['☀','Exposición ambiental','¿Cómo cambia al intemperismo?','Seguimiento de sol, humedad y temperatura.'],
  ['♻','Biodegradación','¿Cuánto dura su función?','Medir pérdida de masa y resistencia con el tiempo.'],
  ['▦','Densidad del tejido','¿Qué separación funciona mejor?','Comparar aperturas de malla.'],
  ['📌','Sistema de anclaje','¿Cómo se fija al terreno?','Ensayar materiales, espaciamiento y adherencia.'],
  ['◈','Costo por m²','¿Es viable producirla?','Registrar materiales, mano de obra, transporte e instalación.']
];
$('#variableGrid').innerHTML = variables.map(([icon,title,question,method],i)=>`<button type="button" data-index="${i}" aria-expanded="false"><span>${icon}</span><strong>${title}</strong><small>${question}</small><em hidden>${method}</em></button>`).join('');
$('#variableGrid').addEventListener('click', event => {
  const button = event.target.closest('button'); if (!button) return;
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  button.classList.toggle('active', open);
  $('em',button).hidden = !open;
});

// Eco-business three-part model.
const pillars = {
  env:['AMBIENTAL','Valorización de biomasa poscosecha; uso de fibra vegetal; producto potencialmente biodegradable; protección superficial y apoyo a revegetación.'],
  social:['SOCIAL','Participación posible de agricultores, procesamiento local, aprendizaje de oficios y servicios locales de instalación y mantenimiento.'],
  economic:['ECONÓMICO','Transformación de un subproducto en valor agregado; ingresos potenciales por geomanta, instalación y paquete de revegetación.']
};
function setPillar(key) {
  $$('.tri-point').forEach(b => b.classList.toggle('active', b.dataset.pillar === key));
  $('#pillarDetail').innerHTML = `<strong>${pillars[key][0]}</strong><p>${pillars[key][1]}</p>`;
}
$$('.tri-point').forEach(button => button.addEventListener('click', () => setPillar(button.dataset.pillar)));
setPillar('env');
new IntersectionObserver((entries, observer) => {
  if (entries[0]?.isIntersecting) { $('#valueChain').classList.add('in-view'); observer.disconnect(); }
}, { threshold: .2 }).observe($('#valueChain'));

// Before/after handle. Both scenes are conceptual compositions.
function setComparison(value) {
  const fraction = Math.max(0, Math.min(100, Number(value)));
  $('#afterScene').style.clipPath = `inset(0 0 0 ${fraction}%)`;
  $('#compareLine').style.left = `${fraction}%`;
}
$('#compareRange').addEventListener('input', event => setComparison(event.target.value));
setComparison(50);
