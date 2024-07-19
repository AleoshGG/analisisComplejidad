import { insertToArray, insertToList } from "./insertStructures.mjs";

const btnInsertar = document.getElementById("insertar");

btnInsertar.addEventListener("click", async () => {
  btnInsertar.disabled = true;
  const executionTimeToList = await insertToList();
  console.log(
    `Tiempo en segundos funcion fuera lista ${executionTimeToList / 1000}`
  );

  const executionTimeToAry = await insertToArray();
  console.log(
    `Tiempo en segundos funcion fuera array ${executionTimeToAry / 1000}`
  );
});

document.getElementById("reiniciar").addEventListener("click", () => {
  window.location.reload();
});
