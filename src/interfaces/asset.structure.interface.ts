export interface IAssetStructure {
  tables: ITable[];
  quantity: number;
}

export interface ITable {
  name: string;
  attributes: IAttribute[];
  dependencies: IDependencie[];
}


export interface IAttribute {
  name: string;
  type: "varchar" | "number" | "decimal" | "boolean";
  minLength?: number;
  maxLength?: number;
  array?: boolean;
  unique?: boolean;
  email?: boolean;
  encrypt?: boolean;
  precision?: number;
  scale?: number;
}

export interface IDependencie {
  name: string;
  tableRelation: string;
  type: "varchar" | "number";
}
