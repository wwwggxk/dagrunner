import { Base, NodeStatus } from './Base';
import { delay } from '../Utils';

export default class TimeDelayNode extends Base {
    constructor(params: object) {
        params = params || {};
        super('timedelay', params);
    }
    async doRun() {
        if (!this.params.time) {
            this.log('time is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        this.log(`delaying ${this.params.time}ms`);
        await delay(this.params.time);
    }
}
