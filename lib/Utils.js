module.exports.delay = time => new Promise(r => setTimeout(() => r(), time || 300));
