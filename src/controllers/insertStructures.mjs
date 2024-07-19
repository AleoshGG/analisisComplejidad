import { lL, ary } from "../dependences/structures.mjs";

export const insertToList = async () => {
  try {
    const response = await fetch("./bussines.json");
    const data = await response.json();

    const startTime = performance.now();
    for (let i = 0; i < 150346; i++) {
      lL.push(data[i]);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    return executionTime; 
  } catch (err) {
    console.log(err);
  }
};


export const insertToArray = async () => {
  try {
    const response = await fetch("./bussines.json");
    const data = await response.json();

    const startTime = performance.now();
    for (let i = 0; i < 150346; i++) {
      ary.push(data[i]);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    return executionTime; 
  } catch (err) {
    console.log(err);
  }
};
