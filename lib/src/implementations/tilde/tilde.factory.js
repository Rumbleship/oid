"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("../../oid");
const scope_registry_1 = require("../scope-registry");
function toBase64(source) {
    return Buffer.from('' + source).toString('base64');
}
function fromBase64(source) {
    return Buffer.from(source, 'base64').toString('ascii');
}
/**
 * Specific for Banking for historic reasons
 */
class TildeOidFactory {
    create(scopename, id) {
        const key = scope_registry_1.ScopeRegistry.getKey(scopename);
        const oid_json = JSON.stringify({ key, id });
        const encoded = toBase64(oid_json);
        return new oid_1.Oid2(`~${encoded}`);
    }
    unwrap(oid) {
        const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
        const { id, key } = JSON.parse(plain);
        const scope = scope_registry_1.ScopeRegistry.getScopename(key);
        return { id, scope };
    }
}
exports.TildeOidFactory = TildeOidFactory;
//# sourceMappingURL=tilde.factory.js.map