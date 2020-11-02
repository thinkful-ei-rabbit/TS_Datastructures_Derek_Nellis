import { NodeStack } from './stacks';

const Trek = new NodeStack<string>(4);

Trek.push('Kirk');
Trek.push('Spock');
Trek.push('McCoy');
Trek.push('Scotty');
// Trek.pop();
// Trek.pop();
// Trek.pop();

console.log(Trek.returnHeight());
console.log(Trek.returnTop());
console.log(Trek.returnBott());
console.log(Trek.returnStack());

const is_palindrome = (str: string) => {
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  let MemStack = new NodeStack<string>(str.length);
  for (let i = 0; i < str.length; i++) {
    MemStack.push(str[i]);
  }

  let strArr = MemStack.returnStack();
  return strArr && strArr.join('') === str;
};

console.log(is_palindrome('dad'));
console.log(is_palindrome('1001'));
console.log(is_palindrome('A man, a plan, a canal: Panama'));
console.log(is_palindrome('Tauhida'));

const validBrackets = (str: string) => {
  const Opening = new NodeStack<string>(Math.ceil(str.length / 2));

  for (let i = 0; i < str.length; i++) {
    if (Opening.isFull()) return false;

    if (Opening.returnTop() === '"' || Opening.returnTop() === "'") {
      if (str[i] === Opening.returnTop()) {
        Opening.pop();
      }
    } else if (str[i] === '"' || str[i] === "'") {
      Opening.push(str[i]);
    } else if (str[i] === '{' || str[i] === '[' || str[i] === '(') {
      Opening.push(str[i]);
    } else if (str[i] === '}' || str[i] === ']' || str[i] === ')') {
      switch (Opening.returnTop()) {
        case '{':
          if (str[i] !== '}') return false;
          break;

        case '[':
          if (str[i] !== ']') return false;
          break;

        case '(':
          if (str[i] !== ')') return false;
          break;

        default:
          return false;
      }
      Opening.pop();
    }
  }
  if (Opening.returnTop()) return false;
  return true;
};

validBrackets("const \"x{[{)(\" = [dsa({d}ds'a)a')a] => '{}}'"); //?

type SortStack = (
  StackA: NodeStack<number>,
  AccStack?: NodeStack<number>
) => any;

const sortStack: SortStack = (StackA, AccStack) => {
  const StackB = new NodeStack<number>(StackA.returnHeight());

  let temp = StackA.returnTop();
  StackA.pop();

  if (StackA.isEmpty()) return temp;

  while (!StackA.isEmpty()) {
    let curr = StackA.returnTop();

    // switch operator to change sort direction
    if (temp && curr && temp >= curr) {
      StackB.push(temp);
      temp = StackA.returnTop();
    } else curr && StackB.push(curr);

    StackA.pop();
  }

  if (!AccStack) {
    AccStack = new NodeStack<number>(StackB.returnHeight() + 1);
    AccStack.push(sortStack(StackB, AccStack));
    temp && AccStack.push(temp);
    return AccStack.returnStack();
  }

  AccStack.push(sortStack(StackB, AccStack));
  return temp;
};
const Unsorted = new NodeStack<number>(7);
Unsorted.push(3);
Unsorted.push(1);
Unsorted.push(4);
Unsorted.push(1);
Unsorted.push(-4);
Unsorted.push(5);
Unsorted.push(2);
console.log(Unsorted.returnStack());
console.log(sortStack(Unsorted));
