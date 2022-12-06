export const clean = function (text: string) {
  return text
    .normalize('NFD') // Normalizamos para obtener los códigos
    .replace(/[\u0300-\u036f|.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Quitamos los acentos y símbolos de puntuación
    .replaceAll("'", '')
    .replace(/ +/g, '_') // Reemplazamos los espacios por guiones
    .toLowerCase(); // Todo minúscula
};
