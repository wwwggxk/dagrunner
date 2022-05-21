const Base = require('./Base');
const puppeteer = require('puppeteer');

class WebNode extends Base {
  constructor(params) {
    params = params || {};
    super('web', params);
  }
  async doRun() {
    if (!this.params.url) {
      this.log('url is empty');
      this.status = Base.STATUS.FAIL;
      return;
    }
    await this._init(this.params);
    this.log(`access url ${this.params.url}`);
    await this.page.goto(this.params.url);
    this.log(`access url ${this.params.url} success`);
    return { page: this.page, browser: this.browser };
  }
  async _init(options) {
    this.log('init browser');
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      ...(options || {})
    });
    this.log('init browser success');
    this.page = await this.browser.newPage();
  }
  async dispose() {
    if (this.browser) {
      return;
    }
    await this.browser.close();
  }
}

module.exports = WebNode;
