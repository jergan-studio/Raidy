let variables = {};

function runRaidy(code) {
  variables = {}; // reset each run

  const lines = code.split("\n").map(l => l.trim()).filter(Boolean);

  for (let line of lines) {

    // ALERT
    if (line.startsWith("alert")) {
      const msg = extractString(line);
      console.log("ALERT:", msg);
    }

    // LET variable
    else if (line.startsWith("let ")) {
      // let x = 5
      const match = line.match(/let (\\w+) = (.+)/);
      if (match) {
        let name = match[1];
        let value = parseValue(match[2]);
        variables[name] = value;
      }
    }

    // PRINT variable
    else if (line.startsWith("print")) {
      const name = line.replace("print", "").trim();
      console.log(variables[name]);
    }

    else {
      console.log("Unknown command:", line);
    }
  }
}

// helpers
function extractString(line) {
  const match = line.match(/\"(.+)\"/);
  return match ? match[1] : "";
}

function parseValue(val) {
  if (!isNaN(val)) return Number(val);
  if (variables[val] !== undefined) return variables[val];
  return val.replace(/"/g, "");
}

module.exports = { runRaidy };
