export type AttributeValue = string | number;
export type Attributes = Record<string, AttributeValue>;

const SINGLE_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

const escapeAttribute = (value: AttributeValue): string =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export default class Tag {
  constructor(
    private readonly name: string,
    private readonly attributes: Attributes = {},
    private readonly body: string = '',
  ) {}

  private isSingle(): boolean {
    return SINGLE_TAGS.has(this.name);
  }

  private renderAttributes(): string {
    return Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${escapeAttribute(value)}"`)
      .join('');
  }

  toString(): string {
    const openTag = `<${this.name}${this.renderAttributes()}>`;

    if (this.isSingle()) {
      return openTag;
    }

    return `${openTag}${this.body}</${this.name}>`;
  }
}
