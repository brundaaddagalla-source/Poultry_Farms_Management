const farmData = {
  Guntur: ["Tenali", "Narasaraopet", "Sattenapalli"],
  Krishna: ["Mangalagiri-1", "Mangalagiri-2", "Madhavaram", "Chiruvolu Lanka"],
  Godavari: ["Eluru", "Bhimavaram-1", "Bhimavaram-2", "Narasapuram", "Akividu"],
  Vizag: ["Bheemili-1", "Bheemili-2", "Madhurawada-1", "Madhurawada-2"],
  Chittoor: ["Papagni-1", "Papagni-2", "Arani", "Bahuda", "Kalyani Rivers-1", "Kalyani Rivers-2"],
  Kurnool: ["Krishnagiri", "Pattikonda", "Mantralayam-1"]
};
/* ===== CENTRAL STORAGE UTILITIES ===== */

function getFarmDB() {
  return JSON.parse(localStorage.getItem("farmDB")) || {};
}

function saveFarmDB(data) {
  localStorage.setItem("farmDB", JSON.stringify(data));
}

/* ===== CENTRAL CONFIGURATION ===== */

const CONFIG = {
  SHED_CAPACITY: 60000,
  FEED_ALERT_LEVEL: 370,
  FEED_COST_PER_TON: 12000
};
