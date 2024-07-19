import { lL, ary } from "../dependences/structures.mjs";

export const searchToList = (reference) => {
  let data;

  const startTime = performance.now();
  for (let i = 0; i < lL.size(); i++) {
    if (lL.getElementAt(i).getData().review_count == reference) {
      data = lL.getElementAt(i).getData();
      i = lL.size;
    }
  }
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return { data, executionTime };
};

export const searchToArray = (reference) => {
  let data;

  const startTime = performance.now();
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].review_count == reference) {
      data = ary[i];
      i = ary.length;
    }
  }
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  
  return { data, executionTime };
};
