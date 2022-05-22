export const delay = time => new Promise(r => setTimeout(() => r(true), time || 300));
