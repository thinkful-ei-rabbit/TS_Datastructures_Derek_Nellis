export { CircularLL };

class CLLNode<T> {
  public next: CLLNode<T> | null;
  public prev: CLLNode<T> | null;

  public constructor(public value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class CircularLL<T> {
  private currSize: number;
  private head: CLLNode<T> | null;
  private tail: CLLNode<T> | null;

  public constructor(private maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.currSize = 0;
    this.head = null;
    this.tail = null;
  }

  private find(item: T | null, idx?: number): CLLNode<T> | null {
    if (!this.head) {
      return null;
    }
    idx; //?
    this.currSize; //?
    idx = idx ? idx : idx === 0 ? 0 : this.currSize - 1; //?
    let i = 0;
    let currNode = this.head;
    if (item || idx + 1 <= this.currSize / 2) {
      while (i < idx && currNode.next && currNode.value !== item) {
        currNode = currNode.next;
        i++;
      }
    } else if (this.tail) {
      i = this.currSize - 1;
      currNode = this.tail;
      while (i > idx && currNode.prev) {
        currNode = currNode.prev;
        i--;
      }
    } else return null;

    if (!item) return currNode;
    return currNode.value === item ? currNode : null;
  }

  public insertFirst(item: T): void {
    if (this.isFull()) {
      throw new Error('List already full!');
    }

    let newNode = new CLLNode(item);

    if (!this.head) {
      // list size === 0
      this.head = newNode;
    } else if (!this.tail) {
      // list size === 1
      this.tail = this.head;

      newNode.next = newNode.prev = this.tail;
      this.tail.next = this.tail.prev = newNode;

      this.head = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;

      this.tail.next = this.head.prev = newNode;
      this.head = newNode;
    }

    console.log(`List size: ${++this.currSize}`);
  }

  public insertBefore(item: T, search: T): void {
    if (this.isFull()) {
      throw new Error('List already full!');
    } else if (!this.head) {
      throw new Error('List is empty!');
    }

    let tarNode = this.find(search);

    if (!tarNode) {
      throw new Error('Item not found!');
    } else if (tarNode === this.head) {
      return this.insertFirst(item);
    }

    let newNode = new CLLNode(item);

    newNode.next = tarNode;
    newNode.prev = tarNode.prev;

    if (tarNode.prev) tarNode.prev.next = newNode;
    tarNode.prev = newNode;

    console.log(`List size: ${++this.currSize}`);
  }

  public insertAfter(item: T, search: T): void {
    if (this.isFull()) {
      throw new Error('List already full!');
    } else if (this.isEmpty()) {
      throw new Error('List is empty!');
    }

    let tarNode = this.find(search);

    if (!tarNode) {
      throw new Error('Item not found!');
    } else if (!tarNode.next) {
      // list size === 1
      return this.insertLast(item);
    }

    let newNode = new CLLNode(item);

    newNode.next = tarNode.next;
    newNode.prev = tarNode;

    tarNode.next.prev = newNode;
    tarNode.next = newNode;

    if (tarNode === this.tail) {
      this.tail = newNode;
    }

    console.log(`List size: ${++this.currSize}`);
  }

  public insertLast(item: T): void {
    if (this.isFull()) {
      throw new Error('List already full!');
    }

    if (!this.head) return this.insertFirst(item);

    let newNode = new CLLNode(item);

    if (!this.tail) {
      // list size === 1
      newNode.next = newNode.prev = this.head;
      this.head.next = this.head.prev = newNode;

      this.tail = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;

      this.head.prev = newNode;
      this.tail.next = newNode;

      this.tail = newNode;
    }

    console.log(`List size: ${++this.currSize}`);
  }

  public insertAt(item: T, idx: number): void {
    if (idx > this.maxSize) {
      throw new Error('Index exceeds max length!');
    } else if (idx > this.currSize) {
      throw new Error('Index exceeds current length!');
    } else if (idx === this.currSize) {
      return this.insertLast(item);
    }

    let tarNode = this.find(null, idx);

    if (!tarNode) {
      throw new Error('List corrupted!');
    }

    return this.insertBefore(item, tarNode.value);
  }

  public removeFirst(): T {
    if (!this.head) {
      throw new Error('List already empty!');
    }

    let removed = this.head.value;

    this.head = this.head.next;
    if (this.tail) this.tail.next = this.head;

    console.log(`List size: ${--this.currSize}`);
    return removed;
  }

  public remove(item: T): T {
    if (this.isEmpty()) {
      throw new Error('List already empty!');
    } else if (!item) {
      throw new Error('Missing item!');
    }

    let tarNode = this.find(item);

    if (!tarNode) {
      throw new Error('Item not found!');
    }

    if (!tarNode.prev || !tarNode.next) {
      // list size === 1
      return this.removeFirst();
    }

    tarNode.prev.next = tarNode.next;
    tarNode.next.prev = tarNode.prev;

    console.log(`List size: ${--this.currSize}`);
    return tarNode.value;
  }

  public removeLast(): T {
    if (!this.head) {
      throw new Error('List already empty!');
    }

    if (!this.tail) return this.removeFirst();

    let removed = this.tail.value;

    if (this.tail.prev === this.head) {
      this.tail = this.head.next = this.head.prev = null;
    } else this.tail = this.head.prev = this.tail.prev;

    if (this.tail) this.tail.next = this.head;

    console.log(`List size: ${--this.currSize}`);
    return removed;
  }

  public contains(item: T): boolean {
    return item ? (this.find(item) ? true : false) : false;
  }

  public getAll(): T[] | null {
    if (!this.head) return null;

    let list = new Array();

    let i = 0;
    let currNode = this.head;

    while (i < this.currSize) {
      if (currNode && currNode.next) {
        list.push(currNode.value);
        currNode = currNode.next;
      }
      i++;
    }

    return list;
  }

  public getFirst(): T | null {
    return this.head ? this.head.value : null;
  }

  public getAt(idx: number): T | null {
    if (idx > this.maxSize) {
      throw new Error('Index exceeds max length!');
    } else if (idx >= this.currSize) {
      return null;
    } else if (idx < 0) {
      throw new Error('Index must be >= 0!');
    }

    let node = this.find(null, idx);

    if (node) return node.value;
    else throw new Error('List corrupted!');
  }

  public getLast(): T | null {
    return this.tail ? this.tail.value : this.head ? this.head.value : null;
  }

  public isEmpty(): boolean {
    return this.currSize === 0;
  }

  public isFull(): boolean {
    return this.currSize === this.maxSize;
  }

  public currentLength(): number {
    return this.currSize;
  }

  public maxLength(): number {
    return this.maxSize;
  }

  public availableSpace(): number {
    return this.maxSize - this.currSize;
  }
}
