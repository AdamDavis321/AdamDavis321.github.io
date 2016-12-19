/*
 * Copyright 2013, 2014, 2015 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 *
 * Uses: functions from the MiscUtils.js file.
 */

var DateUtils = {

	/**
	 * Take a Date object and convert it to an ISO formatted string (yyyy-mm-dd).
	 * 
	 * @param  objDate  a Date object
	 * @return the UTC date string in ISO format (yyyy-mm-dd)
	 */
	formatDateISO: function(objDate) {
		var txtDate= '';
		if (objDate) {
			txtDate= objDate.getUTCFullYear() + '-' 
					+ DateUtils.padTo2Digits(objDate.getUTCMonth() + 1) + '-' 
					+ DateUtils.padTo2Digits(objDate.getUTCDate());
		}
		return txtDate;
	},
	
	/**
	 * @param  objDate  a Date object to format
	 * @return the UTC date and time in ISO-8601 format (yyyy-mm-ddThh:mm:ssZ)
	 */
	formatDateTimeISO: function(objDate) {
		var txtDate= '';
		if (objDate) {
			txtDate= objDate.getUTCFullYear() + '-' 
					+ DateUtils.padTo2Digits(objDate.getUTCMonth() + 1) + '-' 
					+ DateUtils.padTo2Digits(objDate.getUTCDate()) + 'T' 
					+ DateUtils.padTo2Digits(objDate.getUTCHours()) + ':' 
					+ DateUtils.padTo2Digits(objDate.getUTCMinutes()) + ':' 
					+ DateUtils.padTo2Digits(objDate.getUTCSeconds()) + 'Z';
		}
		return txtDate;
	},
	
	/**
	 * @param  objDate  a Date object to format
	 * @return the local date and time in USA format (mm/dd/yyyy hh:mmAP)
	 */
	formatDateTimeUSA: function(objDate) {
		var result= '';
		if (objDate) {
			var hours= objDate.getHours();
			var ampm= (hours < 12)? 'am' : 'pm';
			if (hours == 0) {
				hours= 12;
			}
			if (hours > 12) {
				hours= hours - 12;
			}
			result= (objDate.getMonth() + 1) + '/' 
					+ DateUtils.padTo2Digits(objDate.getDate()) + '/' 
					+ objDate.getFullYear() + ' ' 
					+ hours + ':' 
					+ DateUtils.padTo2Digits(objDate.getMinutes()) + ampm;
		}
		return result;
	},
	
	/**
	 * @param  objDate  a Date object to format
	 * @return the local date and time in YMD format (yyyy-mm-dd hh:mm:ss), where 
	 *         the hours are in military format (00-23)
	 */
	formatDateTimeYMD: function(objDate) {
		var result= '';
		if (objDate) {
			result= objDate.getFullYear() + '-'
					+ DateUtils.padTo2Digits(objDate.getMonth() + 1) + '-' 
					+ DateUtils.padTo2Digits(objDate.getDate()) + ' ' 
					+ DateUtils.padTo2Digits(objDate.getHours()) + ':' 
					+ DateUtils.padTo2Digits(objDate.getMinutes()) + ':'
					+ DateUtils.padTo2Digits(objDate.getSeconds());
		}
		return result;
	},
	
	/**
	 * @param  objDate  a Date object to format
	 * @return the local date in USA format (mm/dd/yyyy)
	 */
	formatDateUSA: function(objDate) {
		var txtDate= '';
		if (objDate) {
			txtDate= (objDate.getMonth() + 1) + '/' 
					+ DateUtils.padTo2Digits(objDate.getDate()) + '/' 
					+ objDate.getFullYear();
		}
		return txtDate;
	},
	
	/**
	 * @param  objDate  a Date object to format
	 * @return the local date in YMD format (yyyy-mm-dd)
	 */
	formatDateYMD: function(objDate) {
		var result= '';
		if (objDate) {
			result= objDate.getFullYear() + '-'
					+ DateUtils.padTo2Digits(objDate.getMonth() + 1) + '-' 
					+ DateUtils.padTo2Digits(objDate.getDate());
		}
		return result;
	},
	
	/** 
	 * Is the supplied text a valid date in ISO format (yyyy-mm-dd)? Please note that in the 
	 * current implementation, time and zone designator values in the input are ignored.
	 * 
	 * @param  txtDate  a date value in ISO format (yyyy-mm-dd)
	 * @return true if the date is valid, false otherwise
	 */  
	isDateISO: function(txtDate) {
		if (txtDate && txtDate.length > 10) {
			txtDate= txtDate.substring(0, 10);
		}
		var result= false;
		var dateFormat= /^(\d{4})\-(\d{2})\-(\d{2})$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length == 4) {
			var year= matches[1];
			var month= matches[2];
			var day= matches[3];
			var objDate= new Date(year, month - 1, day);
			if (objDate.getMonth() == (month - 1) 
					&& objDate.getDate() == day 
					&& objDate.getFullYear() == year) {
				result= true;
			}
		}
		return result;
	},
	
	/** 
	 * Is the supplied text a valid USA-formatted date (mm/dd/yyyy)? Please note that in the 
	 * current implementation, time values in the input are ignored.
	 * 
	 * @param  txtDate  a date value in USA format (mm/dd/yyyy)
	 * @return true if the date is valid, false otherwise
	 */  
	isDateUSA: function(txtDate) {
		if (txtDate && txtDate.length > 10) {
			txtDate= txtDate.substring(0, 10);
		}
		var result= false;
		var dateFormat= /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length == 4) {
			var month= matches[1];
			var day= matches[2];
			var year= matches[3];
			var objDate= new Date(year, month - 1, day);
			if (objDate.getMonth() == (month - 1) 
					&& objDate.getDate() == day 
					&& objDate.getFullYear() == year) {
				result= true;
			}
		}
		return result;
	},
	
	/** 
	 * Is the supplied text a valid date in YMD format (yyyy-mm-dd)? Please note that in the 
	 * current implementation, time and zone designator values in the input are ignored.
	 * 
	 * @param  txtDate  a date value in YMD format (yyyy-mm-dd)
	 * @return true if the date is valid, false otherwise
	 */  
	isDateYMD: function(txtDate) {
		return DateUtils.isDateISO(txtDate);
	},
	
	/**
	 * Pad a date/time subfield (day, month, etc) to 2 digits.
	 *
	 * @param  n  the date/time subfield (1 or 2 digits)
	 * @return the 2-digit version of the input
	 */
	padTo2Digits: function(n) {
		return (n < 10)? ('0' + n) : n;
	},
	
	/** 
	 * Parse the supplied text as a UTC date in ISO format (yyyy-mm-dd). Please note that in the 
	 * current implementation, time and zone designator values in the input are ignored.
	 * 
	 * @param  txtDate  a date value in ISO (yyyy-mm-dd) format
	 * @return a Date object if the date is valid, null otherwise
	 */  
	parseDateISO: function(txtDate) {
		if (txtDate && txtDate.length > 10) {
			txtDate= txtDate.substring(0, 10);
		}
		var result= null;
		var dateFormat= /^(\d{4})\-(\d{2})\-(\d{2})$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length == 4) {
			var year= matches[1];
			var month= matches[2];
			var day= matches[3];
			result= new Date();
			result.setUTCHours(0, 0, 0);
			result.setUTCFullYear(year, month - 1, day);
		}
		return result;
	},
	
	/**
	 * @param  txtDate  a UTC date/time string in ISO-8601 format (yyyy-mm-ddThh[:mm[:ss]]Z)
	 * @return a Date object containing the specified date/time, or null if the string could 
	 *         not be parsed
	 */
	parseDateTimeISO: function(txtDate) {
		var result= null;
		var dateFormat= 
			/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2})(?::(\d{2})(?::(\d{2}))?(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length >= 5) {
			var year= Number(matches[1]);
			var month= Number(matches[2]);
			var day= Number(matches[3]);
			var hours= Number(matches[4]);
			var minutes= (matches.length >= 6 && matches[5])? Number(matches[5]) : 0;
			var seconds= (matches.length >= 7 && matches[6])? Number(matches[6]) : 0;
			var millis= (matches.length >= 8 && matches[7])? Number(matches[7]) : 0;
			var tzZ= (matches.length >= 9 && matches[8])? matches[8] : '';
			var tzSign= (matches.length >= 10 && matches[9])? matches[9] : '';
			var tzHours= (matches.length >= 11 && matches[10])? Number(matches[10]) : 0;
			var tzMinutes= (matches.length >= 12 && matches[11])? Number(matches[11]) : 0;
			if (tzZ !== 'Z' && tzSign) {
				var tzOffset= tzHours * 60 + tzMinutes;
				if (tzSign === '+') {
					tzOffset= 0 - tzOffset;
				}
				minutes= minutes + tzOffset;
			}
			//--alert('parseDateTimeISO: ' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds); // DEBUG
			result= new Date();
			result.setUTCHours(hours, minutes, seconds, millis);
			result.setUTCFullYear(year, month - 1, day);
		}
		return result;
	},
	
	/**
	 * @param  txtDate  a local date/time string in USA format (mm/dd/yyyy hh:mm[am|pm])
	 * @return a Date object containing the specified date/time, or null if the string could 
	 *         not be parsed
	 */
	parseDateTimeUSA: function(txtDate) {
		var result= null;
		var isAM= (txtDate && MiscUtils.endsWith(txtDate.toLowerCase(), 'am'));
		var isPM= (txtDate && MiscUtils.endsWith(txtDate.toLowerCase(), 'pm'));
		var dateFormat= /^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length >= 6) {
			var month= matches[1];
			var day= matches[2];
			var year= matches[3];
			var hours= matches[4];
			var minutes= matches[5];
			var seconds= (matches.length >= 7 && matches[6])? matches[6] : 0;
			if (isAM && Number(hours) == 12) {
				hours= 0;
			}
			if (isPM && Number(hours) < 12) {
				hours= Number(hours) + 12;
			}
			//--alert('parseDateTimeUSA: ' + month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds); // DEBUG
			result= new Date();
			result.setHours(hours, minutes, seconds);
			result.setFullYear(year, month - 1, day);
		}
		return result;
	},
	
	/**
	 * @param  txtDate  a local date/time string in YMD format (yyyy-mm-dd hh:mm[:ss])
	 * @return a Date object containing the specified date/time, or null if the string could 
	 *         not be parsed
	 */
	parseDateTimeYMD: function(txtDate) {
		var result= null;
		var dateFormat= /^(\d{4})\-(\d{2})\-(\d{2}),?\s+(\d{2}):(\d{2})(?::(\d{2}))?$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length >= 5) {
			var year= matches[1];
			var month= matches[2];
			var day= matches[3];
			var hours= matches[4];
			var minutes= (matches.length >= 6 && matches[5])? matches[5] : 0;
			var seconds= (matches.length >= 7 && matches[6])? matches[6] : 0;
			//--alert('parseDateTimeYMD: ' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds); // DEBUG
			result= new Date();
			result.setHours(hours, minutes, seconds);
			result.setFullYear(year, month - 1, day);
		}
		return result;
	},
	
	/**
	 * @param  txtDate  a local date string in USA format (mm/dd/yyyy)
	 * @return a Date object containing the specified date, or null if the string could not 
	 *         be parsed
	 */
	parseDateUSA: function(txtDate) {
		if (txtDate && txtDate.length > 10) {
			txtDate= txtDate.substring(0, 10);
		}
		var result= null;
		var dateFormat= /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length == 4) {
			var month= matches[1];
			var day= matches[2];
			var year= matches[3];
			result= new Date(year, month - 1, day);
		}
		return result;
	},
	
	/**
	 * @param  txtDate  a local date string in YMD format (yyyy-mm-dd)
	 * @return a Date object containing the specified date, or null if the string could not 
	 *         be parsed
	 */
	parseDateYMD: function(txtDate) {
		if (txtDate && txtDate.length > 10) {
			txtDate= txtDate.substring(0, 10);
		}
		var result= null;
		var dateFormat= /^(\d{4})\-(\d{2})\-(\d{2})$/;
		var matches= dateFormat.exec(txtDate);
		if (matches && matches.length == 4) {
			var year= matches[1];
			var month= matches[2];
			var day= matches[3];
			result= new Date(year, month - 1, day);
		}
		return result;
	}

};
