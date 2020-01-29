import { ScopeRegistrationError, UnregisteredScopeError } from './../src/errors/index';
import { Oid, Scope } from './../src/oid';
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
        expect(scope.shortcode.toString()).toBe(experimentalShortcode);
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
          expect(scope2.shortcode.toString()).toBe(experimentalShortcode);
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
      let scope: Scope;
      beforeAll(() => {
        scope = Oid.RegisterScope('BankAccount', `~`);
      });
      test('Then: a Scope that wraps a stable numeric hash key is returned', () => {
        expect(scope).toBeInstanceOf(Scope);
        expect(scope.shortcode.toString()).toBe('2979548881');
      });
      describe('When: re-registering the same scope', () => {
        let scope2: Scope;
        beforeAll(() => {
          scope2 = Oid.RegisterScope('BankAccount', '~');
        });
        test('Then: a Scope that wraps a stable numeric hash key is returned', () => {
          expect(scope2).toBeInstanceOf(Scope);
          expect(scope2.shortcode.toString()).toBe('2979548881');
        });
      });
    });
    describe.each([['PurchaseOrder', 'po']])(
      'When: registering a scope for %s',
      (scope, shortcode) => {
        let registeredScope: Scope;
        beforeAll(() => {
          registeredScope = Oid.RegisterScope(scope as string, shortcode);
        });
        test('Then: an instance of Scope is returned', () => {
          expect(registeredScope).toBeInstanceOf(Scope);
        });
        test('Then: the shortcode is returned as the key', () => {
          expect(registeredScope.shortcode.toString()).toBe(shortcode);
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

  // How to add this test? Important for the javascript consumers -- but compiler won't let it
  // in typescript.

  // describe('Feature: Oids must be registered with a shortcode', () => {
  //   describe('When: registering a new scope with no shortcode', () => {
  //     test('Then: an error is thrown', () => {
  //       expect(() => Oid.RegisterScope('FooBarBazQuux', undefined as string)).toThrow(
  //         ScopeRegistrationError
  //       );
  //     });
  //   });
  // });
});
