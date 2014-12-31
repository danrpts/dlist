dlist
=====

A doubly linked list data structure written in javascript.

Dictionary(attributes)
---
Both Node and List inherit from the Dictionary object in a pseudo-classsical fashion. The Dictionary is used to manage instance `attributes` with the following API:
### get(key) 
### set(obj) 
### set(key, value)

Node([element, backlink, forelink])
---
The inherited Dictionary methods are used to manage Node attributes: `element, backlink, forelink`. Node also exposes an API for quick state access and manipulation:
### nullify()
### whoami()
### toString()
  
List([element...])
---
The inherited Dictionary methods are used to manage List attributes: `head, tail, cursor`. Head and tail are both dummy nodes that maintain references to the first and last nodes, repectively. Cursor is an object that maintans a reference to the current node and its index. List exposes the following API for state access and manipulation:
### move(index)
### move(direction)
### insert(element[, left, right])
### remove([left, right])
### append(element)
### prepend(element)
### each(callback[, thisArg])
### clear()
### length()
### toArray()
### toString()
