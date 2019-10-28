"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xxhash = require("xxhash");
const index_1 = require("./../errors/index");
const types_1 = require("./types");
const scopes_enum_1 = require("./scopes.enum");
class Scope {
    constructor(key, name) {
        this.key = key;
        this.name = name;
    }
}
exports.Scope = Scope;
class ScopeRegistry {
    static GetScopeType(scopename) {
        if (Reflect.get(scopes_enum_1.AlphaHashidScopes, scopename) ||
            Reflect.get(scopes_enum_1.NoCheckdigitArbiterScopes, scopename) ||
            Reflect.get(scopes_enum_1.CheckdigitScopes, scopename)) {
            return types_1.ScopeTypes.CHECKDIGIT;
        }
        if (Reflect.get(scopes_enum_1.TildeScopeNames, scopename)) {
            return types_1.ScopeTypes.BANKING;
        }
        return types_1.ScopeTypes.EXPERIMENTAL;
    }
    static GetScopename(key) {
        const scopename = this.registeredByKey.get(key);
        if (!scopename) {
            throw new index_1.UnregisteredScopeError(`key ${key} is not registered`);
        }
        return scopename;
    }
    static GetKey(scopename) {
        const key = this.registeredByScopename.get(scopename);
        if (!key) {
            throw new index_1.UnregisteredScopeError(`scope ${scopename} not registered`);
        }
        return key;
    }
    register(scopename, shortcode) {
        const registeredKey = ScopeRegistry.registeredByScopename.get(scopename);
        if (registeredKey && shortcode && registeredKey !== shortcode) {
            throw new index_1.ScopeRegistrationError(`Cannot reregister Scope:${scopename} has already been registered under shortcode:${shortcode}`);
        }
        switch (ScopeRegistry.GetScopeType(scopename)) {
            case types_1.ScopeTypes.EXPERIMENTAL:
            case types_1.ScopeTypes.CHECKDIGIT:
                if (!shortcode) {
                    throw new index_1.ScopeRegistrationError('Oids must declare their shortcode');
                }
                ScopeRegistry.registeredByScopename.set(scopename, shortcode);
                ScopeRegistry.registeredByKey.set(shortcode, scopename);
                return new Scope(shortcode, scopename);
            case types_1.ScopeTypes.BANKING:
                const key = xxhash.hash(Buffer.from(scopename), 0xcafecafe);
                ScopeRegistry.registeredByScopename.set(scopename, key);
                ScopeRegistry.registeredByKey.set(key, scopename);
                return new Scope(key, scopename);
        }
    }
    resetRegistery() {
        ScopeRegistry.registeredByKey = new Map();
        ScopeRegistry.registeredByScopename = new Map();
    }
}
exports.ScopeRegistry = ScopeRegistry;
ScopeRegistry.ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
ScopeRegistry.hashIdRegEx = /^(.+)_([a-z0-9]+)/;
ScopeRegistry.registeredByKey = new Map();
ScopeRegistry.registeredByScopename = new Map();
exports.scopeRegistry = new ScopeRegistry();
//# sourceMappingURL=scope-registry.js.map