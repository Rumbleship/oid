"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("../../oid");
function toBase64(source) {
    return Buffer.from('' + source).toString('base64');
}
function fromBase64(source) {
    return Buffer.from(source, 'base64').toString('ascii');
}
/**
 * Specific for Banking for historic reasons
 */
class BankingOidFactory {
    constructor(registry) {
        this.registry = registry;
    }
    create(scopename, id) {
        const key = this.registry.getKey(scopename);
        const oid_json = JSON.stringify({ key, id });
        const encoded = toBase64(oid_json);
        return new oid_1.Oid(`~${encoded}`);
    }
    unwrap(oid) {
        const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
        const { id, key } = JSON.parse(plain);
        const scope = this.registry.getScopename(key);
        return { id, scope };
    }
}
exports.BankingOidFactory = BankingOidFactory;
//# sourceMappingURL=banking.factory.js.map