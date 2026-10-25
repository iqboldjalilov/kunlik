// Сумни ўзбекча сўз билан ёзиш (кириллда). Овоз эълони учун: «уч миллион тўрт юз эллик минг».
const ONES = ["", "бир", "икки", "уч", "тўрт", "беш", "олти", "етти", "саккиз", "тўққиз"];
const TENS = ["", "ўн", "йигирма", "ўттиз", "қирқ", "эллик", "олтмиш", "етмиш", "саксон", "тўқсон"];

// 0..999 оралиғидаги сон
function below1000(n){
  const parts = [];
  const h = Math.floor(n / 100), r = n % 100;
  if(h) parts.push(h === 1 ? "юз" : ONES[h] + " юз");
  if(r){
    const t = Math.floor(r / 10), o = r % 10;
    if(t) parts.push(TENS[t]);
    if(o) parts.push(ONES[o]);
  }
  return parts.join(" ");
}

// Сумни бутун сўмга юмалоқлаб ўзбекча сўз қилади. 10^12 дан катта бўлса null қайтади.
export function sumToWordsUz(value){
  let n = Math.round(Number(value) || 0);
  if(!isFinite(n)) return null;
  if(n === 0) return "нол";
  const neg = n < 0;
  n = Math.abs(n);
  if(n >= 1e12) return null;
  const scales = [[1e9, "миллиард"], [1e6, "миллион"], [1e3, "минг"]];
  const out = [];
  for(const [v, name] of scales){
    const q = Math.floor(n / v);
    n = n % v;
    if(!q) continue;
    // «минг»нинг олдига «бир» қўшилмайди (бир минг → минг); миллион/миллиардда «бир» айтилади
    const prefix = (v === 1e3 && q === 1) ? "" : below1000(q) + " ";
    out.push((prefix + name).trim());
  }
  if(n) out.push(below1000(n));
  return (neg ? "минус " : "") + out.join(" ");
}
