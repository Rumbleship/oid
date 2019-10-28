import { ScopeRegistrationError, UnregisteredScopeError } from './../src/errors/index';
import 'reflect-metadata';
import { ScopeTypes } from '../src/implementations/types';
import { Oid } from '../src';

describe('Scenario: registering Oids', () => {
  describe('Feature: An Oid that is not registered globally can be registered', () => {
    describe('Given: an empty scope registry', () => {
      beforeAll(() => {
        Oid.unregisterScopes();
      });
      describe('When: registering a non-enumerated scope', () => {
        const ExperimentalScope = 'ExperimentalScope';
        const experimentalShortcode = 'es';
        let key: string | number;
        beforeAll(() => {
          key = Oid.RegisterScope(ExperimentalScope, experimentalShortcode);
        });
        test('Then: the specified shortcode should be returned as a key', () => {
          expect(key).toBe(experimentalShortcode);
        });
        describe('And Given: an oid exists, wrapping a known database_id and the experimental scope', () => {
          let oid: Oid;
          const database_id = 1;
          beforeAll(() => {
            oid = Oid.create('ExperimentalScope', database_id);
          });
          test('Then: it can be unwrapped', () => {
            const { scope, id } = oid.unwrap();
            expect(scope).toBe(ExperimentalScope);
            expect(id).toBe(database_id);
          });
        });
        describe('When: registering the same scope, same shortcode', () => {
          let key2: string | number;
          beforeAll(() => {
            key2 = Oid.RegisterScope(ExperimentalScope, experimentalShortcode);
          });
          test('Then: the specified shortcode should be returned as a key', () => {
            expect(key2).toBe(experimentalShortcode);
          });
        });
        describe('When: registering the same scope, NEW shortcode', () => {
          test('Then: an error is thrown', () => {
            expect(() => Oid.RegisterScope(ExperimentalScope, 'newshortcode')).toThrow(
              ScopeRegistrationError
            );
          });
        });
      });
      describe('When: registering a scope for BankAccounts, of type known to be TILDE', () => {
        let key: string | number;
        beforeAll(() => {
          key = Oid.RegisterScope('BankAccount');
        });
        test('Then: a stable numeric hash key is returned', () => {
          expect(key).toMatchInlineSnapshot('2979548881');
        });
        describe('When: re-registering the same scope', () => {
          let key2: string | number;
          beforeAll(() => {
            key2 = Oid.RegisterScope('BankAccount');
          });
          test('Then: a stable numeric hash key is returned', () => {
            expect(key2).toMatchInlineSnapshot('2979548881');
          });
        });
      });
      describe.each([['PurchaseOrder', 'po', ScopeTypes.CHECKDIGIT]])(
        'When: registering a scope for %s, of type %s',
        (scope, shortcode, scopeType) => {
          let key: string | number;
          beforeAll(() => {
            key = Oid.RegisterScope(scope as string, shortcode);
          });
          test('Then: the shortcode is returned as the key', () => {
            expect(key).toBe(shortcode);
          });
        }
      );

      const UnregisteredScope = 'UnregisteredScope';
      describe(`Given: an unregistered scope '${UnregisteredScope}'`, () => {
        describe(`When: using the scope '${UnregisteredScope}' to create an Oid`, () => {
          test('Then: an error is thrown', () => {
            expect(() => {
              Oid.create(UnregisteredScope, 2);
            }).toThrow(UnregisteredScopeError);
          });
        });
      });
    });
  });
  describe('Feature: Oids must be registered with a shortcode', () => {
    describe('When: registering a new scope with no shortcode', () => {
      test('Then: an error is thrown', () => {
        expect(() => Oid.RegisterScope('FooBarBazQuux')).toThrow(ScopeRegistrationError);
      });
    });
  });
});

describe('Feature: an Oid can be serialized for GQL', () => {
  describe('Given: a known `oid_string` mapped to a known (Scope, database_id) pair', () => {
    const oid_string = 'po_781nx';
    const scope = 'PurchaseOrder';
    const database_id = 1;
    describe('And: the instance has been constructed from the (scope,database) pair', () => {
      const oid = Oid.create(scope, database_id);
      describe('When: invoking `valueOf` on the instance', () => {
        test('Then: the wrapped oid_string is returned', () => {
          expect(oid.valueOf()).toBe(oid_string);
        });
      });
      describe('When: invoking `toString` on the instance', () => {
        test('Then: the wrapped oid_string is returned', () => {
          expect(oid.toString()).toBe(oid_string);
        });
      });
    });
    describe('And: the instance has been constructed `oid_string`', () => {
      const oid = new Oid(oid_string);
      describe('When: invoking `valueOf` on the instance', () => {
        test('Then: the wrapped oid_string is returned', () => {
          expect(oid.valueOf()).toBe(oid_string);
        });
      });
      describe('When: invoking `toString` on the instance', () => {
        test('Then: the wrapped oid_string is returned', () => {
          expect(oid.toString()).toBe(oid_string);
        });
      });
    });
  });
});

describe('Given: a `shortcode` that does not match to a registered Scope', () => {
  const shortcode = 'foo';
  describe('And: it is the prefix to an `oid_string`', () => {
    const oid_string = `${shortcode}_barbaz`;
    describe('When: instantiating an Oid with the `oid_string`', () => {
      test('Then: an error is thrown', () => {
        expect(() => new Oid(oid_string)).toThrow(UnregisteredScopeError);
      });
    });
  });
});
