import NodeFactory from './NodeFactory';
import { IParam } from './nodes/Base';

export interface ITaskNode {
  key: string;
  uuid: string;
  params: IParam;
  parent?: string;
  children?: ITaskNode;
}

export default class Task {
    nodes: ITaskNode[];
    nodeTree: Record<string, unknow>;
    nodeMap = {};
    store = {};
    constructor() {
        this.nodes = [];
    }
    async start() {
        this._parseNodes();
        await this.traverse(this.nodeTree, null, this.store);
    }
    async traverse(nodes, context, store) {
        if (!context) {
            context = {};
        }
        for (let i = 0; i < nodes.length; i++) {

            const node = nodes[i];
            const nodeIns = NodeFactory.create(node.key, node.params);
            nodeIns.uuid = node.uuid;
            this.nodeMap[node.uuid] = nodeIns;

            if (node.parent && this.nodeMap[node.parent]) {
                nodeIns.parent = this.nodeMap[node.parent];
            }


            await nodeIns.run(context, this.store);
            if (node.children) {
                await this.traverse(node.children, context, store);
            }
        }
    }
    _parseNodes() {
        const nodeTree = this.nodes.filter(node => !node.parent);
        let left = this.nodes.filter(node => node.parent);
        let current = nodeTree;
        while (left.length) {
            let children;
            current.forEach(tree => {
                children = left.filter(node =>
                    node.parent === tree.uuid
                );
                tree.children = children;
                left = left.filter(node =>
                    !children.map(child => child.uuid).includes(node.uuid)
                );
            });
            current = children;
        }

        this.nodeTree = nodeTree;
    }
}
