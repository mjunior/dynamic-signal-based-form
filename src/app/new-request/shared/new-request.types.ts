export interface Schema {
  id: string;
  title: string;
  sections: Section[];
}
export interface Section {
  id: string;
  title: string;
  fields: Field[];
}

export interface Field {
  id: number;
  label: string;
  type: 'text' | 'number' | 'radio' | 'toggle';
  required?: boolean;
  options?: string[];
  default?: any;
}
