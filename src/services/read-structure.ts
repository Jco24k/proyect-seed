import { object } from "joi";
import * as structure from "../../asset.structure.json";
import {
  IAssetStructure,
  IAttribute,
  ITable,
} from "../interfaces/asset.structure.interface";
import { GenerateData } from "./generate-data";
import { GenerateRandomInteger } from "./generate-random-int";
import { registerData } from "./register-data";

const dataAllCreate = [];

export const ReadStructure = async () => {
  let data: IAssetStructure = structure as any;
  const tables = sortTables(data);
  // const tablesWithoutDependencies = data.tables.filter(
  //   (tbl) => !tbl.dependencies
  // );
  // const tablesWithDependencies = data.tables.filter((tbl) => tbl.dependencies);
  const result = await forTables(tables, data.quantity);
  // console.log(result);
};

const forTables = async (tables: ITable[], quantity: number = 1) => {
  for (const tbl of tables) {
    const dataTblCreate = genereAttributes(quantity, tbl);
    let columnas = Object.keys(dataTblCreate[0]).join(", ");

    const register = await registerData({
      table: tbl.name,
      columns: columnas,
      dataCreate: dataTblCreate,
    });
    dataAllCreate[tbl.name] = register;
  }
  return dataAllCreate;
};

const sortTables = (assetStructure: IAssetStructure): ITable[] => {
  let sortedTables: ITable[] = [];
  let tablesWithDependencies: ITable[] = [...assetStructure.tables];
  while (tablesWithDependencies.length > 0) {
    let table = tablesWithDependencies.find(
      (tbl) =>
        !tbl.dependencies ||
        tbl.dependencies.every((dep) =>
          sortedTables.some(
            (sortedTable) => sortedTable.name === dep.tableRelation
          )
        )
    );
    if (!table) {
      throw new Error(
        "No se puede resolver las dependencias, puede que haya una dependencia circular"
      );
    }
    sortedTables.push(table);
    tablesWithDependencies = tablesWithDependencies.filter((t) => t !== table);
  }

  return sortedTables;
};

const genereAttributes = (
  quantity: number,
  { attributes = [], dependencies = [] }: ITable
) => {
  const dataTblCreate = [];
  for (let index = 0; index < quantity; index++) {
    let objectCreate = {};
      attributes?.forEach((atr) => {
        const dataGenerate = GenerateData(atr);
        objectCreate = { ...objectCreate, ...dataGenerate };
      });
      dependencies?.forEach((dep) => {
        const { tableRelation, name } = dep;
        const tablesDependencies: any[] = dataAllCreate[tableRelation];
        const register =
          tablesDependencies[
            GenerateRandomInteger(1, tablesDependencies.length)
          ];
        objectCreate = { ...objectCreate, [name]: register["id"] };
      });
    dataTblCreate.push(objectCreate);
  }
  return dataTblCreate;
};
