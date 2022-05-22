const Task = require('../dist/index').Task;
const path = require('path');
const testDir = path.join(__dirname, '..');

(async () => {
  const task = new Task();
  task.nodes = [{
    key: 'web',
    params: { headless: false, url: 'https://www.baidu.com' },
    uuid: '1'
  }, {
    key: 'timedelay',
    params: { time: 3000 },
    uuid: '11',
    parent: '1'
  }, {
    key: 'selector',
    params: { selector: '#kw' },
    uuid: '111',
    parent: '11'
  }, {
    key: 'event',
    params: { type: 'input', text: 'dagrunner' },
    uuid: '1111',
    parent: '111'
  }, {
    key: 'selector',
    params: { selector: '#su' },
    uuid: '11111',
    parent: '1111'
  }, {
    key: 'event',
    params: { type: 'click' },
    uuid: '111111',
    parent: '11111'
  }, {
    key: 'code',
    params: { code: 'console.log("333")' },
    uuid: '1111111',
    parent: '111111'
  }, {
    key: 'export',
    params: {
      directory: testDir,
      // fullPage: true,
      bounds: {
        x: 10,
        y: 10,
        width: 120,
        height: 40
      },
      filename: 'exportBounds.png'
    },
    uuid: '11111111',
    parent: '1111111'
  }];

  await task.start();
})();
