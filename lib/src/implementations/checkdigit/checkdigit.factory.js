"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../errors/index");
const errors_1 = require("../../errors");
const hashids_1 = require("hashids");
const historical_scopes_1 = require("./historical.scopes");
const scope_registry_1 = require("../scope-registry");
const oid_1 = require("../../oid");
class CheckdigitOidFactory {
    static GetHashidOidOptions(scopename) {
        if (Reflect.get(historical_scopes_1.NoCheckdigitArbiterScopes, scopename)) {
            return {
                length: 5,
                checksum: 3,
                salt: 'rfi_oid'
            };
        }
        if (Reflect.get(historical_scopes_1.AlphaHashidScopes, scopename)) {
            switch (scopename) {
                case historical_scopes_1.AlphaHashidScopes.Buyer:
                    return {
                        length: 4,
                        checksum: 2,
                        salt: 'Division'
                    };
                case historical_scopes_1.AlphaHashidScopes.Supplier:
                    return {
                        length: 4,
                        checksum: 2,
                        salt: 'Division'
                    };
                case historical_scopes_1.AlphaHashidScopes.User:
                    return {
                        length: 4,
                        checksum: 2,
                        salt: 'User'
                    };
                case historical_scopes_1.AlphaHashidScopes.PurchaseOrder:
                    return {
                        length: 4,
                        checksum: 3,
                        salt: 'purchaseOrder'
                    };
                case historical_scopes_1.AlphaHashidScopes.Shipment:
                    return {
                        length: 4,
                        checksum: 5,
                        salt: 'shipment'
                    };
            }
        }
        return {
            length: 6,
            checksum: 6,
            salt: 'rfi_oid'
        };
    }
    checksumDigit(oid_suffix, checksum = 0) {
        const coefficients = [1, 5, 7];
        const chars = oid_suffix.split('');
        const sum = chars.reduce((acc, c, i) => {
            const coefficient = coefficients[i % 3];
            acc += scope_registry_1.ScopeRegistry.ALPHABET.indexOf(c) * coefficient;
            return acc;
        }, 0) + checksum;
        const checksumIndex = scope_registry_1.ScopeRegistry.ALPHABET.length - 1 - (sum % scope_registry_1.ScopeRegistry.ALPHABET.length);
        return scope_registry_1.ScopeRegistry.ALPHABET.charAt(checksumIndex);
    }
    create(scopename, id) {
        if (typeof id !== 'number') {
            throw new errors_1.MalformedOidError('A Hashid Oid must be created with a db_id type:number');
        }
        const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
        const shortcode = scope_registry_1.ScopeRegistry.getKey(scopename);
        const suffix = this.getEncoder(scopename).encode(id);
        const check_digit = this.checksumDigit(suffix, checksum);
        return new oid_1.Oid(`${shortcode}_${suffix}${check_digit}`);
    }
    verifyAndStripCheckDigit(scope, shortcode, suffix) {
        const { checksum, length } = CheckdigitOidFactory.GetHashidOidOptions(scope);
        if (Reflect.get(historical_scopes_1.NoCheckdigitArbiterScopes, scope) && suffix.length === length) {
            // We've consumed an Arbiter hashid that was created without a check digit
            return suffix;
        }
        const hashLength = suffix.length - 1;
        const checksumDigit = suffix.substring(hashLength, hashLength + 1);
        const hash = suffix.substring(0, hashLength);
        if (checksumDigit !== this.checksumDigit(hash, checksum)) {
            throw new index_1.InvalidCheckdigitError(`Malformed oid: ${shortcode}_${suffix}`);
        }
        return hash;
    }
    unwrap(oid) {
        const matches = scope_registry_1.ScopeRegistry.hashIdRegEx.exec(oid.oid);
        if (!matches || (matches && matches.length !== 3)) {
            throw new errors_1.MalformedOidError(`Malformed oid format: ${oid.oid}`);
        }
        const [, shortcode, suffix] = matches;
        const scope = scope_registry_1.ScopeRegistry.getScopename(shortcode);
        const hashed = this.verifyAndStripCheckDigit(scope, shortcode, suffix);
        const id = this.getEncoder(scope).decode(hashed)[0];
        return { id, scope };
    }
    getEncoder(scopename) {
        const { salt, length } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
        // if the scopename is in the alpha scopes, length must be 4 for backward compatibility; else 5
        return new hashids_1.default(salt, length, scope_registry_1.ScopeRegistry.ALPHABET);
    }
}
exports.CheckdigitOidFactory = CheckdigitOidFactory;
//# sourceMappingURL=checkdigit.factory.js.map