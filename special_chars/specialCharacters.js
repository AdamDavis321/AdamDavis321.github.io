/*
 * Copyright 2013 Adam Davis <adamdavis321@gmail.com>
 * Released under the MIT license.
 *
 * Uses functions in the MiscUtils.js and DomUtils.js files.
 */

function CharInfo(pNumber, pName, pDescription, pGroup, pNotes) {
	this.number= pNumber;
	this.name= pName;
	this.description= pDescription;
	this.group= pGroup;
	if (pNotes) {
		this.notes= pNotes;
	}
	else {
		this.notes= null;
	}
}

CharInfo.prototype= { 
	toString: function() {
		return 'CharInfo: {number=' + this.number + ', name=' + this.name 
				+ ', description=' + this.description + ', group=' + this.group 
				+ ', notes=' + this.notes + '}';
	}
};

function SpecialChars() {
	this.charArray= [
	    new CharInfo(34, "&quot;", "quotation mark", "Quote Characters"),
		new CharInfo(38, "&amp;", "ampersand", "Punctuation 1"),
		new CharInfo(39, "&apos;", "apostrophe", "Quote Characters", "Entity name doesn't work in IE"),
		new CharInfo(60, "&lt;", "less-than", "Math Symbols 1"),
		new CharInfo(62, "&gt;", "greater-than", "Math Symbols 1"),
		new CharInfo(160, "&nbsp;", "non-breaking space", "Spacing Characters"),
		new CharInfo(161, "&iexcl;", "inverted exclamation mark", "Punctuation 2"),
		new CharInfo(162, "&cent;", "cent", "Currency Symbols"),
		new CharInfo(163, "&pound;", "pound", "Currency Symbols"),
		new CharInfo(164, "&curren;", "currency", "Currency Symbols"),
		new CharInfo(165, "&yen;", "yen", "Currency Symbols"),
		new CharInfo(166, "&brvbar;", "broken vertical bar", "Punctuation 2"),
		new CharInfo(167, "&sect;", "section", "Punctuation 2"),
		new CharInfo(168, "&uml;", "spacing diaeresis", "Punctuation 2"),
		new CharInfo(169, "&copy;", "copyright", "IP Symbols"),
		new CharInfo(170, "&ordf;", "feminine ordinal indicator", "Punctuation 2"),
		new CharInfo(171, "&laquo;", "angle quotation mark (left)", "Quote Characters"),
		new CharInfo(172, "&not;", "negation", "Math Symbols 1"),
		new CharInfo(173, "&shy;", "soft hyphen", "Punctuation 1"),
		new CharInfo(174, "&reg;", "registered trademark", "IP Symbols"),
		new CharInfo(175, "&macr;", "spacing macron", "Punctuation 2"),
		new CharInfo(176, "&deg;", "degree", "Punctuation 1"),
		new CharInfo(177, "&plusmn;", "plus-or-minus", "Math Symbols 1"),
		new CharInfo(178, "&sup2;", "superscript 2", "Punctuation 1"),
		new CharInfo(179, "&sup3;", "superscript 3", "Punctuation 1"),
		new CharInfo(180, "&acute;", "spacing acute", "Punctuation 2"),
		new CharInfo(181, "&micro;", "micro", "Punctuation 2"),
		new CharInfo(182, "&para;", "paragraph", "Punctuation 2"),
		new CharInfo(183, "&middot;", "middle dot", "Punctuation 2"),
		new CharInfo(184, "&cedil;", "spacing cedilla", "Punctuation 2"),
		new CharInfo(185, "&sup1;", "superscript 1", "Punctuation 1"),
		new CharInfo(186, "&ordm;", "masculine ordinal indicator", "Punctuation 2"),
		new CharInfo(187, "&raquo;", "angle quotation mark (right)", "Quote Characters"),
		new CharInfo(188, "&frac14;", "fraction 1/4", "Math Symbols 1"),
		new CharInfo(189, "&frac12;", "fraction 1/2", "Math Symbols 1"),
		new CharInfo(190, "&frac34;", "fraction 3/4", "Math Symbols 1"),
		new CharInfo(191, "&iquest;", "inverted question mark", "Punctuation 2"),
		new CharInfo(192, "&Agrave; ", "capital a, grave accent", "Accented Characters"),
		new CharInfo(193, "&Aacute;", "capital a, acute accent", "Accented Characters"),
		new CharInfo(194, "&Acirc;", "capital a, circumflex accent", "Accented Characters"),
		new CharInfo(195, "&Atilde;", "capital a, tilde", "Accented Characters"),
		new CharInfo(196, "&Auml;", "capital a, umlaut mark", "Accented Characters"),
		new CharInfo(197, "&Aring;", "capital a, ring", "Accented Characters"),
		new CharInfo(198, "&AElig;", "capital ae", "Accented Characters"),
		new CharInfo(199, "&Ccedil;", "capital c, cedilla", "Accented Characters"),
		new CharInfo(200, "&Egrave;", "capital e, grave accent", "Accented Characters"),
		new CharInfo(201, "&Eacute;", "capital e, acute accent", "Accented Characters"),
		new CharInfo(202, "&Ecirc;", "capital e, circumflex accent", "Accented Characters"),
		new CharInfo(203, "&Euml;", "capital e, umlaut mark", "Accented Characters"),
		new CharInfo(204, "&Igrave;", "capital i, grave accent", "Accented Characters"),
		new CharInfo(205, "&Iacute;", "capital i, acute accent", "Accented Characters"),
		new CharInfo(206, "&Icirc;", "capital i, circumflex accent", "Accented Characters"),
		new CharInfo(207, "&Iuml;", "capital i, umlaut mark", "Accented Characters"),
		new CharInfo(208, "&ETH;", "capital eth, Icelandic", "Accented Characters"),
		new CharInfo(209, "&Ntilde;", "capital n, tilde", "Accented Characters"),
		new CharInfo(210, "&Ograve;", "capital o, grave accent", "Accented Characters"),
		new CharInfo(211, "&Oacute;", "capital o, acute accent", "Accented Characters"),
		new CharInfo(212, "&Ocirc;", "capital o, circumflex accent", "Accented Characters"),
		new CharInfo(213, "&Otilde;", "capital o, tilde", "Accented Characters"),
		new CharInfo(214, "&Ouml;", "capital o, umlaut mark", "Accented Characters"),
		new CharInfo(215, "&times;", "multiplication", "Math Symbols 1"),
		new CharInfo(216, "&Oslash;", "capital o, slash", "Accented Characters"),
		new CharInfo(217, "&Ugrave;", "capital u, grave accent", "Accented Characters"),
		new CharInfo(218, "&Uacute;", "capital u, acute accent", "Accented Characters"),
		new CharInfo(219, "&Ucirc;", "capital u, circumflex accent", "Accented Characters"),
		new CharInfo(220, "&Uuml;", "capital u, umlaut mark", "Accented Characters"),
		new CharInfo(221, "&Yacute;", "capital y, acute accent", "Accented Characters"),
		new CharInfo(222, "&THORN;", "capital THORN, Icelandic", "Accented Characters"),
		new CharInfo(223, "&szlig;", "small sharp s, German", "Accented Characters"),
		new CharInfo(224, "&agrave;", "small a, grave accent", "Accented Characters"),
		new CharInfo(225, "&aacute;", "small a, acute accent", "Accented Characters"),
		new CharInfo(226, "&acirc;", "small a, circumflex accent", "Accented Characters"),
		new CharInfo(227, "&atilde;", "small a, tilde", "Accented Characters"),
		new CharInfo(228, "&auml;", "small a, umlaut mark", "Accented Characters"),
		new CharInfo(229, "&aring;", "small a, ring", "Accented Characters"),
		new CharInfo(230, "&aelig;", "small ae", "Accented Characters"),
		new CharInfo(231, "&ccedil;", "small c, cedilla", "Accented Characters"),
		new CharInfo(232, "&egrave;", "small e, grave accent", "Accented Characters"),
		new CharInfo(233, "&eacute;", "small e, acute accent", "Accented Characters"),
		new CharInfo(234, "&ecirc;", "small e, circumflex accent", "Accented Characters"),
		new CharInfo(235, "&euml;", "small e, umlaut mark", "Accented Characters"),
		new CharInfo(236, "&igrave;", "small i, grave accent", "Accented Characters"),
		new CharInfo(237, "&iacute;", "small i, acute accent", "Accented Characters"),
		new CharInfo(238, "&icirc;", "small i, circumflex accent", "Accented Characters"),
		new CharInfo(239, "&iuml;", "small i, umlaut mark", "Accented Characters"),
		new CharInfo(240, "&eth;", "small eth, Icelandic", "Accented Characters"),
		new CharInfo(241, "&ntilde;", "small n, tilde", "Accented Characters"),
		new CharInfo(242, "&ograve;", "small o, grave accent", "Accented Characters"),
		new CharInfo(243, "&oacute;", "small o, acute accent", "Accented Characters"),
		new CharInfo(244, "&ocirc;", "small o, circumflex accent", "Accented Characters"),
		new CharInfo(245, "&otilde;", "small o, tilde", "Accented Characters"),
		new CharInfo(246, "&ouml;", "small o, umlaut mark", "Accented Characters"),
		new CharInfo(247, "&divide;", "division", "Math Symbols 1"),
		new CharInfo(248, "&oslash;", "small o, slash", "Accented Characters"),
		new CharInfo(249, "&ugrave;", "small u, grave accent", "Accented Characters"),
		new CharInfo(250, "&uacute;", "small u, acute accent", "Accented Characters"),
		new CharInfo(251, "&ucirc;", "small u, circumflex accent", "Accented Characters"),
		new CharInfo(252, "&uuml;", "small u, umlaut mark", "Accented Characters"),
		new CharInfo(253, "&yacute;", "small y, acute accent", "Accented Characters"),
		new CharInfo(254, "&thorn;", "small thorn, Icelandic", "Accented Characters"),
		new CharInfo(255, "&yuml;", "small y, umlaut mark", "Accented Characters"),
		new CharInfo(338, "&OElig; ", "capital ligature OE", "Accented Characters"),
		new CharInfo(339, "&oelig;", "small ligature oe", "Accented Characters"),
		new CharInfo(352, "&Scaron;", "capital S with caron", "Accented Characters"),
		new CharInfo(353, "&scaron;", "small S with caron", "Accented Characters"),
		new CharInfo(376, "&Yuml;", "capital Y with diaeres", "Accented Characters"),
		new CharInfo(402, "&fnof;", "f with hook", "Math Symbols 2"),
		new CharInfo(710, "&circ;", "modifier letter circumflex accent", "Punctuation 2"),
		new CharInfo(732, "&tilde;", "small tilde", "Punctuation 2"),
		new CharInfo(913, "&Alpha; ", "Alpha", "Greek Letters"),
		new CharInfo(914, "&Beta;", "Beta", "Greek Letters"),
		new CharInfo(915, "&Gamma;", "Gamma", "Greek Letters"),
		new CharInfo(916, "&Delta;", "Delta", "Greek Letters"),
		new CharInfo(917, "&Epsilon;", "Epsilon", "Greek Letters"),
		new CharInfo(918, "&Zeta;", "Zeta", "Greek Letters"),
		new CharInfo(919, "&Eta;", "Eta", "Greek Letters"),
		new CharInfo(920, "&Theta;", "Theta", "Greek Letters"),
		new CharInfo(921, "&Iota;", "Iota", "Greek Letters"),
		new CharInfo(922, "&Kappa;", "Kappa", "Greek Letters"),
		new CharInfo(923, "&Lambda;", "Lambda", "Greek Letters"),
		new CharInfo(924, "&Mu;", "Mu", "Greek Letters"),
		new CharInfo(925, "&Nu;", "Nu", "Greek Letters"),
		new CharInfo(926, "&Xi;", "Xi", "Greek Letters"),
		new CharInfo(927, "&Omicron;", "Omicron", "Greek Letters"),
		new CharInfo(928, "&Pi;", "Pi", "Greek Letters"),
		new CharInfo(929, "&Rho;", "Rho", "Greek Letters"),
		new CharInfo(931, "&Sigma;", "Sigma", "Greek Letters"),
		new CharInfo(932, "&Tau;", "Tau", "Greek Letters"),
		new CharInfo(933, "&Upsilon;", "Upsilon", "Greek Letters"),
		new CharInfo(934, "&Phi;", "Phi", "Greek Letters"),
		new CharInfo(935, "&Chi;", "Chi", "Greek Letters"),
		new CharInfo(936, "&Psi;", "Psi", "Greek Letters"),
		new CharInfo(937, "&Omega;", "Omega", "Greek Letters"),
		new CharInfo(945, "&alpha;", "alpha", "Greek Letters"),
		new CharInfo(946, "&beta;", "beta", "Greek Letters"),
		new CharInfo(947, "&gamma;", "gamma", "Greek Letters"),
		new CharInfo(948, "&delta;", "delta", "Greek Letters"),
		new CharInfo(949, "&epsilon;", "epsilon", "Greek Letters"),
		new CharInfo(950, "&zeta;", "zeta", "Greek Letters"),
		new CharInfo(951, "&eta;", "eta", "Greek Letters"),
		new CharInfo(952, "&theta;", "theta", "Greek Letters"),
		new CharInfo(953, "&iota;", "iota", "Greek Letters"),
		new CharInfo(954, "&kappa;", "kappa", "Greek Letters"),
		new CharInfo(955, "&lambda;", "lambda", "Greek Letters"),
		new CharInfo(956, "&mu;", "mu", "Greek Letters"),
		new CharInfo(957, "&nu;", "nu", "Greek Letters"),
		new CharInfo(958, "&xi;", "xi", "Greek Letters"),
		new CharInfo(959, "&omicron;", "omicron", "Greek Letters"),
		new CharInfo(960, "&pi;", "pi", "Greek Letters"),
		new CharInfo(961, "&rho;", "rho", "Greek Letters"),
		new CharInfo(962, "&sigmaf;", "sigmaf", "Greek Letters"),
		new CharInfo(963, "&sigma;", "sigma", "Greek Letters"),
		new CharInfo(964, "&tau;", "tau", "Greek Letters"),
		new CharInfo(965, "&upsilon;", "upsilon", "Greek Letters"),
		new CharInfo(966, "&phi;", "phi", "Greek Letters"),
		new CharInfo(967, "&chi;", "chi", "Greek Letters"),
		new CharInfo(968, "&psi;", "psi", "Greek Letters"),
		new CharInfo(969, "&omega;", "omega", "Greek Letters"),
		new CharInfo(977, "&thetasym;", "theta symbol", "Greek Letters"),
		new CharInfo(978, "&upsih;", "upsilon symbol", "Greek Letters"),
		new CharInfo(982, "&piv;", "pi symbol", "Greek Letters"),
		new CharInfo(8194, "&ensp;", "en space", "Spacing Characters"),
		new CharInfo(8195, "&emsp;", "em space", "Spacing Characters"),
		new CharInfo(8201, "&thinsp;", "thin space", "Spacing Characters"),
		new CharInfo(8204, "&zwnj;", "zero width non-joiner", "Spacing Characters", "Doesn't show up in Firefox 3"),
		new CharInfo(8205, "&zwj;", "zero width joiner", "Spacing Characters", "Doesn't show up in Firefox 3"),
		new CharInfo(8206, "&lrm;", "left-to-right mark", "Spacing Characters"),
		new CharInfo(8207, "&rlm;", "right-to-left mark", "Spacing Characters"),
		new CharInfo(8211, "&ndash;", "en dash", "Punctuation 1"),
		new CharInfo(8212, "&mdash;", "em dash", "Punctuation 1"),
		new CharInfo(8216, "&lsquo;", "left single quotation mark", "Quote Characters"),
		new CharInfo(8217, "&rsquo;", "right single quotation mark", "Quote Characters"),
		new CharInfo(8218, "&sbquo;", "single low-9 quotation mark", "Quote Characters"),
		new CharInfo(8220, "&ldquo;", "left double quotation mark", "Quote Characters"),
		new CharInfo(8221, "&rdquo;", "right double quotation mark", "Quote Characters"),
		new CharInfo(8222, "&bdquo;", "double low-9 quotation mark", "Quote Characters"),
		new CharInfo(8224, "&dagger;", "dagger", "Punctuation 1"),
		new CharInfo(8225, "&Dagger;", "double dagger", "Punctuation 1"),
		new CharInfo(8226, "&bull;", "bullet", "Punctuation 2"),
		new CharInfo(8230, "&hellip;", "horizontal ellipsis", "Punctuation 1"),
		new CharInfo(8240, "&permil;", "per mille", "Punctuation 2"),
		new CharInfo(8242, "&prime;", "minutes", "Punctuation 2", "Doesn't work in Konqueror 3.5.5 (Linux)"),
		new CharInfo(8243, "&Prime;", "seconds", "Punctuation 2", "Doesn't work in Konqueror 3.5.5 (Linux)"),
		new CharInfo(8249, "&lsaquo;", "single left angle quotation", "Quote Characters"),
		new CharInfo(8250, "&rsaquo;", "single right angle quotation", "Quote Characters"),
		new CharInfo(8254, "&oline;", "overline", "Punctuation 2"),
		new CharInfo(8364, "&euro;", "euro", "Currency Symbols"),
		new CharInfo(8482, "&trade;", "trademark", "IP Symbols"),
		new CharInfo(8592, "&larr;", "left arrow", "Arrows"),
		new CharInfo(8593, "&uarr;", "up arrow", "Arrows"),
		new CharInfo(8594, "&rarr;", "right arrow", "Arrows"),
		new CharInfo(8595, "&darr;", "down arrow", "Arrows"),
		new CharInfo(8596, "&harr;", "left right arrow", "Arrows"),
		new CharInfo(8629, "&crarr;", "carriage return arrow", "Arrows", "Does not display correctly in IE 7"),
		new CharInfo(8704, "&forall; ", "for all", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8706, "&part;", "part", "Math Symbols 2"),
		new CharInfo(8707, "&exists;", "exists", "Math Symbols 2", "Does not display correctly in IE 7; Entity name doesn't work in Firefox 3 or IE 7"),
		new CharInfo(8709, "&empty;", "empty", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8711, "&nabla;", "nabla", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8712, "&isin;", "isin", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8713, "&notin;", "notin", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8715, "&ni;", "ni", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8719, "&prod;", "prod", "Math Symbols 2"),
		new CharInfo(8721, "&sum;", "sum", "Math Symbols 2"),
		new CharInfo(8722, "&minus;", "minus", "Math Symbols 1"),
		new CharInfo(8727, "&lowast;", "lowast", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8730, "&radic;", "square root", "Math Symbols 2"),
		new CharInfo(8733, "&prop;", "proportional to", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8734, "&infin;", "infinity", "Math Symbols 2"),
		new CharInfo(8736, "&ang;", "angle", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8743, "&and;", "and", "Math Symbols 2"),
		new CharInfo(8744, "&or;", "or", "Math Symbols 2"),
		new CharInfo(8745, "&cap;", "cap", "Math Symbols 2"),
		new CharInfo(8746, "&cup;", "cup", "Math Symbols 2"),
		new CharInfo(8747, "&int;", "integral", "Math Symbols 2"),
		new CharInfo(8756, "&there4;", "therefore", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8764, "&sim;", "simular to", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8773, "&cong;", "congruence", "Math Symbols 2"),
		new CharInfo(8776, "&asymp;", "approximately equal", "Math Symbols 2"),
		new CharInfo(8800, "&ne;", "not equal", "Math Symbols 1"),
		new CharInfo(8801, "&equiv;", "equivalent", "Math Symbols 2"),
		new CharInfo(8804, "&le;", "less or equal", "Math Symbols 1", "Doesn't look right in IE 6"),
		new CharInfo(8805, "&ge;", "greater or equal", "Math Symbols 1", "Doesn't look right in IE 6"),
		new CharInfo(8834, "&sub;", "subset of", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8835, "&sup;", "superset of", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8836, "&nsub;", "not subset of", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8838, "&sube;", "subset or equal", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8839, "&supe;", "superset or equal", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8853, "&oplus;", "circled plus", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8855, "&otimes;", "cirled times", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8869, "&perp;", "perpendicular", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8901, "&sdot;", "dot operator", "Math Symbols 2", "Does not display correctly in IE 7"),
		new CharInfo(8968, "&lceil;", "left ceiling", "Punctuation 2"),
		new CharInfo(8969, "&rceil;", "right ceiling", "Punctuation 2"),
		new CharInfo(8970, "&lfloor;", "left floor", "Punctuation 2"),
		new CharInfo(8971, "&rfloor;", "right floor", "Punctuation 2"),
		new CharInfo(9674, "&loz;", "lozenge", "Punctuation 2"),
		new CharInfo(9824, "&spades;", "spade", "Card Suits"),
		new CharInfo(9827, "&clubs;", "club", "Card Suits"),
		new CharInfo(9829, "&hearts;", "heart", "Card Suits"),
		new CharInfo(9830, "&diams;", "diamond", "Card Suits")
	];
	this.sortAscending= true;
	this.sortField= 'group';
	this.sort();
	this.allGroups= new Array();
	var prev= '';
	for (var i= 0; i < this.charArray.length; i++) {
		if (this.charArray[i].group != prev) {
			var grp= new Object();
			grp.group= this.charArray[i].group;
			grp.count= 0;
			this.allGroups.push(grp);
			prev= this.charArray[i].group;
		}
		this.allGroups[this.allGroups.length - 1].count++;
	}
	this.showGroups= new Array();
	for (var i= 0; i < this.allGroups.length; i++) {
		if (this.allGroups[i].count < 21) {
			this.showGroups.push(this.allGroups[i].group);
		}
	}
}

SpecialChars.prototype= { 

	compareDescription: function(charInfo1, charInfo2) {
		return MiscUtils.compareAlpha(charInfo1.description, charInfo2.description);
	},

	compareGroup: function(charInfo1, charInfo2) {
		return MiscUtils.compareAlpha(charInfo1.group, charInfo2.group);
	},

	compareName: function(charInfo1, charInfo2) {
		return MiscUtils.compareAlpha(charInfo1.name, charInfo2.name);
	},

	compareNumber: function(charInfo1, charInfo2) {
		return MiscUtils.compareNumeric(charInfo1.number, charInfo2.number);
	},

	compareNotes: function(charInfo1, charInfo2) {
		return MiscUtils.compareAlpha(charInfo1.notes, charInfo2.notes);
	},

	findGroupToShow: function(groupName) {
		var pos= -1;
		for (var i= 0; i < this.showGroups.length; i++) {
			if (groupName == this.showGroups[i]) {
				pos= i;
				break;
			}
		}
		return pos;
	},

	sort: function() {
		//alert('sort: this=' + this.toString());
		var cmpFunc= null;
		if (this.sortField == 'number') {
			cmpFunc= this.compareNumber;
		}
		else if (this.sortField == 'name') {
			cmpFunc= this.compareName;
		}
		else if (this.sortField == 'description') {
			cmpFunc= this.compareDescription;
		}
		else if (this.sortField == 'group') {
			cmpFunc= this.compareGroup;
		}
		else if (this.sortField == 'notes') {
			cmpFunc= this.compareNotes;
		}
		if (cmpFunc == null) {
			alert('The value of sortField (' + this.sortField + ') is invalid.\n'
					+ 'It should be number, name, description, group, or notes.\n'
					+ 'Defaulting to sort by character number.');
			cmpFunc= this.compareNumber;
		}
		this.charArray.sort(cmpFunc);
		if (!this.sortAscending) {
			this.charArray.reverse();
		}
	},

	toString: function() {
		return 'SpecialChars: {charArray[0]=' + this.charArray[0].toString()
				+ ', charArray[' + (this.charArray.length - 1) + ']=' 
				+ this.charArray[this.charArray.length - 1].toString()
				+ ', showGroups=' + this.showGroups
				+ ', sortAscending=' + this.sortAscending
				+ ', sortField=' + this.sortField + '}';
	}
};

var specialChars= new SpecialChars();

window.onload= function() {
	//--alert('onload: 1'); // DEBUG
	loadGroupCheckboxes();
	//--alert('onload: 2'); // DEBUG
	loadCharacterTable();
	//--alert('onload: 3'); // DEBUG
	document.getElementById('descriptionHeading').onclick= sortCharacterData;
	document.getElementById('nameHeading').onclick= sortCharacterData;
	document.getElementById('numberHeading').onclick= sortCharacterData;
	document.getElementById('groupHeading').onclick= sortCharacterData;
	document.getElementById('notesHeading').onclick= sortCharacterData;
	document.getElementById('groupHeading').className= 'sortedAsc';
	document.getElementById('selectAll').onclick= selectAllGroups;
	document.getElementById('deselectAll').onclick= deselectAllGroups;
	//--alert('onload: 4'); // DEBUG
};


function addCheckbox(parent, name, value, selected, changeFunc, idNumber) {
	var label= document.createElement('label');
	var checkbox= DomUtils.createInput('checkbox', name, value);
	if (changeFunc) {
		checkbox.onclick= changeFunc;
	}
	if (idNumber) {
		checkbox.id= name + idNumber;
	}
	label.appendChild(checkbox);
	if (selected) {
		checkbox.checked= true;
	}
	label.appendChild(document.createTextNode(' ' + value));
	parent.appendChild(label);
}

function addRow(tbody, charObj) {
	var row= DomUtils.createRow('', '');
	var cell= DomUtils.createTextCell('', charObj.description);
	row.appendChild(cell);
	cell= createEntityTextCell(charObj.name);
	row.appendChild(cell);
	cell= createEntityTextCell('&#' + charObj.number + ';');
	row.appendChild(cell);
	cell= DomUtils.createTextCell('', charObj.group);
	row.appendChild(cell);
	cell= DomUtils.createTextCell('', (charObj.notes)? charObj.notes : '');
	row.appendChild(cell);
	tbody.appendChild(row);
};

function createEntityTextCell(entity) {
	var cell= document.createElement('td');
	cell.innerHTML= '<span class="Glyph">' + entity + '</span> ' + MiscUtils.escapeHTML(entity);
	return cell;
}

function deselectAllGroups() {
	specialChars.showGroups= new Array();
	var cb= document.getElementById('groupData').getElementsByTagName('input');
	for (var i= 0; i < cb.length; i++) {
		if (cb[i].checked) {
			cb[i].checked= false;
		}
	}
	loadCharacterTable(); 
}

function groupSelected() {
	//alert('groupSelected: id=' + this.id + ', checked=' + this.checked + ', value=' + this.value);
	var pos= specialChars.findGroupToShow(this.value);
	if (this.checked) {
		if (pos < 0) {
			specialChars.showGroups.push(this.value);
		}
	}
	else {
		if (pos >= 0) {
			specialChars.showGroups.splice(pos, 1);
		}
	}
	loadCharacterTable(); 
}

function loadCharacterTable() {
	var tbody= document.getElementById('characterData');
	DomUtils.removeChildren(tbody);
	for (var i= 0; i < specialChars.charArray.length; i++) {
		if (specialChars.findGroupToShow(specialChars.charArray[i].group) >= 0) {
			addRow(tbody, specialChars.charArray[i]);
		}
	}
}

function loadGroupCheckboxes() {
	var parent= document.getElementById('groupData');
	for (var i= 0; i < specialChars.allGroups.length; i++) {
		var selected= (specialChars.findGroupToShow(specialChars.allGroups[i].group) >= 0);
		addCheckbox(parent, 'group', specialChars.allGroups[i].group, selected, groupSelected, i + 1);
	}
}

function selectAllGroups() {
	specialChars.showGroups= new Array();
	for (var i= 0; i < specialChars.allGroups.length; i++) {
		specialChars.showGroups.push(specialChars.allGroups[i].group);
	}
	var cb= document.getElementById('groupData').getElementsByTagName('input');
	for (var i= 0; i < cb.length; i++) {
		if (cb[i].type == 'checkbox') {
			cb[i].checked= true;
		}
	}
	loadCharacterTable(); 
}

function sortCharacterData() {
	//alert('sortCharacterData: id=' + this.id + ', sortField=' + specialChars.sortField + ', sortAscending=' + specialChars.sortAscending);
	var newField= this.id.substring(0, this.id.length - 'Heading'.length);
	if (newField == specialChars.sortField) {
		specialChars.sortAscending= !(specialChars.sortAscending);
	}
	else {
		document.getElementById(specialChars.sortField + 'Heading').className= '';
		specialChars.sortField= newField;
		specialChars.sortAscending= true;
	}
	this.className= (specialChars.sortAscending)? 'sortedAsc' : 'sortedDesc';
	specialChars.sort();
	loadCharacterTable(); 
}
