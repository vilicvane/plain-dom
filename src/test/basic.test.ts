import {JSDOM} from 'jsdom';

import {NodeType, type PlainNode, toDOM, toPlain} from '../library/index.js';

const {
  window: {document},
} = new JSDOM();

test('plain to dom to plain', () => {
  const object: PlainNode = {
    type: NodeType.Element,
    name: 'html',
    attributes: undefined,
    childNodes: [
      {
        type: NodeType.Element,
        name: 'div',
        attributes: [
          {
            name: 'id',
            value: 'foo',
          },
        ],
        childNodes: [
          {
            type: NodeType.Text,
            value: 'bar',
          },
        ],
      },
    ],
  };

  const node = toDOM(object, document);

  const object_2 = toPlain(node);

  expect(object_2).toEqual(object);

  expect((node as Element).outerHTML).toMatchInlineSnapshot(
    '"<html><div id="foo">bar</div></html>"',
  );
});
