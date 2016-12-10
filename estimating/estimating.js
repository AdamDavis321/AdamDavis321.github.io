/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 *
 * Uses: functions from the MiscUtils.js, DomUtils.js, and KeyDown.js files.
 */

/* ---------- Model objects ---------- */

function TaskEstimateModel(pName, pDataAccessTerm, pBusRuleTerm, pCtrlFlowTerm, 
		pViewOptTerm, pSysInterTerm) {
	this.constructor= TaskEstimateModel;
	this.name= pName? pName : '';
	this.dataAccessTerm= pDataAccessTerm? pDataAccessTerm : 0.0;
	this.busRuleTerm= pBusRuleTerm? pBusRuleTerm : 0.0;
	this.ctrlFlowTerm= pCtrlFlowTerm? pCtrlFlowTerm : 0.0;
	this.viewOptTerm= pViewOptTerm? pViewOptTerm : 0.0;
	this.sysInterTerm= pSysInterTerm? pSysInterTerm : 0.0;
}

TaskEstimateModel.prototype = {
	getComplexity: function() {
		if (isNaN(this.dataAccessTerm) || isNaN(this.busRuleTerm) 
				|| isNaN(this.ctrlFlowTerm) || isNaN(this.viewOptTerm) 
				|| isNaN(this.sysInterTerm)) {
			return 'Unknown';
		}
		return (Number(this.dataAccessTerm) + Number(this.busRuleTerm) 
				+ Number(this.ctrlFlowTerm) + Number(this.viewOptTerm) 
				+ Number(this.sysInterTerm));
	},

	getEstimate: function(personnelFactor, languageFactor) {
		var taskComplexity= this.getComplexity();
		if (isNaN(taskComplexity) || isNaN(personnelFactor) || isNaN(languageFactor)) {
			return 'Unknown';
		}
		return (Number(taskComplexity) * Number(personnelFactor) 
				* Number(languageFactor));
	},

	toString: function() {
		var result= 'TaskEstimateModel: {name= ';
		result += this.name;
		result += ', dataAccessTerm= ';
		result += this.dataAccessTerm;
		result += ', busRuleTerm= ';
		result += this.busRuleTerm;
		result += ', ctrlFlowTerm= ';
		result += this.ctrlFlowTerm;
		result += ', viewOptTerm= ';
		result += this.viewOptTerm;
		result += ', sysInterTerm= ';
		result += this.sysInterTerm;
		result += '}';
		return result;
	},
	
	toXML: function(personnelFactor, languageFactor) {
		var result= '  <taskEstimate>\n   <name>';
		result += MiscUtils.escapeXML(this.name);
		result += '</name>\n   <dataAccessTerm>';
		result += MiscUtils.escapeXML(this.dataAccessTerm);
		result += '</dataAccessTerm>\n   <busRuleTerm>';
		result += MiscUtils.escapeXML(this.busRuleTerm);
		result += '</busRuleTerm>\n   <ctrlFlowTerm>';
		result += MiscUtils.escapeXML(this.ctrlFlowTerm);
		result += '</ctrlFlowTerm>\n   <viewOptTerm>';
		result += MiscUtils.escapeXML(this.viewOptTerm);
		result += '</viewOptTerm>\n   <sysInterTerm>';
		result += MiscUtils.escapeXML(this.sysInterTerm);
		result += '</sysInterTerm>\n';
		if (personnelFactor && languageFactor) {
			result += '   <totalHours>';
			result += MiscUtils.escapeXML(this.getEstimate(personnelFactor, languageFactor));
			result += '</totalHours>';
		}
		result += '\n  </taskEstimate>\n';
		return result;
	}
};

function ProjectEstimateModel(pName, pPersonnelFactor, pLanguageFactor) {
	this.constructor= ProjectEstimateModel;
	this.name= pName? pName : '';
	this.personnelFactor= pPersonnelFactor? pPersonnelFactor : 1.5;
	this.languageFactor= pLanguageFactor? pLanguageFactor : 1.0;
	this.tasks= new Array();
	this.tasks[0]= new TaskEstimateModel();
}

ProjectEstimateModel.prototype = {
	appendTask: function(task) {
		this.tasks[this.tasks.length]= task? task : new TaskEstimateModel();
		return this.tasks[this.tasks.length - 1];
	},
	
	deleteTask: function(index) {
		var dltTask= this.tasks.splice(index, 1);
		return dltTask[0];
	},
	
	getEstimate: function() {
		var result= 0.0;
		if (isNaN(this.personnelFactor) || isNaN(this.languageFactor)) {
			return 'Unknown';
		}
		for (var i= 0; i < this.tasks.length; i++) {
			var taskComplexity= this.tasks[i].getComplexity();
			if (isNaN(taskComplexity)) {
				result= 'Unknown';
				break;
			}
			result += (Number(taskComplexity) * Number(this.personnelFactor) 
					* Number(this.languageFactor));
		}
		return result;
	},
	
	parseXML: function(txt) {
		//--alert('parseXML: txt= '+ txt); // DEBUG
		var doc= DomUtils.loadXMLString(txt);
		var nodes= doc.getElementsByTagName('projectEstimate');
		var est= (nodes.length > 0 && nodes[0])? nodes[0] : null;
		if (!est) {
			throw 'The XML input must contain a projectEstimate element!';
		}
		this.name= DomUtils.getFirstNodeValue(est, 'name') || this.name;
		this.personnelFactor= DomUtils.getFirstNodeValue(est, 'personnelFactor') 
				|| this.personnelFactor;
		this.languageFactor= DomUtils.getFirstNodeValue(est, 'languageFactor')
				|| this.languageFactor;
		nodes= est.getElementsByTagName('tasks');
		if (nodes.length > 0 && nodes[0]) {
			this.tasks.length= 0;
			var taskNodes= nodes[0].getElementsByTagName('taskEstimate');
			for (var i= 0; i < taskNodes.length; i++) {
				if (taskNodes[i]) {
					var task= new TaskEstimateModel(
							DomUtils.getFirstNodeValue(taskNodes[i], 'name'), 
							DomUtils.getFirstNodeValue(taskNodes[i], 'dataAccessTerm'), 
							DomUtils.getFirstNodeValue(taskNodes[i], 'busRuleTerm'), 
							DomUtils.getFirstNodeValue(taskNodes[i], 'ctrlFlowTerm'), 
							DomUtils.getFirstNodeValue(taskNodes[i], 'viewOptTerm'), 
							DomUtils.getFirstNodeValue(taskNodes[i], 'sysInterTerm'));
					this.appendTask(task);
				}
			}
			if (this.tasks.length == 0) {
				throw 'The tasks element must contain at least 1 taskEstimate element!';
			}
		}
		//--alert('parseXML: this= '+ this); // DEBUG
	},

	toString: function() {
		var result= 'ProjectEstimateModel: {name= ';
		result += this.name;
		result += ', personnelFactor= ';
		result += this.personnelFactor;
		result += ', languageFactor= ';
		result += this.languageFactor;
		result += ', tasks= [';
		for (var i= 0; i < this.tasks.length; i++) {
			result += this.tasks[i].toString();
		}
		result += ']}';
		return result;
	},
	
	toXML: function() {
		var result= '<projectEstimate>\n <name>';
		result += MiscUtils.escapeXML(this.name);
		result += '</name>\n <personnelFactor>';
		result += MiscUtils.escapeXML(this.personnelFactor);
		result += '</personnelFactor>\n <languageFactor>';
		result += MiscUtils.escapeXML(this.languageFactor);
		result += '</languageFactor>\n <tasks>\n';
		for (var i= 0; i < this.tasks.length; i++) {
			result += this.tasks[i].toXML(this.personnelFactor, this.languageFactor);
		}
		result += ' </tasks>\n <totalHours>';
		result += MiscUtils.escapeXML(this.getEstimate());
		result += '</totalHours>\n</projectEstimate>\n';
		return result;
	}
};

/* ---------- View object ---------- */

function EstimateEditorView() {
	this.constructor= EstimateEditorView;
}

EstimateEditorView.prototype = {
	appendTask: function() {
		var table= document.getElementById('taskInformation');
		var tbody= table.getElementsByTagName('tbody')[0];
		var rows= tbody.getElementsByTagName('tr');
		var nextIdx= rows.length;
		var row= DomUtils.createRow(null, 'row' + nextIdx);
		var cell= this.createDescriptionCell('taskName' + nextIdx);
		row.appendChild(cell);
		cell= this.createComplexityCell('dataAccessTerm' + nextIdx);
		row.appendChild(cell);
		cell= this.createComplexityCell('busRuleTerm' + nextIdx);
		row.appendChild(cell);
		cell= this.createComplexityCell('ctrlFlowTerm' + nextIdx);
		row.appendChild(cell);
		cell= this.createComplexityCell('viewOptTerm' + nextIdx);
		row.appendChild(cell);
		cell= this.createComplexityCell('sysInterTerm' + nextIdx);
		row.appendChild(cell);
		cell= this.createEstimateCell(nextIdx);
		row.appendChild(cell);
		cell= (nextIdx > 0)? this.createDeleteButtonCell(nextIdx) 
				: DomUtils.createCell('DeleteButtonCell');
		row.appendChild(cell);
		tbody.appendChild(row);
	},

	checkNumeric: function(inpId, min, max) {
		var inpCtrl= document.getElementById(inpId);
		var okay= false;
		if (!inpCtrl) {
			this.showError(inpCtrl, 'checkNumeric: The input control is not defined!');
		}
		else {
			var inpValue= Number(inpCtrl.value);
			if (isNaN(inpValue)) {
				this.showError(inpCtrl, 'This field must be numeric!');
			}
			else if (inpValue < min || inpValue > max) {
				this.showError(inpCtrl, 'This field must be between ' + min + ' and '
						+ max + '!');
			}
			else {
				this.clearError(inpCtrl);
				okay= true;
			}
		}
		return okay;
	},
	
	clearError: function(inpCtrl) {
		if (inpCtrl) {
			if (typeof(inpCtrl.title) != 'undefined') {
				inpCtrl.title= '';
			}
			if (inpCtrl.style) {
				inpCtrl.style.backgroundColor= '';
			}
		}
	},

	clearTasks: function() {
		DomUtils.removeChildren(document.getElementById('taskInformationBody'));
	},
	
	createComplexityCell: function(nameId) {
		var cell= DomUtils.createCell('ComplexityCell');
		var input= DomUtils.createInput('text', nameId, '0', nameId, null, 3, 4);
		input.onblur= leaveTaskField;
		input.onkeydown= KeyDown.allowNumericChars;
		cell.appendChild(input);
		return cell;
	},
	
	createDeleteButtonCell: function(index) {
		var cell= DomUtils.createCell('DeleteButtonCell');
		var button;
		try {
			// Create with type and name to workaround an IE 7 bug.
			button= document.createElement('<button type="button" name="dltRowBtn' 
					+ index + '" />');
		}
		catch (err) {
			// Create as normal for DOM-compliant browsers.
			button= document.createElement('button');
		}
		try {
			button.type= 'button';
			button.name= 'dltRowBtn' + index;
		}
		catch (ignore) {
		}
		button.id= 'dltRowBtn' + index;
		button.title= 'Delete Task Row';
		button.onclick= deleteTaskRow;
		var img= document.createElement('img');
		img.alt= 'Delete';
		img.src= '../generic/images/action_remove.png';
		button.appendChild(img);
		cell.appendChild(button);
		return cell;
	},

	createDescriptionCell: function(nameId) {
		var cell= DomUtils.createCell('DescriptionCell');
		var input= DomUtils.createInput('text', nameId, '', nameId, null, 15, 30);
		input.onblur= leaveTaskField;
		cell.appendChild(input);
		return cell;
	},

	createEstimateCell: function(index) {
		var cell= DomUtils.createCell('EstimateCell');
		var span= document.createElement('span');
		span.id= 'taskEstimate' + index;
		span.appendChild(document.createTextNode('0.00'));
		cell.appendChild(span);
		return cell;
	},
	
	deleteLastTask: function() {
		var table= document.getElementById('taskInformation');
		var tbody= table.getElementsByTagName('tbody')[0];
		var rows= tbody.getElementsByTagName('tr');
		var row= rows[rows.length - 1];
		DomUtils.removeChildren(row);
		tbody.removeChild(row);
	},
	
	display: function(projEstModel) {
		document.getElementById('projectName').value= projEstModel.name;
		document.getElementById('personnelFactor').value= projEstModel.personnelFactor;
		this.checkNumeric('personnelFactor', 1, 8);
		document.getElementById('languageFactor').value= projEstModel.languageFactor;
		this.checkNumeric('languageFactor', 0.5, 8);
		for (var i= 0; i < projEstModel.tasks.length; i++) {
			var task= projEstModel.tasks[i];
			var taskEst= task.getEstimate(projEstModel.personnelFactor, 
					projEstModel.languageFactor);
			if (!(document.getElementById('row' + i))) {
				this.appendTask();
			}
			document.getElementById('taskName' + i).value= task.name;
			document.getElementById('dataAccessTerm' + i).value= task.dataAccessTerm;
			this.checkNumeric('dataAccessTerm' + i, 0, 5);
			document.getElementById('busRuleTerm' + i).value= task.busRuleTerm;
			this.checkNumeric('busRuleTerm' + i, 0, 5);
			document.getElementById('ctrlFlowTerm' + i).value= task.ctrlFlowTerm;
			this.checkNumeric('ctrlFlowTerm' + i, 0, 5);
			document.getElementById('viewOptTerm' + i).value= task.viewOptTerm;
			this.checkNumeric('viewOptTerm' + i, 0, 5);
			document.getElementById('sysInterTerm' + i).value= task.sysInterTerm;
			this.checkNumeric('sysInterTerm' + i, 0, 5);
			DomUtils.setTextContent(document.getElementById('taskEstimate' + i), 
					MiscUtils.formatNumber(taskEst, 1, 2));
		}
		DomUtils.setTextContent(document.getElementById('projectEstimate'), 
				MiscUtils.formatNumber(projEstModel.getEstimate(), 1, 2));
	},
	
	displayEstimates: function(projEstModel) {
		// Only display estimates, instead of everything
		for (var i= 0; i < projEstModel.tasks.length; i++) {
			var task= projEstModel.tasks[i];
			var taskEst= task.getEstimate(projEstModel.personnelFactor, 
					projEstModel.languageFactor);
			DomUtils.setTextContent(document.getElementById('taskEstimate' + i), 
					MiscUtils.formatNumber(taskEst, 1, 2));
		}
		DomUtils.setTextContent(document.getElementById('projectEstimate'), 
				MiscUtils.formatNumber(projEstModel.getEstimate(), 1, 2));
	},
	
	displayTaskEstimates: function(projEstModel, index) {
		// Only display the estimates for the specified task and the project total
		var task= projEstModel.tasks[index];
		var taskEst= task.getEstimate(projEstModel.personnelFactor, 
				projEstModel.languageFactor);
		DomUtils.setTextContent(document.getElementById('taskEstimate' + index), 
				MiscUtils.formatNumber(taskEst, 1, 2));
		DomUtils.setTextContent(document.getElementById('projectEstimate'), 
				MiscUtils.formatNumber(projEstModel.getEstimate(), 1, 2));
	},
	
	displayTasksFrom: function(projEstModel, index) {
		// Only display tasks from the specified index to the end
		for (var i= index; i < projEstModel.tasks.length; i++) {
			var task= projEstModel.tasks[i];
			var taskEst= task.getEstimate(projEstModel.personnelFactor, 
					projEstModel.languageFactor);
			if (!(document.getElementById('row' + i))) {
				this.appendTask();
			}
			document.getElementById('taskName' + i).value= task.name;
			document.getElementById('dataAccessTerm' + i).value= task.dataAccessTerm;
			this.checkNumeric('dataAccessTerm' + i, 0, 5);
			document.getElementById('busRuleTerm' + i).value= task.busRuleTerm;
			this.checkNumeric('busRuleTerm' + i, 0, 5);
			document.getElementById('ctrlFlowTerm' + i).value= task.ctrlFlowTerm;
			this.checkNumeric('ctrlFlowTerm' + i, 0, 5);
			document.getElementById('viewOptTerm' + i).value= task.viewOptTerm;
			this.checkNumeric('viewOptTerm' + i, 0, 5);
			document.getElementById('sysInterTerm' + i).value= task.sysInterTerm;
			this.checkNumeric('sysInterTerm' + i, 0, 5);
			DomUtils.setTextContent(document.getElementById('taskEstimate' + i), 
					MiscUtils.formatNumber(taskEst, 1, 2));
		}
		DomUtils.setTextContent(document.getElementById('projectEstimate'), 
				MiscUtils.formatNumber(projEstModel.getEstimate(), 1, 2));
	},

	getImportData: function() {
		return document.getElementById('importExportData').value;
	},
	
	showError: function(inpCtrl, msg) {
		if (!inpCtrl) {
			alert(msg);
		}
		else {
			if (typeof(inpCtrl.title) != 'undefined') {
				inpCtrl.title= msg;
			}
			else {
				alert(msg);
			}
			if (inpCtrl.style) {
				inpCtrl.style.backgroundColor= '#FFFF33';
			}
		}
	},
	
	showExportData: function(data) {
		document.getElementById('importExportData').value= data;
	}
};

/* ---------- Controller object ---------- */

function EstimateController(projEstModel, estEditorView) {
	this.constructor= EstimateController;
	this.model= projEstModel? projEstModel : new ProjectEstimateModel();
	this.view= estEditorView? estEditorView : new EstimateEditorView();
}

EstimateController.prototype = {
	appendTask: function() {
		this.model.appendTask();
		this.view.appendTask();
	},

	deleteTask: function(index) {
		if (confirm('Do you want to delete row ' + (Number(index) + 1) + '?')) {
			this.model.deleteTask(index);
			this.view.deleteLastTask();
			this.view.displayTasksFrom(this.model, index);
		}
	},

	exportEstimate: function() {
		this.view.showExportData(this.model.toXML());
	},
	
	importEstimate: function() {
		var txt= this.view.getImportData();
		if (txt) {
			try {
				var est= new ProjectEstimateModel();
				est.parseXML(txt);
				this.model= est;
				this.initialize();
			}
			catch (err) {
				alert('Could not import the specified text: ' + err);
			}
		}
		else {
			alert('There is nothing to import!');
		}
	},
	
	initialize: function() {
		this.view.clearTasks();
		for (var i= 0; i < this.model.tasks.length; i++) {
			this.view.appendTask();
		}
		this.view.display(this.model);
	},
	
	setField: function(field, value) {
		if (field == 'languageFactor') {
			this.view.checkNumeric(field, 0.5, 8);
			this.model.languageFactor= value;
			this.view.displayEstimates(this.model);
		}
		else if (field == 'personnelFactor') {
			this.view.checkNumeric(field, 1, 8);
			this.model.personnelFactor= value;
			this.view.displayEstimates(this.model);
		}
		else if (field == 'projectName') {
			this.model.name= value;
		}
	},

	setTaskField: function(index, field, value) {
		if (field == 'taskName') {
			this.model.tasks[index].name= value;
		}
		else {
			this.view.checkNumeric(field + index, 0, 5);
			if (field == 'dataAccessTerm') {
				this.model.tasks[index].dataAccessTerm= value;
			}
			else if (field == 'busRuleTerm') {
				this.model.tasks[index].busRuleTerm= value;
			}
			else if (field == 'ctrlFlowTerm') {
				this.model.tasks[index].ctrlFlowTerm= value;
			}
			else if (field == 'viewOptTerm') {
				this.model.tasks[index].viewOptTerm= value;
			}
			else if (field == 'sysInterTerm') {
				this.model.tasks[index].sysInterTerm= value;
			}
			this.view.displayTaskEstimates(this.model, index);
		}
	}
};

/* ---------- Event handler functions ---------- */

var estController;

window.onload= function() {
	estController= new EstimateController();
	estController.initialize();
	document.getElementById('projectName').onblur= leaveField;
	//--document.getElementById('projectName').onkeydown= testKeyDown; // DEBUG
	document.getElementById('personnelFactor').onblur= leaveField;
	document.getElementById('languageFactor').onblur= leaveField;
	document.getElementById('personnelFactor').onkeydown= KeyDown.allowNumericChars;
	document.getElementById('languageFactor').onkeydown= KeyDown.allowNumericChars;
	document.getElementById('addRowBtn').onclick= addTaskRow;
	document.getElementById('exportBtn').onclick= exportEstimate;
	document.getElementById('importBtn').onclick= importEstimate;
	document.getElementById('estimateForm').onsubmit= function() {
		return false;
	};
	//--document.getElementById('projectName').onkeydown= testKeyDown; // DEBUG
};

function addTaskRow() {
	estController.appendTask();
}

function deleteTaskRow() {
	var btnCtrl= this;
	//--alert('deleteTaskRow: btnCtrl= ' + btnCtrl + ', btnCtrl.id= ' + btnCtrl.id); // DEBUG
	var prefixLength= 'dltRowBtn'.length;
	var btnId= btnCtrl.id.toString();
	if (btnId.length > prefixLength) {
		estController.deleteTask(btnId.substring(prefixLength));
	}
}

function exportEstimate() {
	estController.exportEstimate();
}

function importEstimate() {
	estController.importEstimate();
}

function leaveField() {
	var inpCtrl= this;
	//--alert('leaveField: inpCtrl= ' + inpCtrl + ', inpCtrl.id= ' + inpCtrl.id); // DEBUG
	var inpId= inpCtrl.id.toString();
	estController.setField(inpId, inpCtrl.value);
}

function leaveTaskField() {
	var inpCtrl= this;
	//--alert('leaveTaskField: inpCtrl= ' + inpCtrl + ', inpCtrl.id= ' + inpCtrl.id); // DEBUG
	var inpId= inpCtrl.id.toString();
	var matches= /^([A-Za-z]+)([0-9]+)|/.exec(inpId);
	if (matches) {
		estController.setTaskField(matches[2], matches[1], inpCtrl.value);
	}
}
