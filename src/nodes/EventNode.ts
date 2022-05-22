import { Base, NodeStatus } from './Base';

export enum EventNodeType {
  CLICK = 'click',
  INPUT = 'input'
}

class EventNode extends Base {
    constructor(params: Record<string, unknow>) {
        params = params || {};
        super('event', params);
    }
    async doRun(context) {
        if (!this.params.type) {
            this.log('type is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        switch (this.params.type) {
        case EventNodeType.INPUT:
            this.log(`input ${context.selector}`);
            await context.page.$eval(context.selector, (dom, value) => {
                dom.value = value;
            }, this.params.text);
            break;
        case EventNodeType.CLICK:
            this.log(`click ${context.selector}`);
            await context.page.click(context.selector);
            break;
        }
    }
}

export default EventNode;
