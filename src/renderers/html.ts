import escapeHtml from '../escapeHtml.js';
import Tag from '../Tag.js';
import type {
  FieldNode,
  FieldType,
  Form,
  FormNode,
} from '../types.js';

const controlRenderers: Record<FieldType, (field: FieldNode) => Tag> = {
  input: ({ name, value, attributes }) => new Tag('input', {
    name,
    type: 'text',
    value,
    ...attributes,
  }),
  textarea: ({ name, value, attributes }) => new Tag('textarea', {
    cols: 20,
    rows: 40,
    name,
    ...attributes,
  }, escapeHtml(value)),
};

const renderField = (field: FieldNode): string => {
  const label = new Tag('label', { for: field.name, ...field.labelAttributes }, escapeHtml(field.label));
  const control = controlRenderers[field.as](field);

  return `${label.toString()}${control.toString()}`;
};

const renderNode = (node: FormNode): string => {
  switch (node.kind) {
    case 'field':
      return renderField(node);
    case 'submit':
      return new Tag('input', { type: 'submit', value: node.value }).toString();
  }
};

const renderHtml = ({ action, method, children }: Form): string => {
  const body = children.map(renderNode).join('');

  return new Tag('form', { method, action }, body).toString();
};

export default renderHtml;
