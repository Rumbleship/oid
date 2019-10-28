"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("./../../src/oid");
const errors_1 = require("./../../src/errors");
describe('Given: a scope `CheckdigitTest` has been registered to shortcode `cdt`', () => {
    const scope = 'CheckdigitTest';
    const shortcode = 'cdt';
    oid_1.Oid.RegisterScope(scope, shortcode);
    describe('When: creating an Oid with a database_id that is a string', () => {
        const database_string_id = 'foobar';
        test('Then: an error is thrown', () => {
            expect(() => oid_1.Oid.create(scope, database_string_id)).toThrow(errors_1.MalformedOidError);
        });
    });
    describe('When: instantiating an Oid with an invalid checkdigit', () => {
        const hashed_id = 'ovjey6';
        // const checkdigit = 'd';
        // const oid_string_valid = `${shortcode}_${hashed_id}${checkdigit}`;
        const oid_string_invalid = `${shortcode}_${hashed_id}z`;
        test('Then: an error is thrown', () => {
            expect(() => new oid_1.Oid(oid_string_invalid)).toThrow(errors_1.InvalidCheckdigitError);
        });
    });
    // This test looks to be triggering the `malformed tilde oid` case -- to figure out.
    // describe('When: instantiating an Oid that matches a scope but is not formatted correctly', () => {
    //   const badly_formatted = `${shortcode}__`;
    //   test('Then: an error is thrown', () => {
    //     expect(() => new Oid(badly_formatted)).toThrow(MalformedOidError);
    //   });
    // });
});
//# sourceMappingURL=checkdigit.test.js.map