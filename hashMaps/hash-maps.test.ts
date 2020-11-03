import { HashMap } from './hash-maps';

const HMap = new HashMap(10, 0.5, 3);

const test_1_inserts = [
  { Hobbit: 'Bilbo' },
  // { Hobbit: 'Frodo' },
  { Wizard: 'Gandalf' },
  { Human: 'Aragorn' },
  { Elf: 'Legolas' },
  // { Maiar: 'The Necromancer' },
  { Maiar: 'Sauron' },
  { RingBearer: 'Gollum' },
  { LadyOfLight: 'Galadriel' },
  { HalfElven: 'Arwen' },
  { Ent: 'Treebeard' }
];

test_1_inserts.forEach((obj) => {
  const [[key, value]] = Object.entries(obj);
  HMap.set(key, value);
});

const test_1_keys = [
  // 'Hobbit',
  'Hobbit',
  'Wizard',
  'Human',
  'Elf',
  // 'Maiar',
  'Maiar',
  'RingBearer',
  'LadyOfLight',
  'HalfElven',
  'Ent'
];

test_1_keys.map((key) => HMap.get(key));
