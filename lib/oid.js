"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-circular-imports
const scope_registry_1 = require("./implementations/scope-registry");
class Oid {
    constructor(oid) {
        this.oid = oid;
        const factory = Oid.registry.getFactoryByOidString(oid);
        const { id, scope } = factory.unwrap(this);
        this.id = id;
        this.scope = scope;
    }
    static RegisterScope(scope, shortcode) {
        return Oid.registry.register(scope, shortcode);
    }
    static UnregisterScopes() {
        Oid.registry.resetRegistery();
    }
    static Create(scopename, id) {
        const factory = Oid.registry.getFactoryByScopename(scopename);
        const oid = factory.create(scopename, id);
        return oid;
    }
    /**
     * @deprecated in favor of `Oid.Create()`
     * @param scopename
     * @param id
     */
    static create(scopename, id) {
        return this.Create(scopename, id);
    }
    unwrap() {
        return { id: this.id, scope: this.scope };
    }
    // Overide `Object.valueOf()` so GraphQL ID type can convert to the 'primitive' type
    valueOf() {
        return this.oid;
    }
    toString() {
        return this.oid;
    }
}
Oid.registry = scope_registry_1.scopeRegistry;
exports.Oid = Oid;
//# sourceMappingURL=oid.js.map