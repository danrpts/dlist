var Dictionary = require('../ddict');

function Node (data, backlink, forelink) {

	// Node state is maintained by a dictionary object.
	Dictionary.call(this, {
		'element': data || "dummy",
		'backlink': backlink || null,
		'forelink': forelink || null
	});
	
	return (this instanceof Node) ? this : new Node(attributes);

}

Node.prototype = Object.create(Dictionary.prototype);

Node.prototype.unlink = function () {
	var attr = this.attributes;
	attr.backlink = null;
	attr.forelink = null;
	return this;
}

Node.prototype.type = function () {
	var attr = this.attributes,
		element = attr.element,
		backlink = attr.backlink,
		forelink = attr.forelink;
		
	/* Node classifications */
	// 1. The seed node is always present in a list. It maintains a backlink to the tail node and a forelink to the head node.
	// 2. A head node is the first node in a list.
	// 3. A tail node is the last element in a list.
	// 4. A germ node exists when the head and tail node are the same node; when there is exactly one node in a list.
	// 5. A body node is any node between the head and tail.

	return (!backlink && !forelink) ? (element == 'dummy') ? 'seed' :  'germ' : 
		   (backlink && !forelink) ? 'tail' : 
		   (!backlink && forelink) ? 'head' : 
		   (backlink && forelink) ? (element == 'dummy') ? 'seed' : 'body' : 'unknown';
	   
}

Node.prototype.toString = function () {
	return JSON.stringify(this.attributes.element);
}
	
function List (elements) {
	
	// List state is maintained by a dictionary object.
	Dictionary.call(this, {

		// Seed dummy node that maintains references to the head and tail nodes to aid list operations.
		'seed': new Node(),
		
		// Cursor maintains a reference to a node instance
		'cursor': null
	});
	
	// Allow construction of a List with an array or as a variable-arity function.
	if (arguments.length) {
		!(elements instanceof Array) && (elements = Array.prototype.slice.call(arguments));
		elements.forEach(function (element) {
			this.append(element);
		}, this);
	}
	
	return (this instanceof List) ? this : new List(attributes);
	
}

List.prototype = Object.create(Dictionary.prototype);

List.prototype.move = function () {
	var attr = this.attributes,
		to = arguments[0];
	
	// Note that lists are 1-indexed.
	if (typeof to == 'number') {
		
		/* TODO: Validate index. */
		
		// Start at the seed and move right `to` times.
		attr.cursor = attr.seed;
		while (to--) {
		
			// Advance the cursor: if the advance yields a node, then increment the index.
			attr.cursor = attr.cursor.get('forelink');
		}
	}
	
	// Only when cursor is defined.
	if (typeof to == 'string') {
	
		if (to == 'next') {
			
			// The cursor.node reference will turn null when it falls off the tail node.
			attr.cursor = attr.cursor.get('forelink');
		}
		
		if (to == 'prev') {
		
			// The cursor.node reference will turn null when it falls off the head node.
			attr.cursor = attr.cursor.get('backlink');
		}
	}
	
	// Chaining
	return this;
}

List.prototype.each = function (fn, context) {
	var attr = this.attributes,
		current = attr.seed,
		index = 0;
	
	// Note that an exception is also thrown from 'move' when list has 0 length.
	if (typeof fn != 'function') throw TypeError("Callback must be a function.");

	// TODO: run test to check cursor state on each call to empty list.
	while (current = current.get('forelink')) {
	
		// Moving the cursor before callback execution allows the callback function to do work on a node's links without interfering with this loop.
		fn.call(context || undefined, current.get('element'), ++index, current);
	}

	return this;
}

List.prototype.clear = function () {
	var attr = this.attributes,
		seed = attr.seed;
	
	// Reset the list state.
	this.remove(seed, seed);
	
	// Reset the cursor state.
	attr.cursor = null;
	return this;
}

List.prototype.insert = function (element, left, right) {
	var attr = this.attributes,
		middle = null,
		seedIsLeft,
		seedIsRight;

	// If left and right are undefined, we have a couple things we can try...
	if (!left && !right) {
	
		// If the cursor is defined, aim to insert data at the cursor's position and grow the list rightward.
		if (!!attr.cursor) {
			right = attr.cursor;
			left = attr.cursor.get('backlink') || attr.seed;
	
		// Otherwise append...
		} else {
			right = attr.seed;
			left = right.get('backlink') || right;
		}
	}
	
	if (!!left && !!right) {
	
		// Resolve identities of left and right.
		seedIsLeft = (left.type() == 'seed');
		seedIsRight = (right.type() == 'seed');

		// Case 1: Insert as the germ node.
		if (seedIsLeft && seedIsRight) {
			middle = new Node(element, null, null);
		}
		
		// Case 2: Insert as the head node.
		if (seedIsLeft && !!right && !seedIsRight) {
			middle = new Node(element, null, right);
		}
		
		// Case 3: Insert as the tail node.
		if (seedIsRight && !!left && !seedIsLeft) {
			middle = new Node(element, left, null);
		}
		
		// Case 4: Insert as a body node.
		if (!seedIsLeft && !seedIsRight && !!left && !!right) {
			middle = new Node(element, left, right);
		}

		// Set links to the new node.
		left.set('forelink', middle);
		right.set('backlink', middle);
	}
	return middle;
}

List.prototype.remove = function (left, right) {
	var attr = this.attributes,
		severed,
		seedIsLeft,
		seedIsRight;
	
	// If left and right are undefined, we have a couple things we can try...
	if (!left && !right) {
	
		// If the cursor is defined, aim to remove the cursor.
		if (!!attr.cursor) {
			right = attr.cursor.get('forelink') || attr.seed;
			left = attr.cursor.get('backlink') || attr.seed;
	
		// Otherwise remove the last node.
		} else {
			right = attr.seed;
			left = right.get('backlink').get('backlink') || right;
		}
	}
	
	// Try to reference the node to remove.
	if (severed = !!left ? left.get('forelink') : !!right ? right.get('backlink') : null) {
	
		// Resolve identities of left and right.
		seedIsLeft = (left.type() == 'seed');
		seedIsRight = (right.type() == 'seed');
		
		// Case 1: Remove the germ node.
		if (seedIsLeft && seedIsRight) {
			left.set('forelink', null);
			right.set('backlink', null);
		}
		
		// Case 2: Remove the head node.
		if (seedIsLeft && !!right && !seedIsRight) {
			left.set('forelink', right);
			right.set('backlink', null);
		}
		
		// Case 3: Remove the tail node.
		if (seedIsRight && !!left && !seedIsLeft) {
			left.set('forelink', null);
			right.set('backlink', left);
		}
		
		// Case 4:Remove a body node.
		if (!seedIsLeft && !seedIsRight && !!left && !!right) {
			left.set('forelink', right);
			right.set('backlink', left);
		}
		
		// Update the cursor state if applicable.
		if (attr.cursor === severed) attr.cursor = null;
		
		// Strip the node of its links.
		severed.unlink();
	}
	return severed;
}

List.prototype.append = function (element) {
	var attr = this.attributes,
		right = attr.seed,
		left = right.get('backlink') || right;
	
	// The `left` argument will either be the tail node or null, in which case the list is empty.
	return this.insert(element, left, right);
}

List.prototype.prepend = function (element) {
	var attr = this.attributes,
		left = attr.seed,
		right = left.get('forelink') || left;
	
	// The `right` argument will either be the head node or null, in which case the list is empty.
	return this.insert(element, left, right);
}

List.prototype.cursor = function () {
	return this.attributes.cursor;
}

List.prototype.length = function () {
	
	// 0 <= length < finite value.
	var count = 0;
	this.each(function () {
		count += 1;
	});
	return count;
}

List.prototype.toArray = function () {
	var arr = [];
	this.each(function (element) {
		arr.push(element);
	});
	return arr;
}

List.prototype.toString = function (delim) {
	return this.toArray().join(delim || ' ');
}

// export the List constructor
module.exports = List;