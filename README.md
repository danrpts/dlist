dlist
=====

A doubly linked list data structure written in Javascript, with an extendible prototype.
  
Node([element, backlink, forelink])
---
The inherited Dictionary methods are used to manage Node attributes: `element, backlink, forelink`. The `Node` constructor can accept these attributes as optional parameters. Node also exposes a small API by default:

### unlink()
  Helper for removing a node's forward and backward links. Returns `this`.

### type()
  Returns the node's classification. Types of nodes include: seed, germ, head, tail and body.

### toString()
  Returns a string representation of the node's element.
  
List([element...])
---
Both Node and List inherit from the Dictionary object in a pseudo-classsical fashion. 
The inherited Dictionary methods are used to manage List attributes: `seed, cursor`. Seed is a dummy node that maintains references to the head and tail nodes, receptively. Cursor points to the current node. The `List` constructor can accept an optional array or variable-arity of elements to build itself initially. On top of the inherited methods from Dictionary, the List also exposes the following API for state access and manipulation:

### move(index)
  `Move` the cursor to the specified `index`. Returns `this`. Note: Internally the List does not store indices for individual nodes or for the cursor, rather indices exist implicitly.
  
### move(direction)
  `Move` the cursor to either the previous or next node. Supply `direction` as `'prev'` or `'next'`. Returns `this`.
  
### insert(element[, left, right])
  Inserts the `element` as a new node between the `left` and `right` nodes. If left and right are not supplied: then `insert` will try to add the node at the cursor's position, but if no cursor is defined it will append the node. Returns the inserted node.
  
### remove([left, right])
  Removes the node between the `left` and `right` nodes. If left and right are not supplied: then `remove` will try to delete the node at the cursor postion, but if no cursor is defined it will delete the last node. Returns the removed node.
  
### append(element)
  Inserts the `element` as a new node at the head of the list by delegating to the `insert` method.
  
### prepend(element)
  Inserts the `element` as a new node at the tail of the list by delegating to the `insert` method.
  
### each(callback[, thisArg])
  For each node in the list execute `callback` once. The callback is invoked with the arguments `element, index, node` in that order. Supply an optional `thisArg` to bind context, otherwise undefined will be used. Returns `this`.
  
### clear()
  Removes all nodes from the list and returns `this`.

### cursor()
  Returns the cursor node for convenience. Otherwise this can be accomplished by calling `get('cursor')` on a List instance.
  
### length()
  Returns the amount of nodes in the list.

### toArray()
  Returns an array representation of the elements in the list.

### toString()
  Returns a string representation of the elements in the list.