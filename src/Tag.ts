import escapeHtml from './escapeHtml.js';
import type { Attributes } from './types.js';

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
      .map(([key, value]) => ` ${key}="${escapeHtml(String(value))}"`)
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
