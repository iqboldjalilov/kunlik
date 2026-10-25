// Соф (ҳолатсиз) ёрдамчи функциялар. Манба: index.html — ҳар бир функция ўша ердан нусха олинган.

export const fmt = n => Number(n||0).toLocaleString("ru-RU");

export function fmtDate(iso){
  if(!iso) return "";
  const p = String(iso).slice(0,10).split("-");
  return p.length === 3 ? `${p[2]}.${p[1]}.${p[0]}` : String(iso);
}

export function esc(v){
  return String((v == null ? "" : v)).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

export function normDriver(name){
  return String(name || "").trim().replace(/\s+/g, " ");
}

export function simpleHash(str){
  let h = 0;
  for(let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; }
  return h.toString(36);
}

export function localDateStr(d){
  d = d || new Date();
  return d.getFullYear() + "-" +
         String(d.getMonth()+1).padStart(2,"0") + "-" +
         String(d.getDate()).padStart(2,"0");
}

export function addMonthsISO(iso, n){
  const p = String(iso || "").slice(0,10).split("-").map(Number);
  if(p.length !== 3 || p.some(isNaN)) return "";
  const total = p[1] - 1 + n;
  const y = p[0] + Math.floor(total / 12);
  const m0 = ((total % 12) + 12) % 12;
  const d = Math.min(p[2], new Date(y, m0 + 1, 0).getDate());
  return y + "-" + String(m0 + 1).padStart(2,"0") + "-" + String(d).padStart(2,"0");
}

export function fmtUsd(cents){
  const n = Math.round(Number(cents) || 0);
  const v = Math.abs(n);
  const whole = String(Math.floor(v / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (n < 0 ? "-" : "") + whole + "." + String(v % 100).padStart(2, "0");
}

export const somOfUsd = (cents, kurs) => Math.round(Number(cents || 0) / 100 * Number(kurs || 0));
