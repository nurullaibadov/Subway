// ============================================================
// BAKU METRO APP — MAIN APPLICATION LOGIC
// ============================================================

let currentPopupStation = null;
let activeLineFilter = 'all';
let activeStationLineFilter = 'all';
let trainWagonData = {};

// ---- INIT ----
window.addEventListener('DOMContentLoaded', () => {
  // Splash screen
  setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('splash').style.display = 'none';
      document.getElementById('app').style.display = 'flex';
      init();
    }, 600);
  }, 2200);
});

function init() {
  updateClock();
  setInterval(updateClock, 1000);
  buildMetroMap();
  populateRouteSelects();
  renderTrains();
  renderStationList();
  setupNavigation();
  setupTrainFilter();
  setupLineTabFilter();

  // Live updates
  setInterval(() => {
    updateOccupancy();
    refreshMapDensity();
    renderTrains();
    renderStationList();
    if (currentPopupStation) refreshPopup(currentPopupStation);
  }, 4000);

  checkMetroStatus();
}

// ---- CLOCK ----
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const time = `${h}:${m}`;
  const el1 = document.getElementById('sidebarTime');
  const el2 = document.getElementById('headerTime');
  if (el1) el1.textContent = time;
  if (el2) el2.textContent = time;
}

function checkMetroStatus() {
  const h = new Date().getHours();
  const isOpen = h >= 6;
  const badge = document.querySelector('.status-badge');
  if (badge) {
    badge.textContent = isOpen ? 'Açıqdır' : 'Bağlıdır';
    badge.className = `status-badge ${isOpen ? 'open' : 'closed'}`;
  }
}

// ---- NAVIGATION ----
function setupNavigation() {
  // Sidebar
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });
  // Bottom nav
  document.querySelectorAll('.bn-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });
}

function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  document.querySelectorAll('.nav-item, .bn-item').forEach(i => {
    i.classList.toggle('active', i.dataset.tab === tab);
  });
  if (tab !== 'map') closePopup();
}

// ---- STATION POPUP ----
function showStationPopup(stationId) {
  currentPopupStation = stationId;
  const station = getStationById(stationId);
  if (!station) return;

  const popup = document.getElementById('stationPopup');
  const occ = getOccupancy(stationId);
  const nextMin = Math.floor(Math.random() * 4) + 1;

  document.getElementById('popupName').textContent = station.name;
  const badge = document.getElementById('popupLine');
  badge.textContent = { red: 'Qırmızı Xətt', green: 'Yaşıl Xətt', purple: 'Bənövşəyi Xətt' }[station.line];
  badge.className = `popup-line-badge ${station.line}`;

  const bar = document.getElementById('popupFillBar');
  bar.style.width = occ + '%';
  bar.style.background = fillColor(occ);
  document.getElementById('popupFillPct').textContent = `${occ}% — ${fillLabel(occ)}`;
  document.getElementById('popupNext').textContent = `${nextMin} dəq`;
  document.getElementById('popupDaily').textContent = (station.daily / 1000).toFixed(0) + 'K';
  document.getElementById('popupDepth').textContent = station.depth + ' m';
  document.getElementById('popupYear').textContent = station.year;

  popup.classList.remove('hidden');
}

function refreshPopup(stationId) {
  if (!stationId) return;
  const occ = getOccupancy(stationId);
  const bar = document.getElementById('popupFillBar');
  if (bar) {
    bar.style.width = occ + '%';
    bar.style.background = fillColor(occ);
    document.getElementById('popupFillPct').textContent = `${occ}% — ${fillLabel(occ)}`;
  }
}

function closePopup() {
  document.getElementById('stationPopup').classList.add('hidden');
  currentPopupStation = null;
}

function setRouteFrom() {
  if (!currentPopupStation) return;
  switchTab('route');
  const sel = document.getElementById('routeFrom');
  if (sel) sel.value = currentPopupStation;
  closePopup();
}

// ---- ROUTE PLANNER ----
function populateRouteSelects() {
  const stations = METRO_DATA.stations;
  ['routeFrom', 'routeTo'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = '';
    // Group by line
    ['red', 'green', 'purple'].forEach(line => {
      const lineStations = stations.filter(s => s.line === line);
      const grp = document.createElement('optgroup');
      grp.label = { red: '🔴 Qırmızı Xətt', green: '🟢 Yaşıl Xətt', purple: '🟣 Bənövşəyi Xətt' }[line];
      lineStations.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name;
        grp.appendChild(opt);
      });
      sel.appendChild(grp);
    });
  });
  // Default: different stations
  const toSel = document.getElementById('routeTo');
  if (toSel && toSel.options.length > 3) toSel.selectedIndex = 5;
}

function swapRoute() {
  const from = document.getElementById('routeFrom');
  const to = document.getElementById('routeTo');
  [from.value, to.value] = [to.value, from.value];
}

function calculateRoute() {
  const fromId = document.getElementById('routeFrom').value;
  const toId = document.getElementById('routeTo').value;

  if (fromId === toId) {
    alert('Eyni stansiya seçildi. Zəhmət olmasa fərqli stansiya seçin.');
    return;
  }

  const result = findRoute(fromId, toId);
  const resDiv = document.getElementById('routeResult');

  if (!result) {
    resDiv.classList.remove('hidden');
    document.getElementById('routeSteps').innerHTML = '<div style="color:#E63946;padding:16px;text-align:center;">Marşrut tapılmadı</div>';
    return;
  }

  const { path, totalTime } = result;
  const stops = path.length;

  // Count transfers
  let transfers = 0;
  for (let i = 1; i < path.length; i++) {
    if (path[i].transfer) transfers++;
  }

  document.getElementById('routeTime').textContent = totalTime + ' dəq';
  document.getElementById('routeStops').textContent = (stops - 1) + ' stansiya';
  document.getElementById('routeTransfers').textContent = transfers > 0 ? transfers + ' aktarma' : 'Aktarmasız';

  // Build step list
  const stepsDiv = document.getElementById('routeSteps');
  stepsDiv.innerHTML = '';
  path.forEach((step, i) => {
    const s = getStationById(step.stationId);
    if (!s) return;
    const div = document.createElement('div');
    div.className = 'route-step';
    const isFirst = i === 0;
    const isLast = i === path.length - 1;
    const typeLabel = step.transfer ? 'Aktarma' : isFirst ? 'Başlanğıc' : isLast ? 'Son' : '';
    div.innerHTML = `
      <div class="step-dot ${step.line}"></div>
      <span class="step-name">${s.name}</span>
      ${typeLabel ? `<span class="step-type${step.transfer ? ' step-transfer' : ''}">${typeLabel}</span>` : ''}
    `;
    stepsDiv.appendChild(div);
  });

  resDiv.classList.remove('hidden');
}

// ---- TRAINS ----
function setupTrainFilter() {
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLineFilter = btn.dataset.line;
      renderTrains();
    });
  });
}

function renderTrains() {
  const container = document.getElementById('trainList');
  if (!container) return;

  const trains = METRO_DATA.trains.filter(t =>
    activeLineFilter === 'all' || t.line === activeLineFilter
  );

  container.innerHTML = '';
  trains.forEach(train => {
    const wagons = getWagonOccupancy(train.id);
    const minIdx = wagons.indexOf(Math.min(...wagons));
    const avgOcc = Math.round(wagons.reduce((a, b) => a + b, 0) / wagons.length);
    const arrMin = Math.floor(Math.random() * 5) + 1;

    const card = document.createElement('div');
    card.className = 'train-card';
    card.innerHTML = `
      <div class="train-card-header">
        <div class="train-card-left">
          <div class="train-route">${train.direction}</div>
          <div class="train-arrives">Növbəti stansiya: <span>${train.nextStation}</span></div>
        </div>
        <div style="text-align:right;">
          <div class="train-arrives-num">${arrMin}</div>
          <div class="arrives-label">dəq</div>
        </div>
      </div>
      <div class="wagons-row">
        ${wagons.map((w, i) => `
          <div class="wagon-box wc-${fillClass(w)}" data-label="V${i+1}" title="Vaqon ${i+1}: ${w}%">
            ${w}%
          </div>
        `).join('')}
      </div>
      <div class="train-card-footer" style="margin-top:20px;">
        <div class="best-wagon">
          Tövsiyə: <span>Vaqon ${minIdx + 1}</span> (${wagons[minIdx]}% dolu)
        </div>
        <span class="line-badge ${train.line}">
          ${{ red:'Qırmızı', green:'Yaşıl', purple:'Bənövşəyi'}[train.line]}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

// ---- STATIONS LIST ----
function setupLineTabFilter() {
  document.querySelectorAll('.lt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStationLineFilter = btn.dataset.line;
      renderStationList();
    });
  });
}

function renderStationList(query = '') {
  const container = document.getElementById('stationList');
  if (!container) return;
  const searchVal = query || (document.getElementById('stationSearch')?.value || '');

  let stations = METRO_DATA.stations;
  if (activeStationLineFilter !== 'all') {
    stations = stations.filter(s => s.line === activeStationLineFilter);
  }
  if (searchVal) {
    const q = searchVal.toLowerCase();
    stations = stations.filter(s =>
      s.name.toLowerCase().includes(q) || (s.nameEn || '').toLowerCase().includes(q)
    );
  }

  container.innerHTML = '';
  stations.forEach(s => {
    const occ = getOccupancy(s.id);
    const item = document.createElement('div');
    item.className = 'station-item';
    const isInterchange = s.interchange && s.interchange.length > 0;
    item.innerHTML = `
      <div class="sitem-dot ${s.line}"></div>
      <span class="sitem-name">
        ${s.name}
        ${isInterchange ? '<span class="sitem-exchange">⇄ aktarma</span>' : ''}
      </span>
      <span class="sitem-fill fill-${fillClass(occ)}">${fillLabel(occ)} ${occ}%</span>
    `;
    item.addEventListener('click', () => {
      switchTab('map');
      setTimeout(() => showStationPopup(s.id), 200);
    });
    container.appendChild(item);
  });

  if (stations.length === 0) {
    container.innerHTML = '<div style="padding:20px;color:var(--text2);text-align:center;">Stansiya tapılmadı</div>';
  }
}

function filterStations() {
  renderStationList();
}
