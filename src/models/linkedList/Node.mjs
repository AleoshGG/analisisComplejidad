export class Node {
  #data;
  #next;

  constructor(data, weight) {
    this.#data = data;
    this.#next = undefined;
  }
  getData() {
    return this.#data;
  }

  getNext() {
    return this.#next;
  }
}
