

# Proyect Seed

1. Clonar proyecto
2. ```npm install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Existe un ```asset.structure.json``` donde tendras que modificarlo
    segun la estructura de tu base de datos
6. Levantar: ```npm run start:dev```

### Estructura para los registros

```
AssetStructure {
  quantity: number;                                                   //CANTIDAD DE REGISTROS
  tables: [
    {
        name: string;                                                 //NOMBRE DE LAS TABLA
        attributes: [
            name: string;                                             //NOMBRE DEL ATRIBUTO O COLUMNA
            type: "varchar" | "number" | "decimal" | "boolean";
            minLength?: number;
            maxLength?: number;
            array?: boolean;
            unique?: boolean;
            email?: boolean;
            encrypt?: boolean;
            precision?: number;
            scale?: number;
        ];
        dependencies: [                                               //TABLAS DE LAS QUE DEPENDE
            {
                name: string;                                         //NOMBRE DEL CLAVE FORANEA
                type: "varchar" | "number";
                tableRelation: string;                                //NOMBRE DE LA TABLA A RELACIONAR
                                                                      //(LA TABLA A RELACIONAR DE ESTAR DEFINIDA
                                                                            EN LA SECCION DE TABLES)
            }
        ];
    }
  ]
}

```
