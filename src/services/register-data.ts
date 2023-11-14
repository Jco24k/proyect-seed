import { checkPreferences } from 'joi';
import { AppDataSource } from './../database/database';

export interface IRegister{
  table: string;
  columns: string;
  dataCreate : any[]
}

export const registerData = async ({table,columns,dataCreate}: IRegister) => {
  let values: any = dataCreate.map(obj => Object.values(obj));
  const query = generateFormatSql(table,columns);
  try {
    await AppDataSource.query(
      query,
        [values]
    )
    const result = await AppDataSource.query(`SELECT * FROM ${table}`)
    return result
  } catch (error) {
    console.log(error);
  }
  
};

export const generateFormatSql = (table: string, columns: string) => {
  return `INSERT INTO ${table} (${columns}) VALUES ?`;
};

// function getLimitQuery(dbType, table, limit) {
//   let query = '';
//   switch(dbType) {
//     case 'mysql':
//     case 'postgres':
//       query = `SELECT * FROM ${table} LIMIT ${limit}`;
//       break;
//     case 'mssql':
//       query = `SELECT TOP ${limit} * FROM ${table}`;
//       break;
//     case 'oracle':
//       query = `SELECT * FROM (SELECT * FROM ${table}) WHERE ROWNUM <= ${limit}`;
//       break;
//     default:
//       console.log('DBMS not supported');
//   }
//   return query;
// }

// const query = getLimitQuery('mysql', 'myTable', 10);
