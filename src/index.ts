import FormBuilder from './FormBuilder.js';
import renderHtml from './renderers/html.js';
import type { FormOptions, Template } from './types.js';

export type {
  FieldType,
  FormOptions,
  InputOptions,
  Template,
} from './types.js';
export type { FormBuilder };

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

    return renderHtml({ action: url, method, children: builder.getNodes() });
  }
}
