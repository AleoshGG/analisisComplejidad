import { insertToArray, insertToList } from "./insertStructures.mjs";
import { searchToArray, searchToList } from "./searchIn.mjs";
import { bubleSort, mergeSort, radixSort } from "./arrayOrderBy.mjs";
import { ary } from "../dependences/structures.mjs";

const btnInsertar = document.getElementById("insertar");
const btnBuscar = document.getElementById("buscar");
const btnOrdenar = document.getElementById("ordenar");

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

btnOrdenar.addEventListener("click", ()=> {
  const startTimeB = performance.now()
  const dataB = bubleSort(ary);
  const endTimeB = performance.now();

  // for (let i = 0; i < dataB.length; i++) {
  //   console.log(dataB[i].review_count);
  // }
  
  console.log(
    `Tiempo en segundos funcion ORDENAR BUBLE array ${(endTimeB - startTimeB) / 1000}`
  );

  const startTimeM = performance.now()
  const dataM = mergeSort(ary);
  const endTimeM = performance.now();

  /* for (let i = 0; i < dataM.length; i++) {
    console.log(dataM[i].review_count);
  } */
  console.log(
    `Tiempo en segundos funcion ORDENAR MERGE array ${(endTimeM - startTimeM) / 1000}`
  );

  const startTimeR = performance.now()
  const dataR = radixSort(ary);
  const endTimeR = performance.now();

  /* for (let i = 0; i < dataR.length; i++) {
    console.log(dataR[i].review_count);
  } */
  console.log(
    `Tiempo en segundos funcion ORDENAR RADIX array ${(endTimeR - startTimeR) / 1000}`
  );

});