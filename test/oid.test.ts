import 'reflect-metadata';
import { Oid } from '../src';
import { ScopeRegistrationError, UnregisteredScopeError } from './../src/errors/index';
import { ScopeTypes } from '../src/implementations/types';
import { Scope } from '../src/implementations/scope-registry';

describe('Scenario: registering Oids', () => {
  describe('Feature: An Oid that is not registered globally can be registered', () => {
    describe('Given: an empty scope registry', () => {
      beforeAll(() => {
        Oid.UnregisterScopes();
      });
      describe('When: registering a non-enumerated scope', () => {
        const ExperimentalScope = 'ExperimentalScope';
        const experimentalShortcode = 'es';
        let scope: Scope;
        beforeAll(() => {
          scope = Oid.RegisterScope(ExperimentalScope, experimentalShortcode);
        });
        test('Then: the specified shortcode should be returned as a key', () => {
          expect(scope.key).toBe(experimentalShortcode);
        });
        describe('And Given: an oid exists, wrapping a known database_id and the experimental scope', () => {
          let oid: Oid;
          const database_id = 1;
          beforeAll(() => {
            oid = Oid.Create('ExperimentalScope', database_id);
          });
          test('Then: it can be unwrapped', () => {
            const { scope: unwrappedScope, id } = oid.unwrap();
            expect(unwrappedScope).toBe(ExperimentalScope);
            expect(id).toBe(database_id);
          });
        });
        describe('When: registering the same scope, same shortcode', () => {
          let scope2: Scope;
          beforeAll(() => {
            scope2 = Oid.RegisterScope(ExperimentalScope, experimentalShortcode);
          });
          test('Then: the specified shortcode should be returned as a key', () => {
            expect(scope2.key).toBe(experimentalShortcode);
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
      describe.each([['PurchaseOrder', 'po', ScopeTypes.CHECKDIGIT]])(
        'When: registering a scope for %s, of type %s',
        (scope, shortcode, scopeType) => {
          let registeredScope: Scope;
          beforeAll(() => {
            registeredScope = Oid.RegisterScope(scope as string, shortcode);
          });
          test('Then: an instance of Scope is returned', () => {
            expect(registeredScope).toBeInstanceOf(Scope);
          });
          test('Then: the shortcode is returned as the key', () => {
            expect(registeredScope.key).toBe(shortcode);
          });
        }
      );

      const UnregisteredScope = 'UnregisteredScope';
      describe(`Given: an unregistered scope '${UnregisteredScope}'`, () => {
        describe(`When: using the scope '${UnregisteredScope}' to create an Oid`, () => {
          test('Then: an error is thrown', () => {
            expect(() => {
              Oid.Create(UnregisteredScope, 2);
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

describe('Scenario: an Oid can be serialized', () => {
  describe('Given: a known `oid_string` mapped to a known (Scope, database_id) pair', () => {
    const oid_string = 'po_781nx';
    const scope = 'PurchaseOrder';
    const database_id = 1;
    describe('Feature: for GQL', () => {
      describe('And: the instance has been constructed from the (scope,database) pair', () => {
        const oid = Oid.Create(scope, database_id);
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
