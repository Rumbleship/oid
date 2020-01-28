"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromBase64(source) {
    return Buffer.from(source, 'base64').toString('ascii');
}
exports.fromBase64 = fromBase64;
function toBase64(source) {
    return Buffer.from('' + source).toString('base64');
}
exports.toBase64 = toBase64;
//# sourceMappingURL=index.js.map