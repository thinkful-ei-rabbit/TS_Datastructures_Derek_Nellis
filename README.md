# Basic Datastructures
### Refactored into Typescript!

This is just a save file of my attempts at refactoring our work from the course. I'll organize the files by datastructure, with a file containing the class, and another importing it in and testing out all the methods and any coding challenge that came with the struct.

## Using TS
If you want to use Typescript, install Node on your machine (you already did!), then install Typescript:
```
npm install -g typescript
```
After that, grab ts-node:
```
npm install -g ts-node
```
Now you're TS ready! Just as you would execute
`node someFile.js`
you can now do so with Typescript using
`ts-node someFile.ts`

The provided `tsconfig.json` will set up the rest!

## Stacks and Queues:
Oddly enough, a nice way to wrap you head around these is to create them as you would normally, but instead of using Nodes, just use a straight-up array. I did this first for each and it helped me a bit!

## Circular Linked List
Kinda like how we did them in class, just a bit beefier. Essentially, is a doubly-linked list that wraps around onto itself, ie:
```js
this.tail.next === this.head
this.head.prev === this.tail
```
This one was a challenge, but I came out the other side with a much better grasp on linked lists!