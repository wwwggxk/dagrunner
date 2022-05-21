const nodes = require('./nodes');
const {
  WebNode,
  SelectorNode,
  EventNode,
  TimeDelayNode
} = nodes;

module.exports = class NodeFactory {
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
    }
  }
};
