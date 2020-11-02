import { NodeQueue } from './queues';

let TrekQ = new NodeQueue(4);

TrekQ.enqueue('Kirk');
TrekQ.enqueue('Spock');
TrekQ.enqueue('McCoy');
TrekQ.enqueue('Scotty');
// TrekQ.dequeue();
// TrekQ.dequeue();
// TrekQ.dequeue();
// TrekQ.dequeue();

console.log(TrekQ.returnLen());
console.log(TrekQ.peekHead());
console.log(TrekQ.peekTail());
console.log(TrekQ.returnQ());

const dancers = [
  'F Jane',
  'M Frank',
  'M John',
  'M Sherlock',
  'F Madonna',
  'M David',
  'M Christopher',
  'F Beyonce'
];

const pairDancers = (guests: string[]) => {
  const QueM = new NodeQueue<string>(guests.length),
    QueF = new NodeQueue<string>(guests.length),
    Pairs = new NodeQueue<[string, string]>(~~(guests.length / 2));

  for (let i = 0; i < guests.length; i++) {
    const [gender, name] = guests[i].split(' ');

    if (gender === 'M') QueM.enqueue(name);
    else QueF.enqueue(name);

    const [M, F] = [QueM.peekHead(), QueF.peekHead()];
    if (M && F) {
      Pairs.enqueue([M, F]);
      QueM.dequeue();
      QueF.dequeue();
    }
  }

  return Pairs.returnQ();
};
console.log(pairDancers(dancers));

const lobbyists = [
  'Jane',
  'Frank',
  'John',
  'Sherlock',
  'Madonna',
  'David',
  'Christopher',
  'Beyonce'
];

const bankLobby = (line: string[]) => {
  let lobbyHist = '';

  const Lobby = new NodeQueue(line.length);

  for (let i = 0; i < line.length; i++) {
    Lobby.enqueue(line[i]);
  }

  while (!Lobby.isEmpty()) {
    const pass = Math.random();

    const person = Lobby.peekHead();

    if (pass > 0.25) {
      if (Lobby.returnLen() === 1) {
        lobbyHist += `Damnit, ${person}!\n`;
      } else {
        lobbyHist += `${person} isn't prepared, moving to the back\n`;

        Lobby.dequeue();
        Lobby.enqueue(person);
      }
    } else {
      lobbyHist += `${person} is prepared, leaving\n`;
      Lobby.dequeue();
    }
  }

  return lobbyHist;
};
console.log(bankLobby(lobbyists));
