export interface Schema {
  id: string;
  title: string;
  sections: Section[];
}
export interface Section {
  id: string;
  title: string;
  fields: any[];
}