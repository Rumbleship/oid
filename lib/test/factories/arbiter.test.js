"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("../../src/oid");
/**
 * The initial release of Arbiter included Oid generation that had no checkdigits
 * Here we test that we can go forward/backward between the forward-compatible Arbiter Oids
 *  that include a check digit (e.g. suffix length: 6)
 *  and those old ones that don't (e.g. suffix length: 5).
 *
 * This is safe, because any Arbiter Oid generated in the future will be of length 6:
 *  min_length:5 + checkdigit.
 */
describe.each([
    ['Workflow', 'wf', 1, 'wf_ovjey', 'o'],
    ['Activity', 'act', 1, 'act_ovjey', 'o'],
    ['BusinessApplication', 'be', 1, 'be_ovjey', 'o'],
    ['ExternalEvent', 'ee', 1, 'ee_ovjey', 'o']
])('Given: A Scope: %s, shortcode: %s, dbid: %i and existing no_checkdigit hashid: %s set exists', (scope, shortcode, database_id, oid_no_checkdigit, checkdigit) => {
    beforeAll(() => {
        oid_1.Oid.RegisterScope(scope, shortcode);
    });
    describe('When: creating an Oid from (Scope|database_id)', () => {
        let oid;
        beforeAll(() => {
            oid = oid_1.Oid.Create(scope, database_id);
        });
        test('Then: the wrapped `oid_string` is at least 5 characters + a checkdigit', () => {
            expect(oid.oid.length).toBeGreaterThanOrEqual(6);
            expect(oid.oid.charAt(oid.oid.length - 1)).toBe(checkdigit);
            expect(oid.oid).toBe(oid_no_checkdigit + checkdigit);
        });
        test('Then: the created Oid can be unwrapped to the (Scope|database_id) pair', () => {
            const { scope: unwrappedScope, id } = oid.unwrap();
            expect(unwrappedScope).toBe(scope);
            expect(id).toBe(database_id);
        });
    });
    describe('When: instantiating an Oid to wrap an oid_string', () => {
        describe('And: the oid_string has a checkdigit', () => {
            let oid;
            beforeAll(() => {
                oid = new oid_1.Oid(oid_no_checkdigit + checkdigit);
            });
            test('Then: the instance can be unwrapped', () => {
                const { scope: unwrappedScope, id } = oid.unwrap();
                expect(unwrappedScope).toBe(scope);
                expect(id).toBe(database_id);
            });
        });
    });
    describe('When: instantiating an Oid to wrap an oid_string', () => {
        describe('And: the oid_string does not have a checkdigit', () => {
            let oid;
            beforeAll(() => {
                oid = new oid_1.Oid(oid_no_checkdigit);
            });
            test('Then: the instance can be unwrapped', () => {
                const { scope: unwrappedScope, id } = oid.unwrap();
                expect(unwrappedScope).toBe(scope);
                expect(id).toBe(database_id);
            });
        });
    });
});
//# sourceMappingURL=arbiter.test.js.map