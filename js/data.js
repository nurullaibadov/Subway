// ============================================================
// BAKU METRO — STATION & LINE DATA
// ============================================================

const METRO_DATA = {

  lines: {
    red: { name: 'Qırmızı Xətt', color: '#E63946', id: 'red' },
    green: { name: 'Yaşıl Xətt', color: '#2D9B4E', id: 'green' },
    purple: { name: 'Bənövşəyi Xətt', color: '#7B2D8B', id: 'purple' }
  },

  // All 27 stations with real data
  stations: [
    // === RED LINE (13 stations) ===
    { id: 'icheri_sheher', name: 'İçərişəhər', nameEn: 'Icheri Sheher', line: 'red', interchange: ['green'], depth: 28, year: 1967, daily: 34000, x: 150, y: 340, labelAnchor: 'start' },
    { id: 'sahil', name: 'Sahil', nameEn: 'Sahil', line: 'red', interchange: [], depth: 25, year: 1967, daily: 28000, x: 220, y: 310, labelAnchor: 'start' },
    { id: '28may', name: '28 May', nameEn: '28 May', line: 'red', interchange: ['green'], depth: 22, year: 1967, daily: 52000, x: 310, y: 280, labelAnchor: 'middle' },
    { id: 'ganjlik', name: 'Gənclik', nameEn: 'Ganjlik', line: 'red', interchange: [], depth: 18, year: 1967, daily: 22000, x: 400, y: 255, labelAnchor: 'middle' },
    { id: 'narimanov', name: 'Nəriman Nərimanov', nameEn: 'Nariman Narimanov', line: 'red', interchange: [], depth: 15, year: 1967, daily: 25000, x: 490, y: 235, labelAnchor: 'middle' },
    { id: 'bakmil', name: 'Bakmil', nameEn: 'Bakmil', line: 'red', interchange: [], depth: 8, year: 1970, daily: 9000, x: 570, y: 200, labelAnchor: 'middle', terminus: true },
    { id: 'ulduz', name: 'Ulduz', nameEn: 'Ulduz', line: 'red', interchange: [], depth: 16, year: 1970, daily: 20000, x: 580, y: 255, labelAnchor: 'end' },
    { id: 'koroglu', name: 'Koroğlu', nameEn: 'Koroglu', line: 'red', interchange: [], depth: 17, year: 1976, daily: 21000, x: 650, y: 280, labelAnchor: 'end' },
    { id: 'gara_garayev', name: 'Qara Qarayev', nameEn: 'Gara Garayev', line: 'red', interchange: [], depth: 18, year: 1976, daily: 19000, x: 700, y: 320, labelAnchor: 'end' },
    { id: 'neftchilar', name: 'Neftçilər', nameEn: 'Neftchilar', line: 'red', interchange: [], depth: 19, year: 1972, daily: 18000, x: 730, y: 375, labelAnchor: 'end' },
    { id: 'khalglar', name: 'Xalqlar Dostluğu', nameEn: 'Khalglar Dostlugu', line: 'red', interchange: [], depth: 17, year: 1989, daily: 16000, x: 730, y: 430, labelAnchor: 'end' },
    { id: 'ahmedli', name: 'Əhmədli', nameEn: 'Ahmedli', line: 'red', interchange: [], depth: 15, year: 1989, daily: 15000, x: 710, y: 490, labelAnchor: 'end' },
    { id: 'hazi_aslanov', name: 'Həzi Aslanov', nameEn: 'Hazi Aslanov', line: 'red', interchange: [], depth: 12, year: 2002, daily: 13000, x: 690, y: 545, labelAnchor: 'end', terminus: true },

    // === GREEN LINE (10 stations) ===
    { id: 'darnagul', name: 'Dərnəgül', nameEn: 'Darnagul', line: 'green', interchange: [], depth: 10, year: 1996, daily: 11000, x: 150, y: 210, labelAnchor: 'start', terminus: true },
    { id: 'azadlig', name: 'Azadlıq Prospekti', nameEn: 'Azadlig Prospekti', line: 'green', interchange: [], depth: 14, year: 1996, daily: 13000, x: 195, y: 230, labelAnchor: 'start' },
    { id: 'nasimi', name: 'Nəsimi', nameEn: 'Nasimi', line: 'green', interchange: [], depth: 18, year: 2008, daily: 15000, x: 230, y: 255, labelAnchor: 'start' },
    { id: 'memar_ajami_g', name: 'Memar Əcəmi (Yaşıl)', nameEn: 'Memar Ajami (Green)', line: 'green', interchange: ['purple'], depth: 20, year: 1985, daily: 30000, x: 270, y: 340, labelAnchor: 'start', realId: 'memar_ajami' },
    { id: '20yanvar', name: '20 Yanvar', nameEn: '20 Yanvar', line: 'green', interchange: [], depth: 22, year: 1985, daily: 20000, x: 310, y: 370, labelAnchor: 'start' },
    { id: 'inshaatchilar', name: 'İnşaatçılar', nameEn: 'Inshaatchilar', line: 'green', interchange: [], depth: 20, year: 1985, daily: 18000, x: 340, y: 410, labelAnchor: 'start' },
    { id: 'elmler', name: 'Elmlər Akademiyası', nameEn: 'Elmler Akademiyasi', line: 'green', interchange: [], depth: 18, year: 1985, daily: 22000, x: 360, y: 460, labelAnchor: 'start' },
    { id: 'nizami', name: 'Nizami', nameEn: 'Nizami', line: 'green', interchange: ['red'], depth: 16, year: 1976, daily: 35000, x: 370, y: 510, labelAnchor: 'start' },
    { id: 'jafar_jabbarly', name: 'Cəfər Cabbarlı', nameEn: 'Jafar Jabbarly', line: 'green', interchange: ['red'], depth: 22, year: 1967, daily: 40000, x: 310, y: 500, labelAnchor: 'middle' },
    { id: 'khatai', name: 'Şah İsmayıl Xətai', nameEn: 'Shah Ismail Khatai', line: 'green', interchange: [], depth: 20, year: 2013, daily: 16000, x: 250, y: 520, labelAnchor: 'start', terminus: true },

    // === PURPLE LINE (4 stations) ===
    { id: 'khojasan', name: 'Xocəsən', nameEn: 'Khojasan', line: 'purple', interchange: [], depth: 5, year: 2016, daily: 8000, x: 120, y: 450, labelAnchor: 'start', terminus: true },
    { id: 'avtovaghzal', name: 'Avtovağzal', nameEn: 'Avtovaghzal', line: 'purple', interchange: [], depth: 12, year: 2016, daily: 12000, x: 170, y: 430, labelAnchor: 'start' },
    { id: 'memar_ajami_p', name: 'Memar Əcəmi (Bənövşəyi)', nameEn: 'Memar Ajami (Purple)', line: 'purple', interchange: ['green'], depth: 20, year: 2016, daily: 30000, x: 270, y: 340, labelAnchor: 'start', realId: 'memar_ajami' },
    { id: '8noyabr', name: '8 Noyabr', nameEn: '8 Noyabr', line: 'purple', interchange: [], depth: 18, year: 2016, daily: 14000, x: 330, y: 310, labelAnchor: 'middle', terminus: true },
  ],

  // Train services (simulated)
  trains: [
    { id: 'T001', line: 'red', direction: 'Həzi Aslanov istiqaməti', from: 'İçərişəhər', wagons: 6, nextStation: 'Sahil' },
    { id: 'T002', line: 'red', direction: 'İçərişəhər istiqaməti', from: 'Həzi Aslanov', wagons: 6, nextStation: 'Əhmədli' },
    { id: 'T003', line: 'green', direction: 'Dərnəgül istiqaməti', from: 'Şah İsmayıl Xətai', wagons: 5, nextStation: 'Nizami' },
    { id: 'T004', line: 'green', direction: 'Şah İsmayıl Xətai / Bakmil', from: 'Dərnəgül', wagons: 5, nextStation: 'Azadlıq Prospekti' },
    { id: 'T005', line: 'purple', direction: '8 Noyabr istiqaməti', from: 'Xocəsən', wagons: 6, nextStation: 'Avtovağzal' },
    { id: 'T006', line: 'purple', direction: 'Xocəsən istiqaməti', from: '8 Noyabr', wagons: 6, nextStation: 'Memar Əcəmi' },
  ],

  // Adjacency for route finding
  graph: {
    'icheri_sheher': [{ to: 'sahil', line: 'red', time: 2 }],
    'sahil': [{ to: 'icheri_sheher', line: 'red', time: 2 }, { to: '28may', line: 'red', time: 2 }],
    '28may': [{ to: 'sahil', line: 'red', time: 2 }, { to: 'ganjlik', line: 'red', time: 2 }, { to: 'jafar_jabbarly', line: 'green', time: 1 }, { to: 'nizami', line: 'green', time: 2 }],
    'ganjlik': [{ to: '28may', line: 'red', time: 2 }, { to: 'narimanov', line: 'red', time: 2 }],
    'narimanov': [{ to: 'ganjlik', line: 'red', time: 2 }, { to: 'bakmil', line: 'red', time: 3 }, { to: 'ulduz', line: 'red', time: 2 }],
    'bakmil': [{ to: 'narimanov', line: 'red', time: 3 }],
    'ulduz': [{ to: 'narimanov', line: 'red', time: 2 }, { to: 'koroglu', line: 'red', time: 2 }],
    'koroglu': [{ to: 'ulduz', line: 'red', time: 2 }, { to: 'gara_garayev', line: 'red', time: 2 }],
    'gara_garayev': [{ to: 'koroglu', line: 'red', time: 2 }, { to: 'neftchilar', line: 'red', time: 2 }],
    'neftchilar': [{ to: 'gara_garayev', line: 'red', time: 2 }, { to: 'khalglar', line: 'red', time: 2 }],
    'khalglar': [{ to: 'neftchilar', line: 'red', time: 2 }, { to: 'ahmedli', line: 'red', time: 2 }],
    'ahmedli': [{ to: 'khalglar', line: 'red', time: 2 }, { to: 'hazi_aslanov', line: 'red', time: 2 }],
    'hazi_aslanov': [{ to: 'ahmedli', line: 'red', time: 2 }],
    'darnagul': [{ to: 'azadlig', line: 'green', time: 2 }],
    'azadlig': [{ to: 'darnagul', line: 'green', time: 2 }, { to: 'nasimi', line: 'green', time: 2 }],
    'nasimi': [{ to: 'azadlig', line: 'green', time: 2 }, { to: 'memar_ajami_g', line: 'green', time: 2 }],
    'memar_ajami_g': [{ to: 'nasimi', line: 'green', time: 2 }, { to: '20yanvar', line: 'green', time: 2 }, { to: 'memar_ajami_p', line: 'purple', time: 0, transfer: true }],
    'memar_ajami_p': [{ to: 'memar_ajami_g', line: 'green', time: 0, transfer: true }, { to: 'avtovaghzal', line: 'purple', time: 2 }, { to: '8noyabr', line: 'purple', time: 2 }],
    '20yanvar': [{ to: 'memar_ajami_g', line: 'green', time: 2 }, { to: 'inshaatchilar', line: 'green', time: 2 }],
    'inshaatchilar': [{ to: '20yanvar', line: 'green', time: 2 }, { to: 'elmler', line: 'green', time: 2 }],
    'elmler': [{ to: 'inshaatchilar', line: 'green', time: 2 }, { to: 'nizami', line: 'green', time: 2 }],
    'nizami': [{ to: 'elmler', line: 'green', time: 2 }, { to: 'jafar_jabbarly', line: 'green', time: 2 }],
    'jafar_jabbarly': [{ to: 'nizami', line: 'green', time: 2 }, { to: '28may', line: 'red', time: 1 }, { to: 'khatai', line: 'green', time: 2 }],
    'khatai': [{ to: 'jafar_jabbarly', line: 'green', time: 2 }],
    'khojasan': [{ to: 'avtovaghzal', line: 'purple', time: 3 }],
    'avtovaghzal': [{ to: 'khojasan', line: 'purple', time: 3 }, { to: 'memar_ajami_p', line: 'purple', time: 2 }],
    '8noyabr': [{ to: 'memar_ajami_p', line: 'purple', time: 2 }],
  }
};

// Dijkstra's shortest path
function findRoute(fromId, toId) {
  if (fromId === toId) return null;
  const graph = METRO_DATA.graph;
  const dist = {}, prev = {}, visited = new Set();
  for (const k in graph) dist[k] = Infinity;
  dist[fromId] = 0;
  const queue = [fromId];

  while (queue.length) {
    queue.sort((a, b) => dist[a] - dist[b]);
    const cur = queue.shift();
    if (visited.has(cur)) continue;
    visited.add(cur);
    if (cur === toId) break;
    if (!graph[cur]) continue;
    for (const edge of graph[cur]) {
      const alt = dist[cur] + (edge.time || 1);
      if (alt < dist[edge.to]) {
        dist[edge.to] = alt;
        prev[edge.to] = { from: cur, line: edge.line, transfer: edge.transfer };
        queue.push(edge.to);
      }
    }
  }

  if (dist[toId] === Infinity) return null;

  // Reconstruct path
  const path = [];
  let cur = toId;
  while (cur !== fromId) {
    const p = prev[cur];
    if (!p) return null;
    path.unshift({ stationId: cur, line: p.line, transfer: p.transfer });
    cur = p.from;
  }
  path.unshift({ stationId: fromId, line: path[0]?.line || 'red', transfer: false });

  return { path, totalTime: dist[toId] };
}

function getStationById(id) {
  return METRO_DATA.stations.find(s => s.id === id || s.realId === id);
}

function getStationName(id) {
  const s = getStationById(id);
  return s ? s.name : id;
}

// Live occupancy simulation
const occupancyState = {};
METRO_DATA.stations.forEach(s => {
  occupancyState[s.id] = Math.floor(Math.random() * 80) + 10;
});

function updateOccupancy() {
  Object.keys(occupancyState).forEach(id => {
    const delta = (Math.random() - 0.48) * 8;
    occupancyState[id] = Math.max(5, Math.min(98, occupancyState[id] + delta));
  });
}

function getOccupancy(stationId) {
  return Math.round(occupancyState[stationId] || 50);
}

function fillClass(pct) {
  if (pct < 35) return 'low';
  if (pct < 65) return 'med';
  if (pct < 85) return 'high';
  return 'full';
}

function fillLabel(pct) {
  const c = fillClass(pct);
  return { low: 'Boş', med: 'Orta', high: 'Dolu', full: 'Tam dolu' }[c];
}

function fillColor(pct) {
  const c = fillClass(pct);
  return { low: '#2D9B4E', med: '#d4a017', high: '#E06030', full: '#E63946' }[c];
}

// Simulated wagon occupancy
function getWagonOccupancy(trainId) {
  const base = occupancyState[trainId] || 50;
  return Array.from({ length: 6 }, (_, i) => {
    const off = (Math.random() - 0.5) * 30;
    return Math.max(5, Math.min(98, Math.round(base + off)));
  });
}
