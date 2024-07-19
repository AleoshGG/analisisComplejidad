export class Node {
  #data;
  #next;

  constructor(data) {
    this.#data = data;
    this.#next = null;
  }
  getData() {
    return this.#data;
  }

  getNext() {
    return this.#next;
  }

  setNext(next) {
    this.#next = next;
  }
}
