export type PlainNode =
  | {
      type: typeof Node.ELEMENT_NODE;
      name: string;
      attributes: PlainAttributes | undefined;
      childNodes: PlainNode[] | undefined;
    }
  | {
      type: typeof Node.TEXT_NODE;
      value: string;
    }
  | {
      type: typeof Node.CDATA_SECTION_NODE;
      value: string;
    }
  | {
      type: typeof Node.COMMENT_NODE;
      value: string;
    }
  | {
      type: typeof Node.DOCUMENT_FRAGMENT_NODE;
      childNodes: PlainNode[] | undefined;
    };

export type PlainAttributes = Record<string, string>;
