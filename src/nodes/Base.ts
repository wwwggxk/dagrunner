import moment from 'moment';

export enum NodeStatus {
  DRAFT = 0,
  RUNNING,
  FAIL,
  SUCCESS
}

export interface IParam {
  [key: string]: any
}

export interface INode {
  key: string;
  uuid: string;
  params: IParam | null;
  logs: Array<string>;
  parent?: INode;
  status: NodeStatus;

  doRun: (context: Record<string, unknow>, store: Record<string, unknow>) =>
    Promise<IParam | void>;
}

export class Base implements INode {
    uuid: string;
    key: string;
    params: IParam;
    logs: Array<string>;
    parent?: INode;
    status: NodeStatus;

    constructor(key: string, params: Record<string, unknow>) {
        this.key = key;
        this.params = params || {};
        this.status = NodeStatus.DRAFT;
        this.logs = [];
        this.parent = null;
    }
    async run(context: Record<string, unknow>, store: Record<string, unknow>) {
        this.logs = [];
        this.status = NodeStatus.RUNNING;
        const result = await this.doRun(context, store);
        this.status = NodeStatus.SUCCESS;
        if (result !== undefined) {
            store[this.uuid] = result;
        }
    }
    async doRun(_context: Record<string, unknow>, _store: Record<string, unknow>): Promise<IParam | void> {
        return null;
    }
    log(msg) {
        console.log(`[${moment().format('YYYY-MM-DD HH:MM:SS')}][${this.key}] ${msg}`);
        this.logs.push(msg);
    }
}
