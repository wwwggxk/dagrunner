import {
    WebNode,
    SelectorNode,
    EventNode,
    TimeDelayNode,
    ScriptNode,
    ExportNode,
    ApiNode
} from './nodes';

export default class NodeFactory {
    static create(key, params) {
        switch (key) {
        case 'web':
            return new WebNode(params);
        case 'selector':
            return new SelectorNode(params);
        case 'event':
            return new EventNode(params);
        case 'timedelay':
            return new TimeDelayNode(params);
        case 'code':
            return new ScriptNode(params);
        case 'export':
            return new ExportNode(params);
        case 'api':
            return new ApiNode(params);
        }
    }
}
