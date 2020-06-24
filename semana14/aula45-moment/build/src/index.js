"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const fs = require("fs");
moment.locale('pt-br');
const fileName = '../agenda.ts';
try {
    const data = fs.readFileSync(fileName);
    const string = data.toString();
    console.log(string);
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=index.js.map