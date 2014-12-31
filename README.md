dlist
=====

A doubly linked list data structure written in javascript.

Dictionary([attributes])
---
Both Node and List inherit from the Dictionary object in a pseudo-classsical fashion. The `Dictionary` constructor can accept an optional object to set as its initial attributes. The Dictionary is used to manage instance `attributes` with the following API:
### get(key)
  Returns the attribute associated with `key`.
### set(obj) 
  Supply set with an object to have each `key`, `value` pair set as an attribute. Returns `this`.
### set(key, value)
  Supply set with a `key`, `value` pair for it to be set as an attribute. Returns `this`.

Node([element, backlink, forelink])
---
The inherited Dictionary methods are used to manage Node attributes: `element, backlink, forelink`. The `Node` constructor can accept these attributes as optional parameters. Node also exposes an API for quick state access and manipulation:
### nullify()
  Removes a node's forward and backward links. Returns `this`.
### whoami()
  Returns a string representation of the node's classification: head, tail, first, last, singular, and inner.
### toString()
  Returns a string representation of the node's element.
  
List([element...])
---
The inherited Dictionary methods are used to manage List attributes: `head, tail, cursor`. Head and tail are both dummy nodes that maintain references to the first and last nodes, repectively. Cursor is an object that maintans a reference to the current node and its index. The `List` constructor can accept an optional array or variable-arity of elements to build itself initially. List also exposes the following API for state access and manipulation:
### move(index)
  `Move` the cursor to the specified `index`. Returns `this`.
### move(direction)
  `Move` the cursor to either the previous or next node. Supply `direction` as `'prev'` or `'next'`. Returns `this`.
### insert(element[, left, right])
  Inserts the `element` as a new node between the `left` and `right` nodes. If left and right are not supplied: then `insert` will try to add the node at the cursor postion, but if no cursor is defined it will append the node. Returns the inserted node.
  
### remove([left, right])
  Removes the node between the `left` and `right` nodes. If left and right are not supplied: then `remove` will try to delete the node at the cursor postion, but if no cursor is defined it will delete the last node. Returns the removed node.
  
### append(element)
  Inserts the `element` as a new node as the last node in the list.
  
### prepend(element)
  Inserts the `element` as a new node as the first node in the list.
  
### each(callback[, thisArg])
  For each element in the list execute `callback` once. The callback is invoked with the arguments `element, index, node` in that order. Supply an optional `thisArg` to bind context, otherwise undefined will be used. Returns `this`.
  
### clear()
  Removes all nodes from the list and returns `this`.
  
### length()
  Returns the amount of nodes in the list.

### toArray()
  Returns an array representation of the elements in the list.

### toString()
  Returns a string representation of the elements in the list.
=======
dlist
=====

A doubly linked list data structure written in javascript.

Dictionary([attributes])
---
Both Node and List inherit from the Dictionary object in a pseudo-classsical fashion. The `Dictionary` constructor can accept an optional object to set as its initial attributes. The Dictionary is used to manage instance `attributes` with the following API:
### get(key)
  Returns the attribute associated with `key`.
### set(obj) 
  Supply set with an object to have each `key`, `value` pair set as an attribute. Returns `this`.
### set(key, value)
  Supply set with a `key`, `value` pair for it to be set as an attribute. Returns `this`.

Node([element, backlink, forelink])
---
The inherited Dictionary methods are used to manage Node attributes: `element, backlink, forelink`. The `Node` constructor can accept these attributes as optional parameters. Node also exposes an API for quick state access and manipulation:
### nullify()
  Removes a node's forward and backward links. Returns `this`.
### whoami()
  Returns a string representation of the node's classification: head, tail, first, last, singular, and inner.
### toString()
  Returns a string representation of the node's element.
  
List([element...])
---
The inherited Dictionary methods are used to manage List attributes: `head, tail, cursor`. Head and tail are both dummy nodes that maintain references to the first and last nodes, repectively. Cursor is an object that maintans a reference to the current node and its index. The `List` constructor can accept an optional array or variable-arity of elements to build itself initially. List also exposes the following API for state access and manipulation:
### move(index)
  `Move` the cursor to the specified `index`. Returns `this`.
### move(direction)
  `Move` the cursor to either the previous or next node. Supply `direction` as `'prev'` or `'next'`. Returns `this`.
### insert(element[, left, right])
  Inserts the `element` as a new node between the `left` and `right` nodes. If left and right are not supplied: then `insert` will try to add the node at the cursor postion, but if no cursor is defined it will append the node. Returns the inserted node.
  
### remove([left, right])
  Removes the node between the `left` and `right` nodes. If left and right are not supplied: then `remove` will try to delete the node at the cursor postion, but if no cursor is defined it will delete the last node. Returns the removed node.
  
### append(element)
  Inserts the `element` as a new node as the last node in the list.
  
### prepend(element)
  Inserts the `element` as a new node as the first node in the list.
  
### each(callback[, thisArg])
  For each element in the list execute `callback` once. The callback is invoked with the arguments `element, index, node` in that order. Supply an optional `thisArg` to bind context, otherwise undefined will be used. Returns `this`.
  
### clear()
  Removes all nodes from the list and returns `this`.
  
### length()
  Returns the amount of nodes in the list.

### toArray()
  Returns an array representation of the elements in the list.

### toString()
  Returns a string representation of the elements in the list.