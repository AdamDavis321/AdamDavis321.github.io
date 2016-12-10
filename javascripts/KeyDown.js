/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 *
 * Uses: functions from the MiscUtils.js file.
 */

KeyDown = {

	convertDigitFromNumericKeypad: function(key) {
		// Digits 0 - 9 (from numeric keypad)
		return (key >= 96 && key <= 105)? key - 48 : key;
	},
	
	getKeyCode: function(e) {
		var evt= MiscUtils.getEvent(e);
		var key= -1;
		if (evt.keyCode) {
			key= evt.keyCode;
		} 
		else if (evt.which) {
			key= evt.which;
		}
		return key;
	},
	
	isAlphabeticKey: function(key) {
		// Alphabetic: A - Z and a - z
		return (key >= 65 && key <= 90);
	},
	
	isComboKey: function(key) {
		// Shift, Ctrl, Alt, or Meta (left and right)
		return (key == 16 || key == 17 || key == 18 || key == 91 || key == 92);
	},
	
	isDigitKey: function(key) {
		// Digits 0 - 9
		return (key >= 48 && key <= 57);
	},
	
	isDigitKeyFromNumericKeypad: function(key) {
		// Digits 0 - 9 (from numeric keypad)
		return (key >= 96 && key <= 105);
	},
			
	isEditingKey: function(key) {
		// Editing keys: Backspace, Tab, Return, End, Home, Left arrow, 
		// Up arrow, Right arrow, Down arrow, and Delete
		return (key == 8 || key == 9 || key == 13 || key == 35 || key == 36 || key == 37 
				|| key == 38 || key == 39 || key == 40 || key == 46);
	},
	
	isFunctionKey: function(key) {
		// Function keys: F1 - F12
		return (key >= 112 && key <= 123);
	},
	
	isPeriodComma: function(key) {
		// Period (decimal point - numeric keypad/regular) or Comma (digit separator)
		return (key == 110 || key == 190 || key == 188);
	},
	
	isPlusMinus: function(key) {
		// Plus or Minus
		return (key == 107 || key == 109);
	},
	
	testKeyDown: function(e) {
		var evt= MiscUtils.getEvent(e);
		var key= KeyDown.getKeyCode(evt);
		var ch= String.fromCharCode(key);
		alert('testKeyDown: key= ' + key + ', ch= ' + ch 
				+ (evt.shiftKey? ' + SHIFT' : '') + (evt.ctrlKey? ' + CTRL' : '')
				+ (evt.altKey? ' + ALT' : '') + (evt.metaKey? ' + META' : ''));
		return false;
	},
	
	allowNumericChars: function(e) {
		var evt= MiscUtils.getEvent(e);
		var key= KeyDown.getKeyCode(evt);
		var rtn= key;
		if (KeyDown.isComboKey(key)) {
			// Do nothing
		}
		else if (KeyDown.isEditingKey(key) || evt.altKey || evt.ctrlKey || evt.metaKey 
				|| KeyDown.isFunctionKey(key)) {
			// Do nothing
		}
		else if (KeyDown.isDigitKey(key)) {
			if (evt.shiftKey) {
				rtn= false;
			}
		}
		else if (KeyDown.isDigitKeyFromNumericKeypad(key)) {
			if (evt.shiftKey) {
				rtn= false;
			}
			else {
				rtn= KeyDown.convertDigitFromNumericKeypad(key);
			}
		}
		else if (KeyDown.isPeriodComma(key)) {
			if (evt.shiftKey) {
				rtn= false;
			}
		}
		else if (KeyDown.isPlusMinus(key)) {
			// Do nothing
		}
		else {
			// All other characters
			rtn= false;
		}
		// Debugging output
		//--if (!rtn) {
		//--	var ch= String.fromCharCode(key);
		//--	alert('Character ' + ch + ' from keyCode ' + key);
		//--}
		return rtn;
	}

};
