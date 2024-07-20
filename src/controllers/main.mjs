import { insertToArray, insertToList } from "./insertStructures.mjs";
import { searchToArray, searchToList } from "./searchIn.mjs";
import { bubbleSort, mergeSort, radixSort } from "./arrayOrderBy.mjs";
import { ary, lL, lLB, lLM, lLR } from "../dependences/structures.mjs";

// Original chart
const btnInsertar = document.getElementById("insertar");
const btnBuscar = document.getElementById("buscar");
const btnOrdenar = document.getElementById("ordenar");
const chartElement = document.getElementById("chart");

let insertData = { timeList: [], timeArray: [], timestamps: [] };
let searchData = { timeList: [], timeArray: [], timestamps: [] };

const chartOptions = {
  series: [
    { name: "Tiempo Lista (Insertar)", data: insertData.timeList },
    { name: "Tiempo Array (Insertar)", data: insertData.timeArray },
    { name: "Tiempo Lista (Buscar)", data: searchData.timeList },
    { name: "Tiempo Array (Buscar)", data: searchData.timeArray },
  ],
  chart: {
    type: "bar",
    height: 400,
  },
  xaxis: {
    categories: insertData.timestamps,
    title: { text: "Tiempo" },
  },
  yaxis: {
    title: { text: "Segundos" },
  },
  plotOptions: {
    bar: { horizontal: false },
  },
  title: {
    text: "Análisis de Tiempo",
  },
};

const chart = new ApexCharts(chartElement, chartOptions);
chart.render();

// New chart for Array sorting times
const arrayChartElement = document.getElementById("charArray");
const arrayChartOptions = {
  series: [
    { name: "Bubble Sort", data: [] },
    { name: "Merge Sort", data: [] },
    { name: "Radix Sort", data: [] },
  ],
  chart: {
    type: "bar",
    height: 400,
  },
  xaxis: {
    categories: [],
    title: { text: "Tiempo" },
  },
  yaxis: {
    title: { text: "Segundos" },
  },
  plotOptions: {
    bar: { horizontal: false },
  },
  title: {
    text: "Tiempos de Ordenación de Array",
  },
};

const arrayChart = new ApexCharts(arrayChartElement, arrayChartOptions);
arrayChart.render();

// New chart for Linked List sorting times
const listChartElement = document.getElementById("charList");
const listChartOptions = {
  series: [
    { name: "Bubble Sort", data: [] },
    { name: "Merge Sort", data: [] },
    { name: "Radix Sort", data: [] },
  ],
  chart: {
    type: "bar",
    height: 400,
  },
  xaxis: {
    categories: [],
    title: { text: "Tiempo" },
  },
  yaxis: {
    title: { text: "Segundos" },
  },
  plotOptions: {
    bar: { horizontal: false },
  },
  title: {
    text: "Tiempos de Ordenación de Lista",
  },
};

const listChart = new ApexCharts(listChartElement, listChartOptions);
listChart.render();

// Function to fill Linked List with data
const llenarListas = () => {
  lLB.length = 0;  // Clear previous data
  lLM.length = 0;
  lLR.length = 0;

  for (let i = 0; i < lL.size(); i++) {
    const data = lL.getElementAt(i).getData();
    lLB.push(data);
    lLM.push(data);
    lLR.push(data);
  }
};

// Event listeners
btnInsertar.addEventListener("click", async () => {
  btnInsertar.disabled = true;
  const timestamp = new Date().toLocaleTimeString();

  const executionTimeToList = await insertToList();
  const executionTimeToAry = await insertToArray();

  insertData.timeList.push(executionTimeToList / 1000);
  insertData.timeArray.push(executionTimeToAry / 1000);
  insertData.timestamps.push(timestamp);

  console.log(`Tiempo de inserción en lista: ${executionTimeToList / 1000} segundos`);
  console.log(`Tiempo de inserción en array: ${executionTimeToAry / 1000} segundos`);

  chart.updateSeries([
    { name: "Tiempo Lista (Insertar)", data: insertData.timeList },
    { name: "Tiempo Array (Insertar)", data: insertData.timeArray },
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

  const dataReturnList = searchToList(review_count);
  const dataReturnAry = searchToArray(review_count);

  searchData.timeList.push(dataReturnList.executionTime / 1000);
  searchData.timeArray.push(dataReturnAry.executionTime / 1000);
  searchData.timestamps.push(timestamp);

  console.log(`Tiempo de búsqueda en lista: ${dataReturnList.executionTime / 1000} segundos`);
  console.log(`Tiempo de búsqueda en array: ${dataReturnAry.executionTime / 1000} segundos`);

  chart.updateSeries([
    { name: "Tiempo Lista (Insertar)", data: insertData.timeList },
    { name: "Tiempo Array (Insertar)", data: insertData.timeArray },
    { name: "Tiempo Lista (Buscar)", data: searchData.timeList },
    { name: "Tiempo Array (Buscar)", data: searchData.timeArray },
  ]);
  chart.updateOptions({ xaxis: { categories: searchData.timestamps } });
});

btnOrdenar.addEventListener("click", async () => {
  // Array sorting
  const startTimeB = performance.now();
  bubbleSort(ary);
  const endTimeB = performance.now();
  const bubbleSortTimeAry = (endTimeB - startTimeB) / 1000;
  console.log(`Tiempo de Bubble Sort en array: ${bubbleSortTimeAry} segundos`);

  const startTimeM = performance.now();
  mergeSort(ary);
  const endTimeM = performance.now();
  const mergeSortTimeAry = (endTimeM - startTimeM) / 1000;
  console.log(`Tiempo de Merge Sort en array: ${mergeSortTimeAry} segundos`);

  const startTimeR = performance.now();
  radixSort(ary);
  const endTimeR = performance.now();
  const radixSortTimeAry = (endTimeR - startTimeR) / 1000;
  console.log(`Tiempo de Radix Sort en array: ${radixSortTimeAry} segundos`);

  arrayChart.updateSeries([
    { name: "Bubble Sort", data: [bubbleSortTimeAry] },
    { name: "Merge Sort", data: [mergeSortTimeAry] },
    { name: "Radix Sort", data: [radixSortTimeAry] },
  ]);
  arrayChart.updateOptions({ xaxis: { categories: [new Date().toLocaleTimeString()] } });

  // Linked List sorting
  llenarListas();

  const startTimeBL = performance.now();
  lLB.bubbleSort();
  const endTimeBL = performance.now();
  const bubbleSortTimeList = (endTimeBL - startTimeBL) / 1000;
  console.log(`Tiempo de Bubble Sort en lista: ${bubbleSortTimeList} segundos`);

  const startTimeML = performance.now();
  lLM.mergeSort();
  const endTimeML = performance.now();
  const mergeSortTimeList = (endTimeML - startTimeML) / 1000;
  console.log(`Tiempo de Merge Sort en lista: ${mergeSortTimeList} segundos`);

  const startTimeRL = performance.now();
  lLR.radixSort();
  const endTimeRL = performance.now();
  const radixSortTimeList = (endTimeRL - startTimeRL) / 1000;
  console.log(`Tiempo de Radix Sort en lista: ${radixSortTimeList} segundos`);

  listChart.updateSeries([
    { name: "Bubble Sort", data: [bubbleSortTimeList] },
    { name: "Merge Sort", data: [mergeSortTimeList] },
    { name: "Radix Sort", data: [radixSortTimeList] },
  ]);
  listChart.updateOptions({ xaxis: { categories: [new Date().toLocaleTimeString()] } });
});
