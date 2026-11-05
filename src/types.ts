export type AttributeValue = string | number;
export type Attributes = Record<string, AttributeValue>;

export type Template = Record<string, unknown>;

export const FIELD_TYPES = ['input', 'textarea'] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

export type InputOptions = Attributes & { as?: FieldType };

export interface FormOptions {
  url?: string;
  method?: string;
}

export interface FieldNode {
  kind: 'field';
  as: FieldType;
  name: string;
  label: string;
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
