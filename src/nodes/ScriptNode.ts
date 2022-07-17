import { Base, NodeStatus } from './Base';

export default class ScriptNode extends Base {
    constructor(params: object) {
        params = params || {};
        super('script', params);
    }
    async doRun(context) {
        if (!this.params.code) {
            this.log('code is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        const data = this.params.data || [];
        const methods = (this.params.methods || [])
            .filter(item => item && item.length === 2);
        for (const arr of methods) {
            await context.page.exposeFunction(arr[0], arr[1]);
        }
        this.log('evaluating code');
        const result = context.page.evaluate(async (codeString, input) => {
            window['$0'] = input;
            (input || []).forEach((item, i) => {
                window[`$${i + 1}`] = item;
            });
            return eval(codeString);
        }, this.params.code, data);
        return result;
    }
}
