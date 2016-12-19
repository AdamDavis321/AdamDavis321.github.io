/*
 * Copyright 2015 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

var Console = {
	error : function(msg, obj) {
		if (window.console && window.console.error) {
			if (!obj) {
				window.console.error(msg);
			} else {
				window.console.error(msg, obj);
			}
		}
	},
	
	info : function(msg, obj) {
		if (window.console && window.console.info) {
			if (!obj) {
				window.console.info(msg);
			} else {
				window.console.info(msg, obj);
			}
		}
	},
	
	log : function(msg, obj) {
		if (window.console && window.console.log) {
			if (!obj) {
				window.console.log(msg);
			} else {
				window.console.log(msg, obj);
			}
		}
	},
	
	warn : function(msg, obj) {
		if (window.console && window.console.warn) {
			if (!obj) {
				window.console.warn(msg);
			} else {
				window.console.warn(msg, obj);
			}
		}
	}
};
