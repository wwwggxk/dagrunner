const Task = require('../dist/index').Task;
const path = require('path');
const testDir = path.join(__dirname, '..');

(async () => {
  const task = new Task();
  task.nodes = [{
    key: 'web',
    params: {
      headless: false,
      url: 'https://www.baidu.com'
    },
    uuid: '1111'
  }, {
    key: 'timedelay',
    params: { time: 5000 },
    uuid: '2222',
    parent: '1111'
  }, {
    key: 'export',
    params: {
      directory: testDir,
      fullPage: true,
      bounds: {
        x: 10,
        y: 10,
        width: 400,
        height: 300
      },
      filename: 'export.png'
    },
    uuid: '3333',
    parent: '2222'
  }];

  await task.start();
})();
