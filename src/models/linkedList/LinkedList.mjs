import { Node } from "./Node.mjs";

export default class LinkedList {
  #count;
  #head;

  constructor() {
    this.#count = 0;
    this.#head = null;
  }

  push(data) {
    const node = new Node(data);

    if (this.#head == null) {
      this.#head = node;
    } else {
      let current = this.#head;
      while (current.getNext() != null) current = current.getNext();
      current.setNext(node);
    }
    this.#count++;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) node = node.getNext();
      return node;
    }
    return undefined;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#count;
  }

  // Bubble Sort
  bubbleSort() {
    const startTime = performance.now();
    let swapped;
    do {
      swapped = false;
      let current = this.#head;
      while (current && current.getNext()) {
        if (
          current.getData().review_count >
          current.getNext().getData().review_count
        ) {
          [
            current.getData().review_count,
            current.getNext().getData().review_count,
          ] = [
            current.getNext().getData().review_count,
            current.getData().review_count,
          ];
          swapped = true;
        }
        current = current.getNext();
      }
    } while (swapped);
    const endTime = performance.now();
    const executionTime = (endTime - startTime) / 1000;
    return executionTime;
  }

  mergeSort() {
    if (!this.#head || !this.#head.getNext()) return;

    let size = 1;

    // Encuentra la longitud de la lista
    let length = 0;
    let temp = this.#head;
    while (temp) {
      length++;
      temp = temp.getNext();
    }

    while (size < length) {
      let dummyHead = new Node(null); // Nodo dummy para simplificar la fusión
      let tail = dummyHead;

      let current = this.#head;

      while (current) {
        const left = current;
        let right = this.split(left, size);

        current = this.split(right, size);

        // Fusiona las listas de tamaño size
        let merged = this.sortedMerge(left, right);
        tail.setNext(merged);

        // Mueve el tail al final de la lista fusionada
        while (tail.getNext()) {
          tail = tail.getNext();
        }
      }

      this.#head = dummyHead.getNext();
      size *= 2;
    }
  }

  // Divide la lista en dos partes, regresa la segunda mitad
  split(node, size) {
    let i = 1;
    while (node && i < size) {
      node = node.getNext();
      i++;
    }
    if (!node) return null;

    let next = node.getNext();
    node.setNext(null);
    return next;
  }

  // Método de fusión
  sortedMerge(left, right) {
    let dummyNode = new Node(null);
    let tail = dummyNode;

    while (left && right) {
      if (left.getData().review_count <= right.getData().review_count) {
        tail.setNext(left);
        left = left.getNext();
      } else {
        tail.setNext(right);
        right = right.getNext();
      }
      tail = tail.getNext();
    }

    if (left) tail.setNext(left);
    if (right) tail.setNext(right);

    return dummyNode.getNext();
  }

  // Radix Sort
  radixSort() {
    const getMaxDigits = (node) => {
      let max = 0;
      while (node) {
        const digitCount =
          Math.floor(Math.log10(Math.abs(node.getData().review_count))) + 1;
        max = Math.max(max, digitCount);
        node = node.getNext();
      }
      return max;
    };

    const getDigit = (num, place) => {
      return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    };

    const maxDigits = getMaxDigits(this.#head);

    for (let i = 0; i < maxDigits; i++) {
      const digitBuckets = Array.from({ length: 10 }, () => new LinkedList());

      let current = this.#head;
      while (current) {
        const digit = getDigit(current.getData().review_count, i);
        digitBuckets[digit].push(current.getData());
        current = current.getNext();
      }

      this.#head = null;
      this.#count = 0;

      for (let j = 0; j < digitBuckets.length; j++) {
        let bucketNode = digitBuckets[j].#head;
        while (bucketNode) {
          this.push(bucketNode.getData());
          bucketNode = bucketNode.getNext();
        }
      }
    }
  }


}
