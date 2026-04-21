// ============================================================
// METRO MAP SVG RENDERER
// ============================================================

function buildMetroMap() {
  const svg = document.getElementById('metroMap');
  svg.innerHTML = '';

  const W = 900, H = 700;

  // Background grid (subtle)
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  const bg = mkEl('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#grid)' });
  svg.appendChild(bg);

  // --- Draw lines ---
  // RED LINE path: icheri_sheher → sahil → 28may → ganjlik → narimanov → (branch: bakmil) → ulduz → koroglu → gara_garayev → neftchilar → khalglar → ahmedli → hazi_aslanov
  const redMainPts = [
    [150,340],[220,310],[310,280],[400,255],[490,235],[570,255],[650,280],[700,320],[730,375],[730,430],[710,490],[690,545]
  ];
  const redBakmilPts = [[490,235],[570,200]];

  drawLine(svg, redMainPts, '#E63946', 'red');
  drawLine(svg, redBakmilPts, '#E63946', 'red');

  // GREEN LINE path: darnagul → azadlig → nasimi → memar_ajami → 20yanvar → inshaatchilar → elmler → nizami → jafar_jabbarly → khatai
  const greenPts = [
    [150,210],[195,230],[230,255],[270,340],[310,370],[340,410],[360,460],[370,510],[310,500],[250,520]
  ];
  drawLine(svg, greenPts, '#2D9B4E', 'green');

  // PURPLE LINE: khojasan → avtovaghzal → memar_ajami → 8noyabr
  const purplePts = [
    [120,450],[170,430],[270,340],[330,310]
  ];
  drawLine(svg, purplePts, '#7B2D8B', 'purple');

  // Interchange connector at 28May/JafarJabbarly
  drawLine(svg, [[310,280],[310,500]], 'rgba(255,255,255,0.15)', 'transfer', 2, [5,5]);

  // --- Draw station density rings ---
  METRO_DATA.stations.forEach(s => {
    const occ = getOccupancy(s.id);
    const ringR = 8 + (occ / 100) * 14;
    const ring = mkEl('circle', {
      cx: s.x, cy: s.y,
      r: ringR,
      fill: 'none',
      stroke: lineColor(s.line),
      'stroke-width': 1.5,
      opacity: 0.25,
      class: 'density-ring'
    });
    ring.setAttribute('data-id', s.id);
    svg.appendChild(ring);
  });

  // --- Draw stations ---
  METRO_DATA.stations.forEach(s => {
    const isInterchange = s.interchange && s.interchange.length > 0;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.style.cursor = 'pointer';
    g.addEventListener('click', () => showStationPopup(s.id));

    // Outer ring for interchanges
    if (isInterchange) {
      const outer = mkEl('circle', {
        cx: s.x, cy: s.y, r: 11,
        fill: '#1c1c22', stroke: '#fff', 'stroke-width': 2, opacity: 0.9
      });
      g.appendChild(outer);
    }

    const r = isInterchange ? 7 : 6;
    const circle = mkEl('circle', {
      cx: s.x, cy: s.y, r,
      class: `station-circle ${s.line}${isInterchange ? ' interchange' : ''}`,
      fill: isInterchange ? '#fff' : '#1c1c22',
      stroke: lineColor(s.line),
      'stroke-width': isInterchange ? 3 : 2.5
    });
    circle.setAttribute('data-id', s.id);
    g.appendChild(circle);

    // Terminus dot
    if (s.terminus) {
      const t = mkEl('circle', { cx: s.x, cy: s.y, r: 3, fill: lineColor(s.line) });
      g.appendChild(t);
    }

    // Label
    const labelOffset = getLabelOffset(s);
    const text = mkEl('text', {
      x: s.x + labelOffset.x,
      y: s.y + labelOffset.y,
      class: `station-label${isInterchange ? ' bold' : ''}`,
      'text-anchor': labelOffset.anchor,
      fill: isInterchange ? '#e0e0e8' : '#9a9aaa',
      'font-size': isInterchange ? '10' : '9'
    });
    // Shorten long names
    let displayName = s.name;
    if (displayName.length > 18) displayName = displayName.substring(0, 16) + '…';
    text.textContent = displayName;
    g.appendChild(text);

    svg.appendChild(g);
  });

  // --- Title ---
  const title = mkEl('text', {
    x: 20, y: 30,
    fill: '#E63946', 'font-size': '13',
    'font-family': 'Unbounded, sans-serif',
    'font-weight': '700', opacity: 0.8
  });
  title.textContent = 'BAKI METROPOLİTENİ';
  svg.appendChild(title);

  // Live indicator
  const dot = mkEl('circle', { cx: W - 80, cy: 20, r: 5, fill: '#4dc870', opacity: 0.9 });
  dot.innerHTML = '<animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>';
  svg.appendChild(dot);
  const liveT = mkEl('text', { x: W - 70, y: 25, fill: '#4dc870', 'font-size': '10', 'font-family': 'Manrope, sans-serif' });
  liveT.textContent = 'Canlı';
  svg.appendChild(liveT);
}

function drawLine(svg, points, color, cls, width = 5, dasharray = null) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    const mx = (x1 + x2) / 2;
    d += ` C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  }
  path.setAttribute('d', d);
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', width);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  if (dasharray) path.setAttribute('stroke-dasharray', dasharray.join(','));
  svg.appendChild(path);
}

function mkEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function lineColor(line) {
  return { red: '#E63946', green: '#2D9B4E', purple: '#7B2D8B' }[line] || '#fff';
}

function getLabelOffset(s) {
  const offsets = {
    'start':  { x: 14, y: 4,  anchor: 'start' },
    'end':    { x: -14, y: 4, anchor: 'end' },
    'middle': { x: 0,  y: -12, anchor: 'middle' }
  };
  const base = offsets[s.labelAnchor] || offsets['start'];
  return base;
}

// Update density rings
function refreshMapDensity() {
  document.querySelectorAll('.density-ring').forEach(ring => {
    const id = ring.getAttribute('data-id');
    if (!id) return;
    const occ = getOccupancy(id);
    const r = 8 + (occ / 100) * 14;
    ring.setAttribute('r', r);
    ring.setAttribute('stroke', fillColor(occ));
  });
}
