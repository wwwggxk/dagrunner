import { Base, NodeStatus } from './Base';
import axios from 'axios';

export default class ApiNode extends Base {
    constructor(params: object) {
        const defaultParam = { method: 'GET' };
        params = {...defaultParam, ...(params || {})};
        super('api', params);
    }
    async doRun(context, store) {
        if (!this.params.url) {
            this.log('url is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        if (!this.params.method) {
            this.log('method is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        if (!['get', 'post'].includes(this.params.method.toLowerCase())) {
            this.log('method only support get, post');
            this.status = NodeStatus.FAIL;
            return;
        }

        this.log(`call api [${this.params.method}]${this.params.url}`);
        let data = null;
        let body = null;
        if (this.params.dataSource === 'parent' && this.parent) {
            body = store[this.parent.uuid];
        } else {
            body = this.params.body;
        }

        try {
            const res = await axios({
                url: this.params.url,
                method: this.params.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(body)
            });
            const isSuccess = res && res.status === 200;
            if (!isSuccess) {
                this.log(`call fail: ${res.status}`);
                this.status = NodeStatus.FAIL;
                return;
            }
            data = res.data;
            if (typeof data !== 'object') {
                data = { data };
            }
        } catch (e) {
            this.log(`call fail: ${e.message}`);
            this.status = NodeStatus.FAIL;
            return;
        }

        return data;
    }
}
