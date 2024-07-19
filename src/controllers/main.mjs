import { insertToArray, insertToList } from "./insertStructures.mjs";
import { searchToArray, searchToList } from "./searchIn.mjs";

const btnInsertar = document.getElementById("insertar");
const btnBuscar = document.getElementById("buscar");

btnInsertar.addEventListener("click", async () => {
  btnInsertar.disabled = true;
  const executionTimeToList = await insertToList();
  console.log(
    `Tiempo en segundos funcion INSERTAR lista ${executionTimeToList / 1000}`
  );

  const executionTimeToAry = await insertToArray();
  console.log(
    `Tiempo en segundos funcion INSERTAR array ${executionTimeToAry / 1000}`
  );
});

document.getElementById("reiniciar").addEventListener("click", () => {
  window.location.reload();
});

btnBuscar.addEventListener("click", () => {
  btnInsertar.disabled = true;
  const review_count = parseInt(document.getElementById("buscarInput").value);

  const dataReturnList =  searchToList(review_count);
  console.log(dataReturnList.data);
  console.log(
    `Tiempo en segundos funcion BUSCAR lista ${dataReturnList.executionTime / 1000}`
  );

  const dataReturnAry =  searchToArray(review_count);
  console.log(dataReturnAry.data)
  console.log(
    `Tiempo en segundos funcion BUSCAR array ${dataReturnAry.executionTime / 1000}`
  );
});
