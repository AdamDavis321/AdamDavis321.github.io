/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

function TreeList(container, config) {
	this.container= container;
	config= config? config : {};
	this.outerClass= config.outerClass? config.outerClass : 'TreeList';
	this.closedClass= config.closedClass? config.closedClass : 'TreeList-closed';
	this.openClass= config.openClass? config.openClass : 'TreeList-open';
	this.endClass= config.endClass? config.endClass : 'TreeList-end';
	this.closeEvent= config.closeEvent? config.closeEvent : null;
	this.openEvent= config.openEvent? config.openEvent : null;
	this.root= null;
	for (var i= 0; i < this.container.childNodes.length; i++) {
		if (this.container.childNodes[i].tagName 
				&& this.container.childNodes[i].tagName.toUpperCase() == 'UL') {
			this.root= this.container.childNodes[i];
			break;
		}
	}
	if (this.root == null) {
		this.root= document.createElement('ul');
		this.container.appendChild(this.root);
	}
	this.initialize();
}

TreeList.prototype= {

	close: function(items, suppressEvents) {
		for (var i= 0; i < items.length; i++) {
			var lists= items[i].getElementsByTagName('ul');
			for (var l= 0; l < lists.length; l++) {
				lists[l].style.display= 'none';
			}
			if (items[i].className == this.openClass) {
				items[i].className= this.closedClass;
				if (!suppressEvents && this.closeEvent) {
					this.closeEvent(items[i]);
				}
			}
		}
	},
	
	closeAll: function(suppressEvents) {
		this.close(this.root.getElementsByTagName('li'), suppressEvents);
	},

	hide: function() {
		if (this.container.style.display != 'none') {
			this.container.style.display= 'none';
		}
	},

	initialize: function() {
		var me= this;
		
		// Add outerClass to the root list
		var rootClass= me.root.className;
		if (!rootClass) {
			me.root.className= me.outerClass;
		} 
		else if (rootClass.indexOf(me.outerClass) < 0) {
			me.root.className += ' ' + me.outerClass;
		}
		
		// Go through the items in the root list
		var items= me.root.getElementsByTagName('li');
		for (var j= 0; j < items.length; j++) {

			// Add an onclick handler to each list item
			items[j].onclick= function(event) {
				if (!event) event = window.event;
				var target = (event.target)? event.target : event.srcElement;
				target.className= me.endClass;
				if (target.childNodes && target.childNodes.length) {
					for (var c= 0; c < target.childNodes.length; c++) {
						if (target.childNodes[c].tagName 
								&& target.childNodes[c].tagName.toUpperCase() == 'UL') {
							
							// The list item contains an embedded list, so toggle it
							if (target.childNodes[c].style.display == 'none') {
								target.childNodes[c].style.display= 'block';
								// Mark the list item as open
								target.className= me.openClass;
								if (me.openEvent) {
									me.openEvent(target);
								}
							}
							else {
								target.childNodes[c].style.display= 'none';
								// Mark the list item as closed
								target.className= me.closedClass;
								if (me.closeEvent) {
									me.closeEvent(target);
								}
							}
						}
					}
				}

				// Don't select the text in the list item
				var selection;
				var range;
				if (window.getSelection) {
					// W3C-compatible (FireFox)
					selection= window.getSelection();
					if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
						range= selection.getRangeAt(0);
						if (range) {
							range.collapse(true);
						}
					}
				}
				else if (document.selection) {
					// Internet Explorer
					selection= document.selection;
					selection.empty();
				}

				// Don't 'bubble-up' the event
				if (event.stopPropagation) {
					event.stopPropagation();
				}
				else {
					event.cancelBubble= true;
				}
			};
			
			// Check if the list item contains another list
			var containsList= false;
			var children= items[j].childNodes;
			for (var k= 0; k < children.length; k++) {
				if (children[k].tagName 
						&& children[k].tagName.toUpperCase() == 'UL') {
					containsList= true;
					break;
				}
			}

			// Define the style for the list item
			if (containsList) {
				items[j].className= this.closedClass;
			}
			else {
				items[j].className= this.endClass;
			}
		}

		// Hide embedded lists in the tree
		var lists= this.root.getElementsByTagName('ul');
		for (var l= 0; l < lists.length; l++) {
			lists[l].style.display= 'none';
		}
	},

	open: function(items, suppressEvents) {
		for (var i= 0; i < items.length; i++) {
			var lists= items[i].getElementsByTagName('ul');
			for (var l= 0; l < lists.length; l++) {
				lists[l].style.display= 'block';
			}
			if (items[i].className == this.closedClass) {
				items[i].className= this.openClass;
				if (!suppressEvents && this.openEvent) {
					this.openEvent(items[i]);
				}
			}
		}
	},

	openAll: function(suppressEvents) {
		this.open(this.root.getElementsByTagName('li'), suppressEvents);
	},

	show: function() {
		if (this.container.style.display == 'none') {
			this.container.style.display= 'block';
		}
	},
	
	toggle: function() {
		if (this.container.style.display == 'none') {
			this.container.style.display= 'block';
		}
		else {
			this.container.style.display= 'none';
		}
	},
	
	toString: function() {
		var s= '{TreeList: outerClass= ';
		s += this.outerClass;
		s += ', closedClass= ';
		s += this.closedClass;
		s += ', openClass= ';
		s += this.openClass;
		s += ', endClass= ';
		s += this.endClass;
		s += ', closeEvent is ';
		s += (this.closeEvent? 'assigned' : 'null');
		s += ', openEvent is ';
		s += (this.openEvent? 'assigned}' : 'null}');
		return s;
	}

};
