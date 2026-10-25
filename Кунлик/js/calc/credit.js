// Кредит/лизинг жадвали (соф ҳисоб). Манба: index.html.
import { localDateStr, addMonthsISO } from '../core/utils.js';

export function buildCreditSchedule(p){
  const n = Math.max(1, Math.round(p.months));
  const P = Math.max(0, Math.round(p.principal));
  const r = Number(p.rate || 0) / 100 / 12;
  const first = /^\d{4}-\d{2}-\d{2}$/.test(p.firstDate || "") ? p.firstDate : localDateStr();
  const annuity = p.type === "differensial" ? 0
    : Math.round(r === 0 ? P / n : P * r / (1 - Math.pow(1 + r, -n)));
  const baseAsosiy = Math.round(P / n);
  const rows = [];
  let balance = P;
  for(let i = 1; i <= n; i++){
    const foiz = Math.round(balance * r);
    let asosiy;
    if(i === n) asosiy = balance;
    else if(p.type === "differensial") asosiy = Math.min(baseAsosiy, balance);
    else asosiy = Math.max(0, Math.min(annuity - foiz, balance));
    rows.push({ n:i, sana: addMonthsISO(first, i - 1), tolov: asosiy + foiz, asosiy, foiz, qoldiq: balance - asosiy });
    balance -= asosiy;
  }
  return rows;
}
