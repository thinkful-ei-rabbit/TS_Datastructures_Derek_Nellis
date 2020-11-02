export { ArrStack, NodeStack };

class ArrStack<T> {
  private height: number;
  private stack: T[];

  public constructor(private readonly maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.height = 0;
    this.stack = new Array();
  }

  public push(item: T): void {
    if (this.isFull()) {
      throw new Error('Stack already full!');
    }
    this.stack[this.height++] = item;
  }

  public pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack already empty!');
    }

    let pop = this.stack[--this.height];

    this.stack[this.height] = this.stack[this.height + 1];
    return pop;
  }

  public isEmpty(): boolean {
    return this.height === 0;
  }

  public isFull(): boolean {
    return this.height === this.maxSize;
  }

  public top(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty!');
    }
    return this.stack[this.height - 1];
  }

  public peekAt(idx: number): T {
    if (idx > this.height - 1) {
      throw new Error(`Search index too large`);
    }
    return this.stack[idx - 1];
  }

  public printS(): T[] {
    if (this.isEmpty()) {
      throw new Error('Stack is empty!');
    }
    return this.stack;
  }
}

class StkNode<T> {
  public constructor(public value: T, public next: StkNode<T> | null) {
    this.value = value;
    this.next = next;
  }
}

class NodeStack<T> {
  private height: number;
  private top: StkNode<T> | null;
  private bottom: StkNode<T> | null;

  public constructor(private readonly maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.height = 0;
    this.top = null;
    this.bottom = null;
  }

  public push(item: T | T[] | null): void {
    if (!item) {
      throw new Error('Invalid item!');
    }

    if (this.isFull()) {
      throw new Error('Stack already full!');
    }

    if (Array.isArray(item)) {
      if (item.length > this.availableSpace()) {
        throw new Error('Not enough space!');
      }

      for (let i = 0; i < item.length; i++) {
        this.push(item[i]);
      }
    } else {
      let newNode = new StkNode<T>(item, null);

      if (!this.top) {
        this.bottom = newNode;
      } else newNode.next = this.top;

      this.top = newNode;
      console.log(`Stack height: ${++this.height}`);
    }
  }

  public pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack already empty!');
    }

    if (this.bottom && this.top) {
      let pop = this.top;

      if (this.bottom === this.top) {
        this.bottom = null;
        this.top = null;
      } else this.top = this.top.next;

      console.log(`Stack height: ${--this.height}`);
      return pop.value;
    } else throw new Error('Stack corrupted!');
  }

  public isEmpty(): boolean {
    return this.height === 0;
  }

  public isFull(): boolean {
    return this.height === this.maxSize;
  }

  public availableSpace(): number {
    return this.maxSize - this.height;
  }

  public printHeight(): void {
    console.log(`Stack height: ${this.height}`);
  }

  public printTop(): void {
    if (!this.top) {
      throw new Error('Stack is empty!');
    }
    console.log(this.top.value);
  }

  public printBott(): void {
    if (!this.bottom) {
      throw new Error('Stack is empty!');
    }
    console.log(this.bottom.value);
  }

  public printStack(): void {
    if (this.isEmpty()) {
      throw new Error('Stack is empty!');
    }

    let currNode = this.top;
    while (currNode) {
      console.log(currNode.value);
      currNode = currNode.next;
    }
  }

  public returnHeight(): number {
    return this.height;
  }

  public returnTop(): T | null {
    if (!this.top) {
      return null;
    }
    return this.top.value;
  }

  public returnBott(): T | null {
    if (!this.bottom) {
      return null;
    }
    return this.bottom.value;
  }

  public returnStack(): T[] | null {
    if (this.isEmpty()) {
      return null;
    }

    let stack = new Array();
    let currNode = this.top;
    while (currNode) {
      stack.push(currNode.value);
      currNode = currNode.next;
    }

    return stack;
  }
}
