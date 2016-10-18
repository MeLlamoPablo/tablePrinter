# Deprecated warning

`tablePrinter` was a fun little experiment, but it has very basic and limited functionality, and 
it is no longer being manatained. If you need something like it, you should check out 
[cli-table2](https://github.com/jamestalmage/cli-table2) or [table](https://www.npmjs
.com/package/table).

# tablePrinter

Turns this:

```javascript
var data = [
	{
		id: 1,
		'Column 1': 'foo',
		'Column 2': 'bar'
	},
	{
		id: 2,
		'Column 1': 'bar',
		'Column 2': 'foo'
	}
];
```

Into this:

```
| id | Column 1 | Column 2 |
| == | ======== | ======== |
| 1  | foo      | bar      |
| 2  | bar      | foo      |
```

## Usage

```sh
npm install --save tableprinter
```

```javascript
const printTable = require('tableprinter');
printTable(data);
```
