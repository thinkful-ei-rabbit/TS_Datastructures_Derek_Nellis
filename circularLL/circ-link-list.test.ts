import { CircularLL } from './circ-link-list';

const TestLL = new CircularLL<number>(20);

TestLL.insertFirst(3);
TestLL.insertFirst(2);
TestLL.insertFirst(1);

TestLL.insertAfter(5, 3);
TestLL.insertBefore(4, 5);
TestLL.insertLast(7);
TestLL.insertAt(6, 5); // by searching
TestLL.insertAt(8, 7); // idx === currSize

TestLL.remove(8);
TestLL.remove(2);
TestLL.removeFirst();
TestLL.removeLast();

console.log(TestLL.currentLength());
console.log(TestLL.currentLength());
console.log(TestLL.maxLength());
console.log(TestLL.availableSpace());
console.log(TestLL.isEmpty());
console.log(TestLL.isFull());

// console.log(TestLL.contains());
console.log(TestLL.contains(3));

console.log(TestLL.getAll());
console.log(TestLL.getAt(1));
console.log(TestLL.getAt(0));
console.log(TestLL.getAt(4));
console.log(TestLL.getAt(TestLL.currentLength() - 1));
console.log(TestLL.getFirst());
console.log(TestLL.getLast());

type ReverseList = (List: CircularLL<any>) => any[] | null;

const reverseList: ReverseList = (List) => {
  let Display = new CircularLL<number>(List.currentLength());

  let i = List.currentLength() - 1;
  while (i >= 0) {
    const value = List.getAt(i);
    value && Display.insertLast(value);
    i--;
  }

  return Display.getAll();
};

const RevList = new CircularLL<number>(5);
RevList.insertLast(1);
RevList.insertLast(2);
RevList.insertLast(3);
RevList.insertLast(4);
RevList.insertLast(5);
RevList.getAll(); //?
console.log(reverseList(RevList));

type MiddleItem = (List: CircularLL<number>) => any | [any, any];

const middleItem: MiddleItem = (List) => {
  let len = List.currentLength();

  if (len % 2) return List.getAt(Math.ceil(len / 2) - 1);
  return [List.getAt(len / 2 - 1), List.getAt(len / 2)];
};

const EvenList = new CircularLL<number>(4);
EvenList.insertLast(1);
EvenList.insertLast(2);
EvenList.insertLast(3);
EvenList.insertLast(4);
EvenList.getAll(); //?

const OddList = new CircularLL<number>(3);
OddList.insertLast(1);
OddList.insertLast(2);
OddList.insertLast(3);
OddList.getAll(); //?

console.log(middleItem(EvenList));
console.log(middleItem(OddList));
