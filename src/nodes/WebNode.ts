import { Base, NodeStatus } from './Base';
import puppeteer from 'puppeteer';

export default class WebNode extends Base {
    page: puppeteer.Page;
    browser: puppeteer.Browser;
    constructor(params) {
        params = params || {};
        super('web', params);
    }
    async doRun(context) {
        if (!this.params.url) {
            this.log('url is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        await this._init(this.params);
        this.log(`access url ${this.params.url}`);
        await this.page.goto(this.params.url);
        this.log(`access url ${this.params.url} success`);
        context.page = this.page;
        context.browser = this.browser;
    }
    async _init(options) {
        const { width, height } = { width: 1280, height: 768, ...this.params };
        this.log(`init browser (width: ${width}, height: ${height})`);
        this.browser = await puppeteer.launch({
            args: ['--no-sandbox', `--window-size=${width},${height}`],
            defaultViewport: {
                width,
                height
            },
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
