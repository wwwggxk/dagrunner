const Base = require('./Base');

class EventNode extends Base {
  constructor(params) {
    params = params || {};
    super('event', params);
  }
  async doRun(rt) {
    if (!this.params.type) {
      this.log('type is empty');
      this.status = Base.STATUS.FAIL;
      return;
    }
    switch (this.params.type) {
    case EventNode.TYPE.INPUT:
      this.log(`input ${rt.selector}`);
      await rt.page.$eval(rt.selector, (dom, value) => {
        dom.value = value;
      }, this.params.text);
      break;
    case EventNode.TYPE.CLICK:
      this.log(`click ${rt.selector}`);
      await rt.page.click(rt.selector);
      break;
    }
  }
}

EventNode.TYPE = {
  CLICK: 'click',
  INPUT: 'input'
};

module.exports = EventNode;
