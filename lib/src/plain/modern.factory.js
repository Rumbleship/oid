"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashids_1 = require("hashids");
const scope_registry_1 = require("../implementations/scope-registry");
const oid_1 = require("../oid");
class ModernOidFactory {
    create(scopename, id) {
        if (typeof id !== 'number') {
            throw new Error('A ModernOid must be created with a db_id type:number');
        }
        const shortcode = scope_registry_1.ScopeRegistry.getKey(scopename);
        const encoded = this.getEncoder(scopename).encode(id);
        return new oid_1.Oid2(`${shortcode}_${encoded}`);
    }
    unwrap(oid) {
        const matches = scope_registry_1.ScopeRegistry.hashIdRegEx.exec(oid.oid);
        if (!matches || (matches && matches.length !== 3)) {
            throw new Error(`Malformed oid format: ${oid.oid}`);
        }
        const scope = scope_registry_1.ScopeRegistry.getScopename(matches[1]);
        const id = this.getEncoder(scope).decode(matches[2])[0];
        return { id, scope };
    }
    getEncoder(_scopename) {
        return new hashids_1.default('rfi_oid', 5, scope_registry_1.ScopeRegistry.ALPHABET);
    }
}
exports.ModernOidFactory = ModernOidFactory;
//# sourceMappingURL=modern.factory.js.map