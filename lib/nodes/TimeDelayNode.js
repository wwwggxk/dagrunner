const Base = require('./Base');
const utils = require('../Utils');

module.exports = class TimeDelayNode extends Base {
  constructor(params) {
    params = params || {};
    super('timedelay', params);
  }
  async doRun() {
    if (!this.params.time) {
      this.log('time is empty');
      this.status = Base.STATUS.FAIL;
      return;
    }
    this.log(`delay ${this.params.time}ms`);
    await utils.delay(this.params.time);
  }
};
