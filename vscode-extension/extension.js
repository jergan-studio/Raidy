const vscode = require("vscode");
const { runRaidy } = require("../runtime/main");

function activate(context) {
  let disposable = vscode.commands.registerCommand("raidy.run", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const code = editor.document.getText();
    runRaidy(code);
  });

  context.subscriptions.push(disposable);
}

module.exports = { activate };
