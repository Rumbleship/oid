"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hashids_1 = require("hashids");
const oid_1 = require("..//oid");
const scopes_1 = require("../scopes");
const scope_registry_1 = require("../scope-registry");
class HashidOidFactory {
    static GetHashidOidOptions(scopename) {
        switch (scopename) {
            case scopes_1.HashidScopeNames.Buyer:
                return {
                    shortcode: 'b',
                    checksum: 2,
                    salt: 'Division'
                };
            case scopes_1.HashidScopeNames.Supplier:
                return {
                    shortcode: 's',
                    checksum: 2,
                    salt: 'Division'
                };
            case scopes_1.HashidScopeNames.User:
                return {
                    shortcode: 'u',
                    checksum: 2,
                    salt: 'User'
                };
            case scopes_1.HashidScopeNames.PurchaseOrder:
                return {
                    shortcode: 'po',
                    checksum: 3,
                    salt: 'purchaseOrder'
                };
            case scopes_1.HashidScopeNames.Shipment:
                return {
                    shortcode: 'shp',
                    checksum: 5,
                    salt: 'shipment'
                };
        }
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
            throw new Error('A Hashid Oid must be created with a db_id type:number');
        }
        const { checksum } = HashidOidFactory.GetHashidOidOptions(scopename);
        const shortcode = scope_registry_1.ScopeRegistry.getKey(scopename);
        const encoded = this.getEncoder(scopename).encode(id);
        const check_digit = this.checksumDigit(encoded, checksum);
        return new oid_1.Oid2(`${shortcode}_${encoded}${check_digit}`);
    }
    verifyAndStripCheckDigit(scope, shortcode, suffix) {
        const { checksum } = HashidOidFactory.GetHashidOidOptions(scope);
        const hashLength = suffix.length - 1;
        const checksumDigit = suffix.substring(hashLength, hashLength + 1);
        const hash = suffix.substring(0, hashLength);
        if (checksumDigit !== this.checksumDigit(hash, checksum)) {
            throw new Error(`Malformed oid: ${shortcode}_${suffix}`);
        }
        return hash;
    }
    unwrap(oid) {
        const matches = scope_registry_1.ScopeRegistry.hashIdRegEx.exec(oid.oid);
        if (!matches || (matches && matches.length !== 3)) {
            throw new Error(`Malformed oid format: ${oid.oid}`);
        }
        const [, shortcode, suffix] = matches;
        const scope = scope_registry_1.ScopeRegistry.getScopename(shortcode);
        const hashed = this.verifyAndStripCheckDigit(scope, shortcode, suffix);
        const id = this.getEncoder(scope).decode(hashed)[0];
        return { id, scope };
    }
    getEncoder(scopename) {
        const { salt } = HashidOidFactory.GetHashidOidOptions(scopename);
        // HashidOids are minLength 4 because they include a checkdigit
        return new hashids_1.default(salt, 4, scope_registry_1.ScopeRegistry.ALPHABET);
    }
}
exports.HashidOidFactory = HashidOidFactory;
//# sourceMappingURL=hashid.factory.js.map