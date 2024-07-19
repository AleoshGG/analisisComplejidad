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
      while (current.next != null) current = current.next;
      current.next = node;
    }
    this.#count++;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) node = node.next;
      return node;
    }
    return undefined;
  }

  isEmpty() {
    return this.size() === 0 ? true : false;
  }

  size() {
    return this.#count;
  }

  delete(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.getElementAt(index);
      node = null;
      node = this.getElementAt(index - 1);
      node.next = this.getElementAt(index + 1);
      this.#count--;
    }
    return "Error";
  }
}
