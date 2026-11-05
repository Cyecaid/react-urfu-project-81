export type Template = Record<string, unknown>;

export default class FormBuilder<T extends Template> {
  constructor(private readonly template: T) {}

  render(): string {
    return '';
  }
}
