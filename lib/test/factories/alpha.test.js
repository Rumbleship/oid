"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("../../src/oid");
/**
 * The initial release of Alpha generated Oids née Hashids that were of min_length 4,
 *   with a checkdigit and unique salt.
 *
 * Here we test that we can consume extant ones as new Oids, and that we the future does
 *   not cause problems as the underlying database_ids result in longer encoded Oids.
 */
describe.each([
    ['PurchaseOrder', 'po', 1, 'po_781nx'],
    ['Shipment', 'shp', 1, 'shp_jdxri'],
    ['User', 'u', 1, 'u_76ykw']
])('Given: a `%s` scope has been registered with shortcode `%s`', (scopeName, shortcode, database_id, known_alpha_hashid) => {
    beforeAll(() => {
        oid_1.Oid.RegisterScope(scopeName, shortcode);
    });
    describe('When: creating an Oid from a known database_id', () => {
        let oid;
        beforeAll(() => {
            oid = oid_1.Oid.Create(scopeName, database_id);
        });
        test('Then: the computed, wrapped string is the same as known alpha string', () => {
            expect(oid.oid).toBe(known_alpha_hashid);
        });
        test('Then: it can be unwrapped to the known (scope, database_id) pair', () => {
            const { scope, id } = oid.unwrap();
            expect(scope).toBe(scope);
            expect(id).toBe(database_id);
        });
    });
});
describe('Given: six-digit oid_string that corresponds to a historical alpha Oid', () => {
    const scope = 'PurchaseOrder';
    const oid_string = 'po_v6vlza';
    const database_id = 100000;
    oid_1.Oid.RegisterScope('PurchaseOrder', 'po');
    describe('When: creating an Oid from (Scope|database_id)', () => {
        let oid;
        beforeAll(() => {
            oid = oid_1.Oid.Create(scope, database_id);
        });
        test('Then: the wrapped oid_string is the expected 6-digit suffix', () => {
            expect(oid.oid).toBe(oid_string);
        });
    });
    describe('When: instantiating an oid', () => {
        let oid;
        beforeAll(() => {
            oid = new oid_1.Oid(oid_string);
        });
        test('Then: the instance can be unwrapped to known (Scope|database_id)', () => {
            const { scope: unwrappedScope, id } = oid.unwrap();
            expect(unwrappedScope).toBe(scope);
            expect(id).toBe(database_id);
        });
    });
});
//# sourceMappingURL=alpha.test.js.map