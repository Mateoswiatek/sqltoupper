// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sqltoupper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sqltoupper.touppersql', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const text = document.getText();

			const config = vscode.workspace.getConfiguration('sql-upper'); // Ustaw 'nazwaTwojegoRozszerzenia' zgodnie z nazwą Twojego rozszerzenia
			const sqlupperConfig: string[] = config.get('sqlupper', []);

			// Przypisanie zawartości tablicy do zmiennej
			const userKeywords: string[] = sqlupperConfig;

			const myKeywords = ['exists', 'replace', 'returns', 'record', 'to', 'query', 'true', 'false', 'nextval'];

			// Agregacje SQL
			const agregaty = ['avg', 'sum', 'min', 'max', 'count', 'group_concat'];

  			// Funkcje Agregujące PostgreSQL
  			const agregatyPos = ['array_agg', 'string_agg', 'json_agg', 'jsonb_agg', 'xmlagg', 'every', 'some', 'any', 'bit_and', 'bit_or', 'bool_and', 'bool_or'];

			const sqlKeywords = ['select', 'from', 'where', 'and', 'or', 'not', 'insert', 'update', 'delete', 'create', 'alter', 'drop', 'table', 'view', 'index', 'procedure', 'function', 'trigger', 'as', 'on', 'using', 'join', 'left', 'right', 'inner', 'outer', 'full', 'cross', 'natural', 'group', 'by', 'having', 'order', 'by', 'asc', 'desc', 'limit', 'offset', 'union', 'intersect', 'except', 'case', 'when', 'then', 'else', 'end', 'primary', 'key', 'unique', 'default', 'check', 'constraint', 'foreign', 'references', 'null', 'true', 'false'];
			
			// Lista typów zmiennych SQL i PostgreSQL
			const sqlTypes = ['int', 'integer', 'smallint', 'bigint', 'numeric', 'decimal', 'real', 'double precision', 'character', 'char', 'varchar', 'text', 'date', 'time', 'timestamp', 'interval', 'boolean', 'enum', 'point', 'line', 'lseg', 'box', 'path', 'polygon', 'circle', 'cidr', 'inet', 'macaddr', 'bit', 'bit varying', 'uuid', 'xml', 'json', 'hstore', 'ltree', 'tsquery', 'tsvector', 'txid_snapshot', 'money', 'bytea', 'oid', 'oidvector', 'pg_lsn', 'pg_snapshot', 'xml[]', 'json[]', 'hstore[]', 'ltree[]', 'tsquery[]', 'tsvector[]', 'txid_snapshot[]', 'money[]', 'bytea[]', 'oid[]', 'oidvector[]', 'pg_lsn[]', 'pg_snapshot[]'];

			// Lista słów kluczowych PL/pgSQL
			const plpgsqlKeywords = ['declare', 'begin', 'end', 'if', 'then', 'else', 'elsif', 'end if', 'case', 'when', 'else', 'end case', 'loop', 'while', 'for', 'in', 'reverse', 'exit', 'continue', 'return', 'next', 'returning', 'raise', 'exception', 'using', 'cast', 'select', 'into', 'strict', 'volatile', 'immutable', 'parallel', 'security', 'stable', 'cost', 'rows', 'setof', 'out', 'inout', 'table', 'function', 'procedure', 'language', 'plpgsql', 'as', '$$', 'is', 'begin', 'end', 'null', 'true', 'false', 'new', 'old', 'tg_name', 'tg_table_name', 'tg_relid', 'tg_table_schema', 'tg_op', 'tg_relatts', 'tg_table_catalog', 'tg_trigger_depth', 'tg_trigtuple', 'tg_newtuple', 'tg_oldtuple', 'tg_event', 'tg_tag', 'tg_nargs', 'tg_argv', 'plpgsql_build_name', 'plpgsql_error', 'plpgsql_raise'];

			// Łączymy wszystkie listy w jedną
			const allKeywords = [...userKeywords, ...agregaty, ...agregatyPos, ...myKeywords, ...sqlKeywords, ...sqlTypes, ...plpgsqlKeywords];

			// Tworzymy wyrażenie regularne do wyszukiwania i zamiany słów
			
			// const regex = new RegExp(`\\b(${allKeywords.join('|')})\\b`, 'gi');
			// const regex = new RegExp(`(?<=\\s|\\()(${allKeywords.join('|')})(?=\\s|\\()`, 'gi');

			const regex = new RegExp(`(?:\\(|\\b)(${allKeywords.join('|')})(?:\\)|\\b)`, 'gi');

			// Zamień tekst w edytorze przy użyciu wyrażenia regularnego
			const newText = text.replace(regex, match => match.toUpperCase());

			// Zastąp tekst w edytorze nowym tekstem
			editor.edit(editBuilder => {
				const start = new vscode.Position(0, 0);
				const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
				const range = new vscode.Range(start, end);
				editBuilder.replace(range, newText);
			});
		} else {
			vscode.window.showInformationMessage('No active text editor.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
