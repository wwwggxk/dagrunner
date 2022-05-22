import { Base, NodeStatus } from './Base';
import path from 'path';

export default class ExportNode extends Base {
    constructor(params: object) {
        params = params || {};
        super('export', params);
    }
    async doRun(context) {
        if (!this.params.directory) {
            this.log('directory is empty');
            this.status = NodeStatus.FAIL;
            return;
        }
        const name = this.params.filename || `${+new Date()}.png`;
        const filePath = path.join(this.params.directory, name);
        this.log(`save image to ${filePath}`);
        const options: {
      path: string,
      fullPage: boolean,
      clip?: { x: number, y: number, width: number, height: number}
    } = {
        path: filePath,
        fullPage: false
    };
        if (this.params.fullPage) {
            options.fullPage = true;
        } else if (this.params.bounds) {
            options.clip = {
                x: this.params.bounds.x,
                y: this.params.bounds.y,
                width: this.params.bounds.width,
                height: this.params.bounds.height
            };
        }
        await context.page.waitForTimeout(3000);
        await context.page.screenshot(options);
        this.log('save success');
    }
}
