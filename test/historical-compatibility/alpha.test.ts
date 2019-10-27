import { Oid2 } from '../../src/oid';
/**
 * Scenario: ensure that all old, Alpha-created OIDs can be operated on
 */
describe.each([
  ['PurchaseOrder', 'po', 1, 'po_781nx'],
  ['Shipment', 'shp', 1, 'shp_jdxri'],
  ['Buyer', 'b', 1, 'b_ngdn2'],
  ['Supplier', 's', 2, 's_2yon0'],
  ['User', 'u', 1, 'u_76ykw']
])(
  'Given: a `%s` scope has been registered with shortcode `%s`',
  (scopeName, shortcode, database_id, known_alpha_hashid) => {
    beforeAll(() => {
      Oid2.RegisterScope(scopeName as string, shortcode as string);
    });
    describe('When: creating an Oid from a known database_id', () => {
      let oid: Oid2;
      beforeAll(() => {
        oid = Oid2.create(scopeName as string, database_id);
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
  }
);
