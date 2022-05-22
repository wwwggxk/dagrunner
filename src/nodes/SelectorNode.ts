import { Base, NodeStatus } from './Base';

export default class SelectorNode extends Base {
    constructor(params: object) {
        params = params || {};
        super('selector', params);
    }
    async doRun(context) {
        if (!this.params.selector) {
            this.log('seletor is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        this.log(`select ${this.params.selector}`);
        const el = await context.page.$(this.params.selector);
        if (!el) {
            this.log('element is not exist');
            this.status = NodeStatus.FAIL;
            return;
        }
        context.selector = this.params.selector;
    }
}
