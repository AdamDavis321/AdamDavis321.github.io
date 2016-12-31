/*
 * Copyright 2013, 2014, 2015 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

var MiscUtils = {

	/**
	 * Compare 2 string values for sorting.
	 *
	 * @param  str1 the first string value (or null)
	 * @param  str2 the second string value (or null)
	 * @return {Number} -1 if str1 is less than str2, 0 if they're equal,
	 *         or 1 if str1 is greater than str2
	 */
	compareAlpha: function(str1, str2) {
		var s1 = str1? str1.toString() : null;
		var s2 = str2? str2.toString() : null;
		if (s1 < s2 || (!s1 && s2)) {
			return -1;
		}
		else if (s1 > s2 || (s1 && !s2)) {
			return 1;
		}
		else {
			return 0;
		}
	},
	
	/**
	 * Compare 2 string values for sorting (not case sensitive).
	 *
	 * @param  str1 the first string value (or null)
	 * @param  str2 the second string value (or null)
	 * @return {Number} -1 if str1 is less than str2, 0 if they're equal,
	 *         or 1 if str1 is greater than str2
	 */
	compareAlphaNC: function(str1, str2) {
		var s1 = str1? str1.toString().toLowerCase() : null;
		var s2 = str2? str2.toString().toLowerCase() : null;
		if (s1 < s2 || (!s1 && s2)) {
			return -1;
		}
		else if (s1 > s2 || (s1 && !s2)) {
			return 1;
		}
		else {
			return 0;
		}
	},

	/**
	 * Compare 2 numeric values for sorting.
	 *
	 * @param  num1 the first numeric value (or null)
	 * @param  num2 the second numeric value (or null)
	 * @return {Number} a negative number (< 0) if num1 is less than num2, 0 if they're
	 *         equal, or a positive number (> 0) if num1 is greater than num2
	 */
	compareNumeric: function(num1, num2) {
		var assigned1 = MiscUtils.isAssigned(num1);
		var assigned2 = MiscUtils.isAssigned(num2);
		if (!assigned1 && assigned2) {
			return -1;
		}
		else if (assigned1 && !assigned2) {
			return 1;
		}
		else if (!assigned1 && !assigned2) {
			return 0;
		}
		else {
			var n1 = Number.isNaN(num1)? Number.parseFloat(num1) : num1;
			var n2 = Number.isNaN(num2)? Number.parseFloat(num2) : num2;
			if (n1 < n2) {
				return -1;
			} 
			else if (n1 > n2) {
				return 1;
			}
			else {
				return 0;
			}
		}
	},
	
	/**
	 * Dump the name of the specified node and any contained nodes into a string.
	 * 
	 * @param  node  a DOM node, potentially containing other nodes
	 * @param  level  a number indicating the nesting level of the node
	 * @return {String} a string containing an outline of the node's structure
	 */
	dumpNodeStructure: function(node, level) {
		var result= '';
		if (node) {
			if (!level) {
				level= 0;
			}
			for (var i= 0; i < level; i++) {
				result += '  ';
			}
			result += (node.nodeName)? node.nodeName : '?';
			if (node.attributes && node.attributes.length) {
				var attrs= node.attributes;
				for (var j= 0; j < attrs.length; j++) {
					if (attrs[j] && attrs[j].nodeName) {
						result += ' ' + attrs[j].nodeName;
						if (attrs[j].nodeValue) {
							result += '=\"' + MiscUtils.escapeHTML(attrs[j].nodeValue) + '\"';
						}
					}
				}
			}
			if (node.nodeType == 3) {
				if (node.nodeValue) {
					result += ' -- ';
					result += node.nodeValue;
				}
			}
			result += '\n';
			if (node.childNodes && node.childNodes.length) {
				for (var k= 0; k < node.childNodes.length; k++) {
					result += MiscUtils.dumpNodeStructure(node.childNodes[k], (level + 1));
				}
			}
		}
		return result;
	},
	
	/**
	 * @param  s  the string to check
	 * @param  suffix  the suffix to check for
	 * @return {Boolean} true if s ends with the suffix, false otherwise
	 */
	endsWith: function(s, suffix) {
		var pos= s.indexOf(suffix);
		return (pos >= 0 && pos == (s.length - suffix.length));
	},
	
	/**
	 * Escape the following characters which are reserved in HTML: &, >, <, ",
	 * and '.
	 *
	 * @param  text  the input text
	 * @return {String} the escaped text
	 */
	escapeHTML: function(text) {
		return text? text.toString().replace(/&/g,'&amp;').replace(/>/g,'&gt;')
				.replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;') : '';
	},
	
	/**
	 * Escape the following characters which are reserved in XML: &, >, <, ",
	 * and '.
	 *
	 * @param  text  the input text
	 * @return {String} the escaped text
	 */
	escapeXML: function(text) {
		return text? text.toString().replace(/&/g,'&amp;').replace(/>/g,'&gt;')
				.replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;') : '';
	},
	
	/**
	 * Take a number and format it with a specified number of whole digits and 
	 * decimal places.
	 * 
	 * @param  number  the number to format
	 * @param  wholeDigits  the number of whole digits to display
	 * @param  decimalPlaces  the number of decimal places to display
	 * @return {String} a numeric string ('0.33' for example)
	 */
	formatNumber: function(number, wholeDigits, decimalPlaces) {
		var numStr;
		if (number == null) {
			numStr= '';
		}
		else if (isNaN(number)) {
			numStr= number;
		}
		else {
			var f= Number(number);
			if (decimalPlaces > 0) {
				f= f * Math.pow(10, decimalPlaces);
			}
			f= Math.round(f);
			if (decimalPlaces > 0) {
				f= f / Math.pow(10, decimalPlaces);
			}
			numStr= '' + f;
			var wholeDecimal= numStr.split('.');
			var whole= wholeDecimal[0];
			var decimal= (wholeDecimal.length > 1)? wholeDecimal[1] : '';
			// Temporarily remove negative sign
			var negative= false;
			if (whole.length > 0 && whole.charAt(0) == '-') {
				negative= true;
				whole= whole.substring(1, whole.length);
			}
			while (whole.length < wholeDigits) {
				whole= '0' + whole;
			}
			if (decimalPlaces > 0) {
				while (decimal.length < decimalPlaces) {
					decimal= decimal + '0';
				}
				numStr= whole + '.' + decimal;
			}
			else {
				numStr= whole;
			}
			// Restore the negative sign
			if (negative) {
				numStr= '-' + numStr;
			}
		}
		return numStr;
	},
	
	/**
	 * Get the event object for event handlers.
	 * 
	 * @param  e  potentially the event object (if using FireFox)
	 * @return {Object} the event object (for either FireFox or IE)
	 */
	getEvent: function(e) {
		if (!e) {
			var e= window.event;
		}
		return e;
	},
	
	/**
	 * Get the options text for a pop-up window. This function insures that pop-up
	 * windows will not be too large to fit on the client's screen. It hardcodes
	 * the 'scrollbars', 'resizable', and 'titlebar' options to 'yes'.
	 *
	 * @param  width  the preferred width of the window
	 * @param  height  the preferred height of the window
	 * @return {String} the options text
	 */
	getWindowOptions: function(width, height) {
		var w= (width < screen.availWidth)? width : screen.availWidth;
		var h= (height < screen.availHeight)? height : screen.availHeight;
		return 'width=' + w + ',height=' + h
				+ ',scrollbars=yes,resizable=yes,titlebar=yes';
	},
	
	/**
	 * Determine if the specified value is an array.
	 * 
	 * @param  value  the value to check
	 * @return {Boolean} true if the value is an array, false otherwise
	 */
	isArray: function(value) {
		return (Object.prototype.toString.apply(value) === '[object Array]');
	},
	
	/**
	 * Determine if the specified value has been assigned.
	 * 
	 * @param  value  the value to check
	 * @returns {Boolean} true if the value is not undefined or null, false otherwise
	 */
	isAssigned: function(value) {
		return value !== null && typeof(value) !== 'undefined';
	},
	
	/**
	 * Convert some text to its 'proper' case (first letter of every word capitalized, 
	 * other letters not).
	 * 
	 * @param  text  the text to convert
	 * @return {String} the converted text
	 */
	properCase: function(text) {
		return text.toString().toLowerCase().replace(/^(.)|\s(.)/g, 
		          function($1) { return $1.toUpperCase(); });
	},
	
	/**
	 * Search an array for an item.
	 * 
	 * @param  list  the array to search
	 * @param  item  the value to search for
	 * @param  compareFn  an optional comparison function
	 * @return {Number} the index of the item in the array, or -1 if it couldn't be found
	 */
	searchArray: function(list, item, compareFn) {
		var found= -1;
		for (var i= 0, len= list.length; i < len; i++) {
			if ((compareFn && compareFn(list[i], item) === 0)
					|| list[i] === item) {
				found= i;
				break;
			}
		}
		return found;
	},
	
	/**
	 * @param  s  the string to check
	 * @param  prefix  the prefix to check for
	 * @return {Boolean} true if s starts with the prefix, false otherwise
	 */
	startsWith: function(s, prefix) {
		return (s.indexOf(prefix) == 0);
	},
	
	/**
	 * @param  s  the string to trim
	 * @return {String} the string with leading and trailing whitespace removed
	 */
	trim: function(s) {
		return s.toString().replace(/^\s*/, '').replace(/\s*$/, '');
	},
	
	/**
	 * Unescape the following HTML entities into their corresponding characters: &amp;, &gt;, 
	 * &lt;, &quot;, and &#39;.
	 *
	 * @param  text  the input text
	 * @return {String} the unescaped text
	 */
	unescapeHTML: function(text) {
		return text? text.toString().replace(/&gt;/g,'>').replace(/&lt;/g,'<')
				.replace(/&quot;/g,'"').replace(/&#39;/g,'\'').replace(/&amp;/g,'&') : '';
	},
	
	/**
	 * Unescape the following XML entities into their corresponding characters: &amp;, &gt;, 
	 * &lt;, &quot;, and &apos;.
	 *
	 * @param  text  the input text
	 * @return {String} the unescaped text
	 */
	unescapeXML: function(text) {
		return text? text.toString().replace(/&gt;/g,'>').replace(/&lt;/g,'<')
				.replace(/&quot;/g,'"').replace(/&apos;/g,'\'').replace(/&#39;/g,'\'')
				.replace(/&amp;/g,'&') : '';
	}

};
