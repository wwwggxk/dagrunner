/* 示例，加载baidu.com，在输入框输入字母dagrunner并搜索
 *
 * 1. 加载网页baidu.com
 * 2. 延时3秒等页面加载完成
 * 3. 选取输入框
 * 4. 设置输入框内容
 * 5. 选择搜索按钮
 * 6. 点击按钮
 *
 */

const Task = require('../index');

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
  }];

  await task.start();
})();
