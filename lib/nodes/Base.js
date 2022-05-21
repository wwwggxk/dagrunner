const moment = require('moment');

class Base {
  constructor(key, params) {
    this.key = key;
    this.params = params || {};
    this.status = Base.STATUS.DRAFT;

    this.rt = null;
    this.logs = [];

    this.parent = null;
  }
  async run(rt) {
    this.logs = [];
    this.status = Base.STATUS.RUNNING;
    const insRt = await this.doRun(rt);
    this.status = Base.STATUS.SUCCESS;
    if (rt) {
      this.rt = rt;
    }
    if (insRt) {
      this.rt = { ...(rt || {}), ...insRt };
    }
  }
  async doRun() { }
  log(msg) {
    console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}][${this.key}] ${msg}`);
    this.logs.push(msg);
  }
}

Base.STATUS = {
  DRAFT: 0, // 默认
  RUNNING: 1, // 运行中
  FAIL: 2, // 失败
  SUCCESS: 3 // 成功
};

module.exports = Base;
