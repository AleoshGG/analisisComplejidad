import { insertToArray, insertToList } from "./insertStructures.mjs";
import { searchToArray, searchToList } from "./searchIn.mjs";
import { bubleSort, mergeSort, radixSort } from "./arrayOrderBy.mjs";
import { ary } from "../dependences/structures.mjs";

const btnInsertar = document.getElementById("insertar");
const btnBuscar = document.getElementById("buscar");
const btnOrdenar = document.getElementById("ordenar");
const chartElement = document.getElementById("chart");

let insertData = { timeList: [], timeArray: [], timestamps: [] };
let searchData = { timeList: [], timeArray: [], timestamps: [] };

const chartOptions = {
  series: [
    { name: 'Tiempo Lista (Insertar)', data: insertData.timeList },
    { name: 'Tiempo Array (Insertar)', data: insertData.timeArray },
    { name: 'Tiempo Lista (Buscar)', data: searchData.timeList },
    { name: 'Tiempo Array (Buscar)', data: searchData.timeArray }
  ],
  chart: {
    type: 'bar',
    height: 400
  },
  xaxis: {
    categories: insertData.timestamps,
    title: { text: 'Tiempo' }
  },
  yaxis: {
    title: { text: 'Segundos' }
  },
  plotOptions: {
    bar: { horizontal: false }
  },
  title: {
    text: 'Análisis de Tiempo'
  }
};

const chart = new ApexCharts(chartElement, chartOptions);
chart.render();

btnInsertar.addEventListener("click", async () => {
  btnInsertar.disabled = true;
  const timestamp = new Date().toLocaleTimeString();

  const executionTimeToList = await insertToList();
  console.log(
    `Tiempo en segundos funcion INSERTAR lista ${executionTimeToList / 1000}`
  );

  const executionTimeToAry = await insertToArray();
  console.log(
    `Tiempo en segundos funcion INSERTAR array ${executionTimeToAry / 1000}`
  );

  insertData.timeList.push(executionTimeToList / 1000);
  insertData.timeArray.push(executionTimeToAry / 1000);
  insertData.timestamps.push(timestamp);

  chart.updateSeries([
    { name: 'Tiempo Lista (Insertar)', data: insertData.timeList },
    { name: 'Tiempo Array (Insertar)', data: insertData.timeArray }
  ]);
  chart.updateOptions({ xaxis: { categories: insertData.timestamps } });
});

document.getElementById("reiniciar").addEventListener("click", () => {
  window.location.reload();
});

btnBuscar.addEventListener("click", () => {
  btnInsertar.disabled = true;
  const review_count = parseInt(document.getElementById("buscarInput").value);
  const timestamp = new Date().toLocaleTimeString();

  const dataReturnList =  searchToList(review_count);
  console.log(dataReturnList.data);
  console.log(
    `Tiempo en segundos funcion BUSCAR lista ${dataReturnList.executionTime / 1000}`
  );

  const dataReturnAry =  searchToArray(review_count);
  console.log(dataReturnAry.data);
  console.log(
    `Tiempo en segundos funcion BUSCAR array ${dataReturnAry.executionTime / 1000}`
  );

  searchData.timeList.push(dataReturnList.executionTime / 1000);
  searchData.timeArray.push(dataReturnAry.executionTime / 1000);
  searchData.timestamps.push(timestamp);

  chart.updateSeries([
    { name: 'Tiempo Lista (Insertar)', data: insertData.timeList },
    { name: 'Tiempo Array (Insertar)', data: insertData.timeArray },
    { name: 'Tiempo Lista (Buscar)', data: searchData.timeList },
    { name: 'Tiempo Array (Buscar)', data: searchData.timeArray }
  ]);
  chart.updateOptions({ xaxis: { categories: searchData.timestamps } });
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