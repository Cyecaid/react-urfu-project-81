import {
  type AttributeValue,
  type Attributes,
  FIELD_TYPES,
  type FieldType,
  type FormNode,
  type InputOptions,
  type Template,
} from './types.js';

const DEFAULT_SUBMIT_VALUE = 'Save';

const isFieldType = (value: string): value is FieldType => (FIELD_TYPES as readonly string[]).includes(value);

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

const isAttributeValue = (value: unknown): value is AttributeValue => typeof value === 'string' || typeof value === 'number';

const pickAttributes = (options: Record<string, unknown>): Attributes => Object.fromEntries(
  Object.entries(options).filter((entry): entry is [string, AttributeValue] => isAttributeValue(entry[1])),
);

const stringifyValue = (value: unknown): string => (value === null || value === undefined ? '' : String(value));

export default class FormBuilder<T extends Template> {
  private readonly nodes: FormNode[] = [];

  constructor(private readonly template: T) {}

  input(name: keyof T & string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Поля '${name}' в шаблоне нет`);
    }

    const {
      as = 'input',
      label = capitalize(name),
      labelHtml = {},
      ...attributes
    } = options;

    if (!isFieldType(as)) {
      throw new Error(`Неизвестный тип '${as}'.`);
    }

    this.nodes.push({
      kind: 'field',
      as,
      name,
      label,
      labelAttributes: labelHtml,
      value: stringifyValue(this.template[name]),
      attributes: pickAttributes(attributes),
    });
  }

  submit(value: string = DEFAULT_SUBMIT_VALUE): void {
    this.nodes.push({ kind: 'submit', value });
  }

  getNodes(): FormNode[] {
    return [...this.nodes];
  }
}
