import { IAttribute } from "../interfaces/asset.structure.interface";

export const ValidateAttribute = (attribute: IAttribute) => {
    const {type, unique, email, encrypt, minLength, maxLength, precision, scale } = attribute;
    if (type !== "varchar" && (email || encrypt || unique)) {
      throw new Error("Los atributos 'email', 'encrypt' y 'unique' solo pueden usarse con el tipo 'varchar'.");
    }
    if (type === "number" && (email || encrypt)) {
      throw new Error("El tipo 'number' no puede tener los atributos 'email' o 'encrypt'.");
    }
    if (type === "decimal" && (email || encrypt || unique || !precision || !scale)) {
      throw new Error("El tipo 'decimal' no puede tener los atributos 'email' , 'encrypt' o 'unique' y requiere los atributos 'precision' y 'scale'.");
    }
    if (minLength && maxLength && minLength > maxLength) {
      throw new Error("'minLength' no puede ser mayor que 'maxLength'.");
    }
    if(maxLength < 60 && encrypt){
      throw new Error("'maxLength' no puede ser menor a 60 , cuando encrypt esta activo");
    }
    if(email && maxLength< 15){
        throw new Error("'maxLength' no puede ser menor a 15 , cuando email esta activo");
    }
  };