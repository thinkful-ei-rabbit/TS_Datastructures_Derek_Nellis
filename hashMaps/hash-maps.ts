export { HashMap };

const hashString = (str: string): number => {
  let hash = 9182;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash >>> 0;
};

class HashMap {
  private table: _HashList[];
  private length: number;
  private deleted: number;

  public constructor(
    private capacity: number,
    private MAX_RATIO: number,
    private SIZE_RATIO: number
  ) {
    this.capacity = capacity > 0 ? capacity : 10;
    this.MAX_RATIO = MAX_RATIO > 0 && 1 > MAX_RATIO ? MAX_RATIO : 0.5;
    this.SIZE_RATIO = SIZE_RATIO > 0 && 5 >= SIZE_RATIO ? SIZE_RATIO : 3;
    this.table = [];
    this.length = 0;
    this.deleted = 0;
  }

  get capacity_(): number {
    return this.capacity;
  }

  get length_(): number {
    return this.length + this.deleted;
  }

  get MAX_RATIO_(): number {
    return this.MAX_RATIO;
  }

  get SIZE_RATIO_(): number {
    return this.SIZE_RATIO;
  }

  public get(key: string): any {
    let idx = this.findIdx(key);
    let slot = this.table[idx];

    while (slot && !slot.contains(key)) {
      idx++;
      slot = this.table[idx];
    }

    if (!slot) {
      throw new Error('Invalid key');
    }

    return slot.getValue(key);
  }

  public set(key: string, value: any): void {
    const loadRatio = (this.length + 1) / this.capacity;
    if (loadRatio > this.MAX_RATIO) {
      this.resize(this.capacity * this.SIZE_RATIO);
    }

    const idx = this.findSlot(key);

    if (!this.table[idx]) {
      this.length++;
      this.table[idx] = new _HashList(this.SIZE_RATIO);
    }

    this.table[idx].insert(key, value);
  }

  public delete(key: string): any {
    const idx = this.findIdx(key);
    const slot = this.table[idx];

    if (!slot || !slot.contains(key)) {
      throw new Error('Invalid key!');
    }

    const remValue = slot.remove(key);

    if (!slot.currSize_) {
      slot.shrink(this.SIZE_RATIO);
    }

    return remValue;
  }

  private findIdx(key: string): number {
    const hash = hashString(key);
    let idx = hash % this.capacity;
    return idx;
  }

  private findSlot(key: string): number {
    let idx = this.findIdx(key);
    let slot = this.table[idx];

    if (!slot) return idx;

    if (slot.contains(key)) {
      throw new Error('Invalid key');
    }

    if (slot.currSize_ > this.capacity) {
      for (let i = idx + 1; i < idx + this.capacity; i++) {
        idx = i % this.capacity;
        slot = this.table[idx];

        if (slot.contains(key)) {
          throw new Error('Invalid key');
        }

        if (slot.currSize_ < this.capacity) {
          return idx;
        }
      }
      throw new Error('Hash table corrupted!');
    }

    return idx;
  }

  private resize(size: number): void {
    const oldSlots = this.table;

    this.capacity = size;
    this.table = [];
    this.length = 0;
    this.deleted = 0;

    for (const slot of oldSlots) {
      const hash = slot && slot.getHash();
      const idx = hash && hash % this.capacity;
      if (idx) {
        this.table[idx] = slot;
      }
    }
  }
}

class _HLNode {
  public next: _HLNode | null;

  public constructor(public key: string, public value: any) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class _HashList {
  private currSize: number;
  private head: _HLNode | null;
  private tail: _HLNode | null;

  public constructor(private maxSize: number) {
    this.maxSize = maxSize > 0 ? maxSize : 10;
    this.currSize = 0;
    this.head = null;
    this.tail = null;
  }

  public get currSize_(): number {
    return this.currSize;
  }

  private isFull(): boolean {
    return this.maxSize - this.currSize === 0;
  }

  private resize(size: number): void {
    const copy = this.getAll();
    if (!copy) {
      throw new Error('Internal error!');
    }

    this.maxSize = size;
    this.currSize = 0;
    this.head = null;

    for (let i = 0; i < copy.length; i++) {
      const [key, value] = copy[i];
      this.insert(key, value);
    }
  }

  private find(key: string): { prevNode: _HLNode; currNode: _HLNode } | null {
    if (!this.head) {
      return null;
    } else if (!this.head.next) {
      return null;
    }

    let i = 1;
    let prevNode = this.head;
    let currNode = this.head.next;
    while (i < this.currSize - 1 && currNode.next && currNode.key !== key) {
      prevNode = currNode;
      currNode = currNode.next;
      i++;
    }

    return { prevNode, currNode };
  }

  public insert(key: string, value: any): void {
    let newNode = new _HLNode(key, value);

    if (!this.tail) {
      if (!this.head) {
        // length === 0
        this.head = newNode;
      } else {
        // length === 1
        this.head.next = newNode;
        this.tail = newNode;
      }
    } else {
      if (this.isFull()) this.resize(this.maxSize * 2);

      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.currSize++;
  }

  public remove(key: string): any {
    if (this.head && this.head.key === key) {
      const remValue = this.head.value;
      this.head = null;
      return remValue;
    }

    const tarNodes = this.find(key);

    if (!tarNodes) {
      throw new Error('Key not found!');
    }

    const { prevNode, currNode } = tarNodes;

    this.currSize--;
    prevNode.next = currNode.next;
    return currNode.value;
  }

  public shrink(size: number): void {
    this.resize(size);
  }

  public getValue(key: string): any {
    if (this.head && this.head.key === key) {
      return this.head.value;
    }
    const tarNodes = this.find(key);

    if (!tarNodes) {
      throw new Error('Key not found!');
    }

    return tarNodes.currNode.value;
  }

  public getAll(): [string, any][] {
    let list = new Array();

    let i = 0;
    let currNode = this.head;
    while (currNode && i < this.currSize) {
      const { key, value } = currNode;

      list.push([key, value]);
      currNode = currNode.next;
      i++;
    }

    return list;
  }

  public contains(key: string): boolean {
    if (this.head && this.head.key === key) {
      return true;
    }
    return this.find(key) ? true : false;
  }

  public getHash(): number | null {
    return this.head ? hashString(this.head.key) : null;
  }
}
