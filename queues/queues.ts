export { ArrQueue, NodeQueue };

class ArrQueue<T> {
  private length: number;
  private queue: T[];

  public constructor(private readonly maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.length = 0;
    this.queue = new Array();
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public isFull(): boolean {
    return this.length === this.maxSize;
  }

  public enqueue(item: T): void {
    if (this.isFull()) {
      throw new Error('Queue is full!');
    }

    this.queue[this.length++] = item;
  }

  public dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty already!');
    }

    let deqItem = this.queue[0];

    for (let i = 0; i < this.length; i++) {
      this.queue[i] = this.queue[i + 1];
    }

    this.length--;
    return deqItem;
  }

  public peek(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty!');
    }

    return this.queue[0];
  }

  public printQueue(): void {
    console.log('Queue contents:');
    for (let i = 0; i < this.length; i++) {
      console.log(this.queue[i]);
    }
  }
}

class Node<T> {
  public next: Node<T> | null;

  public constructor(public value: T) {
    this.value = value;
    this.next = null;
  }
}

class NodeQueue<T> {
  private length: number;
  private head: Node<T> | null;
  private tail: Node<T> | null;

  public constructor(private maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  public enqueue(item: T): void {
    if (this.isFull()) {
      throw new Error('Queue already full!');
    }

    let newNode = new Node<T>(item);

    if (!this.tail) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    console.log(`Queue length: ${++this.length}`);
  }

  public dequeue(): T {
    if (!this.head) {
      throw new Error('Queue already empty!');
    }

    let deqNode = this.head;

    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      console.log('Queue is now empty');
    } else {
      this.head = this.head.next;
    }

    console.log(`Queue length: ${--this.length}`);
    return deqNode.value;
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public isFull(): boolean {
    return this.length === this.maxSize;
  }

  public peekHead(): T | null {
    return this.head ? this.head.value : null;
  }

  public peekTail(): T | null {
    return this.tail ? this.tail.value : null;
  }

  public printLen(): void {
    console.log(this.length);
  }

  public printAvailable(): void {
    console.log(this.maxSize - this.length);
  }

  public printQ(): void {
    if (this.isEmpty()) {
      throw new Error('Queue is empty!');
    }

    let currNode = this.head;
    while (currNode) {
      console.log(currNode.value);
      currNode = currNode.next;
    }
  }

  public returnLen(): number {
    return this.length;
  }

  public returnAvailable(): number {
    return this.maxSize - this.length;
  }

  public returnQ(): T[] | null {
    if (this.isEmpty()) {
      return null
    }

    let queue = new Array();
    let currNode = this.head;
    while (currNode) {
      queue.push(currNode.value);
      currNode = currNode.next;
    }

    return queue;
  }
}
