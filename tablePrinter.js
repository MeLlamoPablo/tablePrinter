var newlineCchar = '\n';
var titleRowSeparator = '=';
var columnSeparator = '|';

/**
 * Prints data in a nicely formatted table. The data needs to be an array of
 * objects. Each object represents a row, and must have each column defined.
 *
 * @param  {Object[]} data    The input data. Must be an array of objects containing the exact same
 *                            keys.
 * @param  {string} [nC='\n'] The new line character.
 * @param  {string} [tRS='='] The title row separator. Separates the title row from the rest of the
 *                            data.
 * @param  {string} [cS='|']  The column separator.
 * @return {string}           The table, as a string.
 *
 * @example
 * var data = [
 * 	{
 * 		id: 1,
 * 		'Column 1': 'foo',
 * 		'Column 2': 'bar'
 * 	},
 * 	{
 * 		id: 2,
 * 		'Column 1': 'bar',
 * 		'Column 2': 'foo'
 * 	}
 * ];
 *
 * console.log(printTable(data));
 * // Logs:
 * // | id | Column 1 | Column 2 |
 * // | == | ======== | ======== |
 * // | 1  | foo      | bar      |
 * // | 2  | bar      | foo      |
 */
var printTable = function(data, nC = newlineCchar, tRS = titleRowSeparator, cS = columnSeparator) {
	var writeRow = function(data, lengths){
		var output = '';

		for (var i in data) {
			output += cS;
			output += ' ';
			output += data[i];

			var remainingSpace = lengths[i] - data[i].toString().length;
			if(remainingSpace > 0){
				for (var j = 0; j < remainingSpace; j++) {
					output += ' ';
				}
			}

			output += ' ';
		}

		output += cS;

		return output;
	}

	var output = '';

	if(!Array.isArray(data))
		return new Error('Wrong data format: data is not an array');

	// Get the column names based on the first object.
	// Subsequent object must have the exact same columns and column order
	var columns = [];
	var lengths = {};
	for (var i in data[0]) {
		columns.push(i);
		lengths[i] = i.length;
	}

	// Get the longest string's length for each column,
	// so that we know how many spaces we have to use.
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < columns.length; j++) {
			if(typeof data[i] !== 'object')
				return new Error('Wrong data format: data['+i+'] is not an object');
			if(typeof data[i][columns[j]] === 'undefined')
				return new Error('Wrong data format: data['+i+']["'+columns[j]+'"] doesn\'t exist');

			if(data[i][columns[j]].toString().length > lengths[columns[j]])
				lengths[columns[j]] = data[i][columns[j]].toString().length;
		}
	}

	// Print the first row with the column names
	var firstRow = {};
	for (var i = 0; i < columns.length; i++) {
		firstRow[columns[i]] = columns[i];
	}
	output += writeRow(firstRow, lengths) + nC;

	// Write the title separator row
	var separatorRow = {};
	for (var i = 0; i < columns.length; i++) {
		separatorRow[columns[i]] = '';
		for (var j = 0; j < lengths[columns[i]]; j++) {
			separatorRow[columns[i]] += tRS;
		}
	}
	output += writeRow(separatorRow, lengths);

	//Write the rest of the rows
	for (var i = 0; i < data.length; i++) {
		output += nC;
		output += writeRow(data[i], lengths);
	}

	return output;
}

module.exports = printTable;
