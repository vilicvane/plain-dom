import {NodeType} from './dom.js';
import type {PlainAttribute, PlainNode} from './plain.js';

export function toPlain(node: Node): PlainNode {
  const {nodeType, nodeValue, childNodes} = node;

  switch (nodeType) {
    case NodeType.Element: {
      const {tagName, attributes} = node as Element;

      return {
        type: nodeType,
        name: tagName.toLowerCase(),
        attributes: attributesToPlain(attributes),
        childNodes: childNodesToPlain(childNodes),
      };
    }
    case NodeType.Text:
    case NodeType.CDATASection:
    case NodeType.Comment:
      return {
        type: nodeType,
        value: nodeValue!,
      };
    case NodeType.DocumentFragment:
      return {
        type: nodeType,
        childNodes: childNodesToPlain(childNodes),
      };
    default:
      throw new Error(`Unsupported node type: ${nodeType}.`);
  }

  function attributesToPlain(
    attributes: NamedNodeMap,
  ): PlainAttribute[] | undefined {
    return attributes.length > 0
      ? Array.from(attributes, ({name, value}) => {
          return {name, value};
        })
      : undefined;
  }

  function childNodesToPlain(
    childNodes: NodeListOf<ChildNode>,
  ): PlainNode[] | undefined {
    return childNodes.length > 0
      ? Array.from(childNodes, childNode => toPlain(childNode))
      : undefined;
  }
}
