const Base = require('./Base');

module.exports = class SelectorNode extends Base {
  constructor(params) {
    params = params || {};
    super('selector', params);
  }
  async doRun(rt) {
    if (!this.params.selector) {
      this.log('seletor is empty');
      this.status = Base.STATUS.FAIL;
      return;
    }
    this.log(`select ${this.params.selector}`);
    const el = await rt.page.$(this.params.selector);
    if (!el) {
      this.log(`element is not exist ${this.params.selector}`);
      this.status = Base.STATUS.FAIL;
      return;
    }
    return { selector: this.params.selector };
  }
};
