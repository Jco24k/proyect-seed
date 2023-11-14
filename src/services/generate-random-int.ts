export const GenerateRandomInteger = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('El valor mínimo debe ser menor o igual al valor máximo.');
  }

  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
};