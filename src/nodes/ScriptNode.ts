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
        this.log('evaluating code');
        const result = context.page.evaluate(async codeString => {
            return eval(codeString);
        }, this.params.code);
        return result;
    }
}
