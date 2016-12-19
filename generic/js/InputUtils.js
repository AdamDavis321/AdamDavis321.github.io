/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

InputUtils = {

	/**
	 * Return the value of the radio button that is checked. Return an empty
	 * string if none are checked, or if there are no radio buttons.
	 *
	 * @param radioObj
	 * @return the value of the checked radio button
	 */
	getCheckedValue: function(radioObj) {
		if (!radioObj)
			return '';
		var radioLength = radioObj.length;
		if (radioLength == undefined)
			if (radioObj.checked)
				return radioObj.value;
			else
				return '';
		for (var i = 0; i < radioLength; i++) {
			if (radioObj[i].checked) {
				return radioObj[i].value;
			}
		}
		return '';
	},
	
	/**
	 * Get an array containing the values of the selected options in the select
	 * element.
	 *
	 * @param  select  the select element
	 * @return the array of selected values
	 */
	getSelectedValues: function(select) {
		//alert('getSelectedValues: select=' + select);
		var options= select.options;
		var result= new Array();
		for (var i= 0; i < options.length; i++) {
			if (options[i].selected) {
				if (options[i].value != '') {
					result.push(options[i].value);
				}
			}
		}
		return result;
	},
	
	/**
	 * Move all selected option from one select control to another.
	 *
	 * @param  fromSelect  the source of the options we're moving
	 * @param  toSelect  the target we're moving the options to
	 */
	moveSelectedOptions: function(fromSelect, toSelect) {
		//alert('moveSelectedOptions: fromSelect=' + fromSelect + ', toSelect=' + toSelect);
		var fromOptions= fromSelect.options;
		for (var i= fromSelect.length-1; i >= 0; i--) {
			if (fromOptions[i].selected) {
				try {
					// standards compliant; doesn't work in IE
					toSelect.add(new Option(fromOptions[i].text,
							fromOptions[i].value), null);
				}
				catch (ex) {
					// IE only
					toSelect.add(new Option(fromOptions[i].text,
							fromOptions[i].value));
				}
				fromSelect.remove(i);
			}
		}
		InputUtils.unselectAllOptions(toSelectId);
	},
	
	/**
	 * Mark all of the options (in the specified select control) as selected.
	 *
	 * @param  select  the specified select control
	 * @return  the passed-in select control
	 */
	selectAllOptions: function(select) {
		//alert('selectAllOptions: select=' + select);
		var options= select.options;
		for (var i= 0; i < select.length; i++) {
			options[i].selected= 'true';
		}
		return select;
	},
	
	/**
	 * Set the radio button with the given value as being checked. Do nothing
	 * if there are no radio buttons. If the given value does not exist, all
	 * the radio buttons are reset to unchecked.
	 *
	 * @param radioObj
	 * @param newValue
	 */
	setCheckedValue: function(radioObj, newValue) {
		if(!radioObj)
			return;
		var radioLength = radioObj.length;
		if(radioLength == undefined) {
			radioObj.checked = (radioObj.value == newValue.toString());
			return;
		}
		for(var i = 0; i < radioLength; i++) {
			radioObj[i].checked = false;
			if(radioObj[i].value == newValue.toString()) {
				radioObj[i].checked = true;
			}
		}
	},
	
	/**
	 * Set the selected option of the select element to the specified value;
	 *
	 * @param  select  the select element
	 * @param  selValue  the new selected value
	 */
	setSelectedValue: function(select, selValue) {
		select.selectedIndex= 0;
		for (var i= 0; i < select.options.length; i++) {
			if (select.options[i].value == selValue) {
				select.selectedIndex= i;
				break;
			}
		}
	},
	
	/**
	 * Mark all of the options (in the specified select control) as NOT selected.
	 *
	 * @param  select  the specified select control
	 * @return  the passed-in select control
	 */
	unselectAllOptions: function(select) {
		//alert('unselectAllOptions: select=' + select);
		var options= select.options;
		for (var i= 0; i < select.length; i++) {
			options[i].selected= '';
		}
		return select;
	}

};
