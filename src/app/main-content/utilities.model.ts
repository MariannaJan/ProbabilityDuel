export function  randomProperty(obj) {
    const keys = Object.keys(obj);
    return obj[keys[Math.round(keys.length * Math.random())]];
  }

export function roundPercent (val) {
    return Math.round(val * 10000) / 100;
}
