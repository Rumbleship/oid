"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xxhash = require("xxhash");
const scopes_1 = require("./scopes");
class ScopeRegistry {
    static getScopeType(scopename) {
        if (Reflect.get(scopes_1.OidScopeNames, scopename)) {
            return scopes_1.ScopeTypes.OID;
        }
        if (Reflect.get(scopes_1.HashidScopeNames, scopename)) {
            return scopes_1.ScopeTypes.HASHID;
        }
        if (Reflect.get(scopes_1.TildeScopeNames, scopename)) {
            return scopes_1.ScopeTypes.TILDE;
        }
        return scopes_1.ScopeTypes.EXPERIMENTAL;
    }
    static getScopename(key) {
        const scopename = this.registeredByKey.get(key);
        if (!scopename) {
            throw new Error(`key ${key} is not registered`);
        }
        return scopename;
    }
    static getKey(scopename) {
        const key = this.registeredByScopename.get(scopename);
        if (!key) {
            throw new Error(`scope ${scopename} not registered`);
        }
        return key;
    }
    register(scopename, shortcode) {
        switch (ScopeRegistry.getScopeType(scopename)) {
            case scopes_1.ScopeTypes.EXPERIMENTAL:
            case scopes_1.ScopeTypes.OID:
                if (!shortcode) {
                    throw new Error('ModernOid scopes must declare their shortcode');
                }
                ScopeRegistry.registeredByScopename.set(scopename, shortcode);
                ScopeRegistry.registeredByKey.set(shortcode, scopename);
                return shortcode;
            case scopes_1.ScopeTypes.HASHID:
                if (!shortcode) {
                    throw new Error('Hashid scopes must declare their shortcode');
                }
                ScopeRegistry.registeredByScopename.set(scopename, shortcode);
                ScopeRegistry.registeredByKey.set(shortcode, scopename);
                return shortcode;
            case scopes_1.ScopeTypes.TILDE:
                if (shortcode) {
                    throw new Error('Tilde scopes cannot declare a shortcode');
                }
                const key = xxhash.hash(Buffer.from(scopename), 0xcafecafe);
                ScopeRegistry.registeredByScopename.set(scopename, key);
                ScopeRegistry.registeredByKey.set(key, scopename);
                return key;
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