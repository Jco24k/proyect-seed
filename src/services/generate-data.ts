import { PassportCrypt } from "./passport-bcrypt";
import { faker } from "@faker-js/faker";
import { IAttribute } from "../interfaces/asset.structure.interface";
import { GenerateRandomInteger } from "./generate-random-int";
import { ValidateAttribute } from "./validate-structure";

export const GenerateData = (attribute: IAttribute) => {
  attribute = {
    type: "varchar",
    array: false,
    unique: false,
    email: false,
    encrypt: false,
    maxLength: 250,
    minLength: 1,
    precision: 4,
    scale: 2,
    ...attribute
  };
  ValidateAttribute(attribute);
  var data = "" as any;
  const arrayReturn = [];
  for (
    let index = 0;
    index < (attribute.array ? GenerateRandomInteger(1, 5) : 1);
    index++
  ) {
    data = typeToFunction[attribute.type](attribute);
    if (!attribute.array) return { [attribute.name]: data };
    arrayReturn.push(data);
  }
  return { [attribute.name]: arrayReturn };
};

function handleVarchar({
  name,
  unique,
  email,
  encrypt,
  maxLength,
}: IAttribute) {
  let data: string = "";
  if (email) {
    data = faker.internet.email();
  } else {
    data = ["name", "lastname", "surname"].includes(name)
      ? faker.person.fullName()
      : faker.finance.accountName();
  }
  if (unique) data += faker.string.nanoid(5);
  if (encrypt) data = PassportCrypt.encrypt(data);

  data = data.length <= maxLength ? data : data.slice(-maxLength);
  return data;
}

function handleBoolean({}: IAttribute) {
  return faker.datatype.boolean({ probability: 0.5 });
}

function handleDecimal({ minLength, precision, scale }: IAttribute) {
  return faker.finance.amount({ min: minLength, max: precision, dec: scale });
}

function handleNumber({ minLength = 1, maxLength = 4 }: IAttribute) {
  return faker.number.int({ min: minLength, max: maxLength });
}

const typeToFunction = {
  varchar: handleVarchar,
  boolean: handleBoolean,
  decimal: handleDecimal,
  number: handleNumber,
};
