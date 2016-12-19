/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 */

function ColumnDescription(columnID, columnName, isSortable) {
	this.constructor= ColumnDescription;
	this.columnID= columnID;
	this.columnName= columnName? columnName : columnID;
	this.isSortable= isSortable? true : false;
}

ColumnDescription.prototype= {
	toJSON: function() {
		var result= '{columnID: ';
		result += this.columnID;
		result += ', columnName: ';
		result += this.columnName;
		result += ', isSortable: ';
		result += this.isSortable;
		result += '}';
		return result;
	},
	
	toKeyString: function() {
		return this.columnID;
	},
	
	toString: function() {
		return this.columnName;
	}
};

function Comparison(columnID, value, operator) {
	this.constructor= Comparison;
	this.columnID= columnID;
	this.operator= operator? operator : '=';
	this.value= value;
}

Comparison.prototype= {
	toJSON: function() {
		var result= '{columnID: ';
		result += this.columnID;
		result += ', operator: ';
		result += this.operator;
		result += ', value: ';
		result += this.value;
		result += '}';
		return result;
	},

	toString: function() {
		var result= this.columnID + this.operator;
		if ((typeof this.value) == 'number') {
			result += this.value;
		}
		else {
			result += '\'';
			if (this.value) {
				var reApos= /\'/g;
				result += this.value.toString().replace(reApos, '\\\'');
			}
			result += '\'';
		}
		return result;
	}
};

function DataRow() {
	// TODO: DataRow
	this.constructor= DataRow;
	this.columns= {};
	this.width= 0;
}

DataRow.prototype= {
	get: function(columnID) {
		return this.columns[columnID]? this.columns[columnID] : null;
	},
	
	set: function(columnID, value) {
		if (!this.columns[columnID] && value) {
			this.width++;
		}
		this.columns[columnID]= value;
	},

	toString: function() {
		return 'DataRow: columns= ' + this.width;
	}
};

function DataTable() {
	// TODO: DataTable
	this.constructor= DataTable;
	this.columnHeadings= [];
	this.rows= [];
}

DataTable.prototype= {
	addColumn: function(heading) {
		this.columnHeadings.push(heading);
	},
	
	addRow: function(row) {
		this.rows.push(row);
	},

	clear: function() {
		this.columnHeadings.length= 0;
		this.rows.length= 0;
	},
	
	clearRows: function() {
		this.rows.length= 0;
	},
	
	sort: function(columnID, direction) {
		// TODO: sort rows
	},
	
	toString: function() {
		return 'DataTable: columns= ' + this.columnHeadings.length + ', rows= ' + this.rows.length;
	}
};

function DisplayTable(dataTable, htmlAnchor) {
	// TODO: DisplayTable
	this.constructor= DisplayTable;
	this.dataTable= dataTable;
	this.htmlAnchor= htmlAnchor;
	this.sortID= null;
	this.sortDirection= null;
}

DisplayTable.prototype= {
	toString: function() {
		return 'DisplayTable: ';
	}
};
