const NodeFactory = require('./NodeFactory');

module.exports = class Task {
  constructor() {
    this.nodes = [];
  }
  async start() {
    this._parseNodes();
    await this.traverse(this.treeNodes);
  }
  async traverse(nodes, parentRt) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const nodeIns = NodeFactory.create(node.key, node.params);
      await nodeIns.run(parentRt);
      if (node.children) {
        await this.traverse(node.children, nodeIns.rt);
      }
    }
  }
  _parseNodes() {
    const treeNodes = this.nodes.filter(node => !node.parent);
    let left = this.nodes.filter(node => node.parent);
    let current = treeNodes;
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

    this.treeNodes = treeNodes;
  }
};
