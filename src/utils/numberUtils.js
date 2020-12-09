export const formatNumber = (n = '') => n.toLocaleString();
export const leftPad = (n, minSize = 2) => `${'0'.repeat(Math.max(minSize - n.toString().length, 0))}${n}`;
