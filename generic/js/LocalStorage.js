/*
 * Requires functions in the MiscUtils.js file.
 */

LocalStorage = {
		
	/**
	 * Check if localStorage exists.
	 * 
	 * @returns {Boolean} true if localStorage exists, false otherwise
	 */
	exists: function() {
		"use strict";
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	
	/**
	 * Get the keys defined in localStorage as an array.
	 * 
	 * @returns {Array} the keys defined in localStorage
	 */
	getKeys: function() {
		"use strict";
		var keys = [];
		try {
			for (var i = 0; i < localStorage.length; i++) {
				keys.push(localStorage.key(i));
			}
		} catch (e) {
			if (window.console && window.console.error) {
				window.console.error('Error in LocalStorage.getKeys: ' + e);
			}
		}
		return keys;
	},
	
	/**
	 * Get an object from localStorage.
	 * 
	 * @param key the key used to retrieve the object
	 * @param ItemConstructor optional constructor function for the object
	 * @returns {Object} the object from localStorage, or null if it couldn't be found
	 */
	getObject: function(key, ItemConstructor) {
		"use strict";
		var object = null;
		try {
			var s = localStorage[key];
			if (s) {
				object = JSON.parse(s);
				if (ItemConstructor) {
					object = new ItemConstructor(object);
				}
			}
		} catch (e) {
			if (window.console && window.console.error) {
				window.console.error('Error in LocalStorage.getObject: ' + e);
			}
		}
		return object;
	},

	/**
	 * Get an array of objects from localStorage.
	 * 
	 * @param key the key used to retrieve the items
	 * @param ItemConstructor optional constructor function for each object
	 * @returns {Array} objects from localStorage
	 */
	getObjects: function(key, ItemConstructor) {
		"use strict";
		var items = [];
		try {
			var s = localStorage[key];
			if (s) {
				var obj = JSON.parse(s);
				if (MiscUtils.isArray(obj)) {
					for (var i = 0; i < obj.length; i++) {
						items.push(ItemConstructor? new ItemConstructor(obj[i]) : obj[i]);
					}
				} else {
					items.push(ItemConstructor? new ItemConstructor(obj) : obj);
				}
			}
		} catch (e) {
			if (window.console && window.console.error) {
				window.console.error('Error in LocalStorage.getObjects: ' + e);
			}
		}
		return items;
	},
	
	/**
	 * Put an object into localStorage.
	 * 
	 * @param key the key used to store the items
	 * @param object the items to store
	 */
	putObject: function(key, object) {
		"use strict";
		try {
			localStorage[key] = JSON.stringify(object);
		} catch (e) {
			if (window.console && window.console.error) {
				window.console.error('Error in LocalStorage.putObject: ' + e);
			}
		}
	},
	
	/**
	 * Put an array of items into localStorage.
	 * 
	 * @param key the key used to store the items
	 * @param items the items to store
	 */
	putObjects: function(key, items) {
		"use strict";
		try {
			localStorage[key] = JSON.stringify(MiscUtils.isArray(items)? items : [items]);
		} catch (e) {
			if (window.console && window.console.error) {
				window.console.error('Error in LocalStorage.putObjects: ' + e);
			}
		}
	}

};
