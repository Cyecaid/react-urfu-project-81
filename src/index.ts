import FormBuilder, { type Template } from './FormBuilder.js';
import Tag from './Tag.js';

export interface FormOptions {
  url?: string;
  method?: string;
}

export type FormBuildCallback<T extends Template> = (form: FormBuilder<T>) => void;

export default class HexletCode {
  static formFor<T extends Template>(
    template: T,
    options: FormOptions = {},
    build: FormBuildCallback<T> = () => {},
  ): string {
    const { url = '#', method = 'post' } = options;

    const builder = new FormBuilder(template);
    build(builder);

    return new Tag('form', { action: url, method }, builder.render()).toString();
  }
}
