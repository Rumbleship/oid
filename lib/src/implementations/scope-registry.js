"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xxhash = require("xxhash");
const plain_1 = require("./plain");
const types_1 = require("./types");
const checkdigit_1 = require("./checkdigit");
const tilde_1 = require("./tilde");
class ScopeRegistry {
    static getScopeType(scopename) {
        if (Reflect.get(plain_1.PlainScopeNames, scopename)) {
            return types_1.ScopeTypes.CHECKDIGIT;
        }
        if (Reflect.get(checkdigit_1.AlphaScopeNames, scopename)) {
            return types_1.ScopeTypes.CHECKDIGIT;
        }
        if (Reflect.get(tilde_1.TildeScopeNames, scopename)) {
            return types_1.ScopeTypes.TILDE;
        }
        return types_1.ScopeTypes.EXPERIMENTAL;
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
        const registeredKey = ScopeRegistry.registeredByScopename.get(scopename);
        if (registeredKey && shortcode && registeredKey !== shortcode) {
            throw new Error(`Cannot reregister Scope:${scopename} has already been registered under shortcode:${shortcode}`);
        }
        switch (ScopeRegistry.getScopeType(scopename)) {
            case types_1.ScopeTypes.EXPERIMENTAL:
            case types_1.ScopeTypes.OID:
                if (!shortcode) {
                    throw new Error('PlainOid scopes must declare their shortcode');
                }
                ScopeRegistry.registeredByScopename.set(scopename, shortcode);
                ScopeRegistry.registeredByKey.set(shortcode, scopename);
                return shortcode;
            case types_1.ScopeTypes.CHECKDIGIT:
                if (!shortcode) {
                    throw new Error('Hashid scopes must declare their shortcode');
                }
                ScopeRegistry.registeredByScopename.set(scopename, shortcode);
                ScopeRegistry.registeredByKey.set(shortcode, scopename);
                return shortcode;
            case types_1.ScopeTypes.TILDE:
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