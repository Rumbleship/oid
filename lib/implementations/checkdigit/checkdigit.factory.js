"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckdigitOidFactory = void 0;
const index_1 = require("./../../errors/index");
const hashids_1 = require("hashids");
const historical_scopes_1 = require("./historical.scopes");
// eslint-disable-next-line import/no-cycle
const oid_1 = require("../../oid");
class CheckdigitOidFactory {
    constructor(registry) {
        this.registry = registry;
        this.ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }
    static GetHashidOidOptions(scopename) {
        if (Reflect.get(historical_scopes_1.AlphaHashidScopes, scopename)) {
            switch (scopename) {
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
            acc += this.ALPHABET.indexOf(c) * coefficient;
            return acc;
        }, 0) + checksum;
        const checksumIndex = this.ALPHABET.length - 1 - (sum % this.ALPHABET.length);
        return this.ALPHABET.charAt(checksumIndex);
    }
    create(scopename, id) {
        if (typeof id !== 'number') {
            throw new index_1.MalformedOidError('A Hashid Oid must be created with a db_id type:number');
        }
        const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
        const shortcode = this.registry.getKey(scopename);
        const suffix = this.getEncoder(scopename).encode(id);
        const check_digit = this.checksumDigit(suffix, checksum);
        return new oid_1.Oid(`${shortcode}_${suffix}${check_digit}`);
    }
    verifyAndStripCheckDigit(scope, shortcode, suffix) {
        const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scope);
        const hashLength = suffix.length - 1;
        const checksumDigit = suffix.substring(hashLength, hashLength + 1);
        const hash = suffix.substring(0, hashLength);
        if (checksumDigit !== this.checksumDigit(hash, checksum)) {
            throw new index_1.InvalidCheckdigitError(`Malformed oid: ${shortcode}_${suffix}`);
        }
        return hash;
    }
    unwrap(oid) {
        const matches = this.registry.hashIdRegEx.exec(oid.oid);
        if (!matches || (matches && matches.length !== 3)) {
            throw new index_1.MalformedOidError(`Malformed oid format: ${oid.oid}`);
        }
        const [, shortcode, suffix] = matches;
        const scope = this.registry.getScopename(shortcode);
        const hashed = this.verifyAndStripCheckDigit(scope, shortcode, suffix);
        const id = this.getEncoder(scope).decode(hashed)[0];
        return { id, scope };
    }
    getEncoder(scopename) {
        const { salt, length } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
        return new hashids_1.default(salt, length, this.ALPHABET);
    }
}
exports.CheckdigitOidFactory = CheckdigitOidFactory;
//# sourceMappingURL=checkdigit.factory.js.map