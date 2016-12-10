/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

var DomUtils = {

	/**
	 * Create a DOM 'td' element.
	 *
	 * @param  cssClass
	 * @return the new 'td' element
	 */
	createCell: function(cssClass) {
		var cell= document.createElement('td');
		if (cssClass) {
			cell.className= cssClass;
		}
		return cell;
	},
	
	/**
	 * Create a DOM 'input' element.
	 * 
	 * @param  inputType  type of input (text, password, checkbox, radio, hidden, button, etc.)
	 * @param  name  key in submitted form
	 * @param  value  value for the input field
	 * @param  id  element ID
	 * @param  cssClass  CSS class name
	 * @param  size  suggested number of characters (for text input)
	 * @param  maxLength  maximum number of characters (for text input)
	 * @return the new input element
	 */
	createInput: function(inputType, name, value, id, cssClass, size, maxLength) {
		var field;
		try {
			// Create with type and name to workaround an IE 7 bug.
			field= document.createElement('<input type="' + inputType + '" name="' + name + '" />');
		}
		catch (err) {
			// Create as normal for DOM-compliant browsers.
			field= document.createElement('input');
		}
		try {
			field.type= inputType;
			field.name= name;
		}
		catch (ignore) {
		}
		if (value) {
			field.value= value;
		}
		if (id) {
			field.id= id;
		}
		if (cssClass) {
			field.className= cssClass;
		}
		if (size) {
			field.size= size;
		}
		if (maxLength) {
			field.maxLength= maxLength;
		}
		return field;
	},
	
	/**
	 * Create a DOM 'td' element containing a single 'input' element.
	 *
	 * @param  colClass  CSS class name for the 'td' element
	 * @param  inputType  type of input (text, password, checkbox, radio, hidden, button, etc.)
	 * @param  name  key in submitted form
	 * @param  value  value for the input field
	 * @param  id  element ID
	 * @param  inpClass  CSS class name for the 'input' element
	 * @param  size  suggested number of characters (for text input)
	 * @param  maxLength  maximum number of characters (for text input)
	 * @return the new 'td' element
	 */
	createInputCell: function(colClass, inputType, name, value, id, inpClass, size, 
			maxLength) {
		var cell= DomUtils.createCell(colClass);
		cell.appendChild(DomUtils.createInput(inputType, name, value, id, inpClass, size, 
				maxLength));
		return cell;
	},
	
	/**
	 * Create a DOM 'a' element.
	 *
	 * @param  url  the URL of the link
	 * @param  text  the text of the link
	 * @param  cssClass  CSS class name
	 * @return the new 'td' element
	 */
	createLink: function(url, text, cssClass) {
		var link= document.createElement('a');
		link.setAttribute('href', url);
		var msgNode= document.createTextNode(text);
		link.appendChild(msgNode);
		return link;
	},
	
	/**
	 * Create a DOM 'td' element containing a single 'a' element.
	 *
	 * @param  colClass  CSS class name for the 'td' element
	 * @param  url  the URL of the link
	 * @param  text  the text of the link
	 * @param  linkClass  CSS class name for the 'a' element
	 * @return the new 'td' element
	 */
	createLinkCell: function(colClass, url, text, linkClass) {
		var cell= DomUtils.createCell(colClass);
		cell.appendChild(DomUtils.createLink(url, text, linkClass));
		return cell;
	},
	
	/**
	 * Create a DOM 'tr' element.
	 *
	 * @param  cssClass  CSS class name for the 'tr' element
	 * @param  rowId  id for the 'tr' element
	 * @return the new 'tr' element
	 */
	createRow: function(cssClass, rowId) {
		var row= document.createElement('tr');
		if (cssClass) {
			row.className= cssClass;
		}
		if (rowId) {
			row.id= rowId;
		}
		return row;
	},
	
	/**
	 * Create a DOM 'td' element containing the specified text.
	 *
	 * @param  cssClass  CSS class name
	 * @param  text  the text to display
	 * @return the new 'td' element
	 */
	createTextCell: function(cssClass, text) {
		var cell= DomUtils.createCell(cssClass);
		cell.appendChild(document.createTextNode(text));
		return cell;
	},
	
	/**
	 * Create a DOM 'tr' element containing a single 'td' with the specified text.
	 *
	 * @param  rowClass  CSS class name for the 'tr' element
	 * @param  colClass  CSS class name for the 'td' element
	 * @param  text  the text to display
	 * @param  colsToSpan  the number of columns to span
	 * @return the new 'tr' element
	 */
	createTextRow: function(rowClass, colClass, text, colsToSpan) {
		var row= DomUtils.createRow(rowClass);
		var col= DomUtils.createTextCell(colClass, text);
		if (colsToSpan != null && colsToSpan > 1) {
			col.setAttribute('colSpan', colsToSpan);
		}
		row.appendChild(col);
		return row;
	},
	
	/**
	 * Get the text value of the first child node with the specified name from the specified 
	 * DOM object.
	 * 
	 * @param  dom  the DOM object
	 * @param  name  the name of the child node
	 * @return the value of the first child node with the specified name
	 */
	getFirstNodeValue: function(dom, name) {
		//--alert('getFirstNodeValue: dom= ' + MiscUtils.dumpNodeStructure(dom, 0) + ', dom.getElementsByTagName= ' + dom.getElementsByTagName + ', name= ' + name); // DEBUG
		var result= null;
		var nodes= dom.getElementsByTagName(name);
		if (nodes.length > 0 && nodes[0]) {
			//--alert('getFirstNodeValue: nodes[0]= ' + MiscUtils.dumpNodeStructure(nodes[0], 0) + ', nodes[0].nodeValue= ' + nodes[0].nodeValue + ', nodes[0].childNodes= ' + nodes[0].childNodes); // DEBUG
			if (nodes[0].childNodes[0] && nodes[0].childNodes[0].nodeValue) {
				result= nodes[0].childNodes[0].nodeValue;
			}
		}
		return result;
	},
	
	/**
	 * Get the text content of a DOM node.
	 *
	 * @param  node  the specified node
	 * @return  the text contained in the node
	 */
	getTextContent: function(node) {
		if (node && node.textContent) { // DOM level 3
			return new String(node.textContent);
		}
		else if (node && node.innerText) { // IE
			return new String(node.innerText);
		}
		else {
			return '';
		}
	},
	
	/**
	 * Load an XML string and return the document object.
	 * 
	 * @param  txt  the XML string
	 * @return the XML document object
	 */
	loadXMLString: function(txt) {
		var xmlDoc;
		if (window.DOMParser) {
			parser= new DOMParser();
			xmlDoc= parser.parseFromString(txt, "text/xml");
			var err= xmlDoc.getElementsByTagName('parsererror');
			if (err.length > 0 && err[0]) {
		    	throw 'XML input could not be parsed: ' + DomUtils.getTextContent(err[0]);
			}
			//--alert('loadXMLString: W3C, txt= ' + txt + ', parser= ' + parser + ', xmDoc= ' + MiscUtils.dumpNodeStructure(xmlDoc, 0)); // DEBUG
		}
		else { // Internet Explorer
			xmlDoc= new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async= "false";
			xmlDoc.loadXML(txt);
		    var err= xmlDoc.parseError;
		    if (err && err.errorCode != 0) {
		    	throw 'XML input could not be parsed: ' + err.reason;
		    }
			//--alert('loadXMLString: IE, txt= ' + txt + ', xmDoc= ' + MiscUtils.dumpNodeStructure(xmlDoc, 0)); // DEBUG
		}
		return xmlDoc;
	},
	
	/**
	 * Remove all of the child nodes from the specified node.
	 *
	 * @param node
	 */
	removeChildren: function(node) {
		while (node.lastChild) {
			node.removeChild(node.lastChild);
		}
	},
	
	/**
	 * Set the text content of a DOM node.
	 *
	 * @param  node  the specified node
	 * @param  text  the text to set
	 */
	setTextContent: function(node, text) {
		DomUtils.removeChildren(node);
		node.appendChild(document.createTextNode(text));
		return node;
	}

};
