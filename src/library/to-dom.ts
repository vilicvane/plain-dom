import {NodeType} from './dom.js';
import type {PlainAttribute, PlainNode} from './plain.js';

export function toDOM(object: PlainNode, document = window.document): Node {
  switch (object.type) {
    case NodeType.Element:
      return withChildNodes(
        withAttributes(document.createElement(object.name), object.attributes),
        object.childNodes,
      );
    case NodeType.Text:
      return document.createTextNode(object.value);
    case NodeType.CDATASection:
      return document.createCDATASection(object.value);
    case NodeType.Comment:
      return document.createComment(object.value);
    case NodeType.DocumentFragment:
      return withChildNodes(
        document.createDocumentFragment(),
        object.childNodes,
      );
    default:
      throw new Error(`Unsupported node type: ${(object as PlainNode).type}.`);
  }

  function withAttributes(
    node: Element,
    attributes: PlainAttribute[] | undefined,
  ): Element {
    for (const {name, value} of attributes ?? []) {
      node.setAttribute(name, value);
    }

    return node;
  }

  function withChildNodes(
    node: Node,
    childNodes: PlainNode[] | undefined,
  ): Node {
    for (const child of childNodes ?? []) {
      node.appendChild(toDOM(child, document));
    }

    return node;
  }
}
