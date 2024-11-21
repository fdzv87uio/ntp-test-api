"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomain = getDomain;
function getDomain(site) {
    if (site === "picosa") {
        return process.env.PICOSA_APP_URI;
    }
    else if (site === "praedio") {
        return process.env.PRAEDIO_APP_URI;
    }
    else if (site === "savyworker") {
        return process.env.SAVYWORKER_APP_URI;
    }
    else {
        return process.env.PICOSA_APP_URI;
    }
}
//# sourceMappingURL=formatters.js.map