"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const banking_factory_1 = require("./banking/banking.factory");
const checkdigit_factory_1 = require("./checkdigit/checkdigit.factory");
const xxhash = require("xxhash");
const index_1 = require("./../errors/index");
const types_1 = require("./types");
const scopes_enum_1 = require("./scopes.enum");
const util_1 = require("../util");
class Scope {
    constructor(key, name, type) {
        this.key = key;
        this.name = name;
        this.type = type;
    }
}
exports.Scope = Scope;
class ScopeRegistry {
    // tslint:disable-next-line: no-empty
    constructor() {
        this.hashIdRegEx = /^(.+)_([a-z0-9]+)/;
        this.registeredByKey = new Map();
        this.registeredByScopename = new Map();
        this.scopeKeyToFactoryMap = new Map();
    }
    getScopeType(scopename) {
        if (Reflect.get(scopes_enum_1.AlphaHashidScopes, scopename) || Reflect.get(scopes_enum_1.CheckdigitScopes, scopename)) {
            return types_1.ScopeTypes.CHECKDIGIT;
        }
        if (Reflect.get(scopes_enum_1.BankingScopeNames, scopename)) {
            return types_1.ScopeTypes.BANKING;
        }
        return types_1.ScopeTypes.EXPERIMENTAL;
    }
    getScopename(key) {
        const scopename = this.registeredByKey.get(key);
        if (!scopename) {
            throw new index_1.UnregisteredScopeError(`key ${key} is not registered`);
        }
        return scopename;
    }
    getKey(scopename) {
        const key = this.registeredByScopename.get(scopename);
        if (!key) {
            throw new index_1.UnregisteredScopeError(`scope ${scopename} not registered`);
        }
        return key;
    }
    getFactoryByScopename(scopename) {
        const type = this.getScopeType(scopename);
        switch (type) {
            case types_1.ScopeTypes.BANKING:
                return new banking_factory_1.BankingOidFactory(this);
            case types_1.ScopeTypes.EXPERIMENTAL:
            case types_1.ScopeTypes.CHECKDIGIT:
                return new checkdigit_factory_1.CheckdigitOidFactory(this);
        }
    }
    getFactoryByOidString(oid_string) {
        if (oid_string[0] === `~`) {
            return new banking_factory_1.BankingOidFactory(this);
        }
        const matches = this.hashIdRegEx.exec(oid_string);
        if (!matches || (matches && matches.length !== 3)) {
            try {
                const { key } = JSON.parse(util_1.fromBase64(oid_string));
                // tslint:disable-next-line no-shadowed-variable
                const factory = this.scopeKeyToFactoryMap.get(key);
                if (!factory) {
                    throw Error('No Factory Found');
                }
                return factory;
            }
            catch (e) {
                throw new index_1.MalformedOidError(`Malformed tilde oid format: ${oid_string}`);
            }
        }
        const [, prefix] = matches;
        const factory = this.scopeKeyToFactoryMap.get(prefix) || new checkdigit_factory_1.CheckdigitOidFactory(this);
        return factory;
    }
    register(scopename, shortcode) {
        const registeredKey = this.registeredByScopename.get(scopename);
        if (registeredKey && shortcode && registeredKey !== shortcode) {
            throw new index_1.ScopeRegistrationError(`Cannot reregister Scope:${scopename} has already been registered under shortcode:${shortcode}`);
        }
        const type = this.getScopeType(scopename);
        switch (type) {
            case types_1.ScopeTypes.EXPERIMENTAL:
            case types_1.ScopeTypes.CHECKDIGIT:
                if (!shortcode) {
                    throw new index_1.ScopeRegistrationError('Oids must declare their shortcode');
                }
                this.registeredByScopename.set(scopename, shortcode);
                this.registeredByKey.set(shortcode, scopename);
                this.scopeKeyToFactoryMap.set(shortcode, new checkdigit_factory_1.CheckdigitOidFactory(this));
                return new Scope(shortcode, scopename, type);
            case types_1.ScopeTypes.BANKING:
                const key = xxhash.hash(Buffer.from(scopename), 0xcafecafe);
                this.registeredByScopename.set(scopename, key);
                this.registeredByKey.set(key, scopename);
                this.scopeKeyToFactoryMap.set(key, new banking_factory_1.BankingOidFactory(this));
                return new Scope(key, scopename, type);
        }
    }
    resetRegistery() {
        this.registeredByKey = new Map();
        this.registeredByScopename = new Map();
    }
}
exports.scopeRegistry = new ScopeRegistry();
//# sourceMappingURL=scope-registry.js.map