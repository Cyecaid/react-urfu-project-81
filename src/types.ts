export type AttributeValue = string | number;
export type Attributes = Record<string, AttributeValue>;

export type Template = Record<string, unknown>;

export const FIELD_TYPES = ['input', 'textarea'] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

interface FieldOptions {
  as?: FieldType;
  label?: string;
  labelHtml?: Attributes;
}

export type InputOptions = FieldOptions & Record<string, AttributeValue | Attributes | undefined>;

export interface FormOptions {
  url?: string;
  method?: string;
}

export interface FieldNode {
  kind: 'field';
  as: FieldType;
  name: string;
  label: string;
  labelAttributes: Attributes;
  value: string;
  attributes: Attributes;
}

export interface SubmitNode {
  kind: 'submit';
  value: string;
}

export type FormNode = FieldNode | SubmitNode;

export interface Form {
  action: string;
  method: string;
  children: FormNode[];
}
