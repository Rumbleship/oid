import 'reflect-metadata';
import { Oid } from '../src';

describe('Scenario: an Oid can be serialized', () => {
  describe('Given: a known `oid_string` mapped to a known (Scope, database_id) pair', () => {
    const oid_string = 'po_781nx';
    const new_format = 'po.a_781nx';
    const scope = 'PurchaseOrder';
    const database_id = 1;
    describe('Feature: for GQL', () => {
      describe('And: the instance has been constructed from the (scope,database) pair', () => {
        const oid = Oid.Create(scope, database_id);
        describe('When: invoking `valueOf` on the instance', () => {
          test('Then: the wrapped oid_string is returned', () => {
            expect(oid.valueOf()).toBe(new_format);
          });
        });
        describe('When: invoking `toString` on the instance', () => {
          test('Then: the wrapped oid_string is returned', () => {
            expect(oid.toString()).toBe(new_format);
          });
        });
      });
      describe('And: the instance has been constructed `oid_string`', () => {
        const oid = new Oid(oid_string);
        describe('When: invoking `valueOf` on the instance', () => {
          test('Then: the wrapped oid_string is returned', () => {
            expect(oid.valueOf()).toBe(new_format);
          });
        });
        describe('When: invoking `toString` on the instance', () => {
          test('Then: the wrapped oid_string is returned', () => {
            expect(oid.toString()).toBe(new_format);
          });
        });
      });
    });
  });
});

// describe('Given: a `shortcode` that does not match to a registered Scope', () => {
//   const shortcode = 'foo';
//   describe('And: it is the prefix to an `oid_string`', () => {
//     const oid_string = `${shortcode}_barbaz`;
//     describe('When: instantiating an Oid with the `oid_string`', () => {
//       test('Then: an error is thrown', () => {
//         expect(() => new Oid(oid_string)).toThrow(UnregisteredScopeError);
//       });
//     });
//   });
// });
