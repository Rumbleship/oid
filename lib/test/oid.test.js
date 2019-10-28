"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("./../src/errors/index");
const types_1 = require("../src/implementations/types");
const scope_registry_1 = require("../src/implementations/scope-registry");
const src_1 = require("../src");
describe('Scenario: registering Oids', () => {
    describe('Feature: An Oid that is not registered globally can be registered', () => {
        describe('Given: an empty scope registry', () => {
            beforeAll(() => {
                src_1.Oid.UnregisterScopes();
            });
            describe('When: registering a non-enumerated scope', () => {
                const ExperimentalScope = 'ExperimentalScope';
                const experimentalShortcode = 'es';
                let scope;
                beforeAll(() => {
                    scope = src_1.Oid.RegisterScope(ExperimentalScope, experimentalShortcode);
                });
                test('Then: the specified shortcode should be returned as a key', () => {
                    expect(scope.key).toBe(experimentalShortcode);
                });
                describe('And Given: an oid exists, wrapping a known database_id and the experimental scope', () => {
                    let oid;
                    const database_id = 1;
                    beforeAll(() => {
                        oid = src_1.Oid.Create('ExperimentalScope', database_id);
                    });
                    test('Then: it can be unwrapped', () => {
                        const { scope: unwrappedScope, id } = oid.unwrap();
                        expect(unwrappedScope).toBe(ExperimentalScope);
                        expect(id).toBe(database_id);
                    });
                });
                describe('When: registering the same scope, same shortcode', () => {
                    let scope2;
                    beforeAll(() => {
                        scope2 = src_1.Oid.RegisterScope(ExperimentalScope, experimentalShortcode);
                    });
                    test('Then: the specified shortcode should be returned as a key', () => {
                        expect(scope2.key).toBe(experimentalShortcode);
                    });
                });
                describe('When: registering the same scope, NEW shortcode', () => {
                    test('Then: an error is thrown', () => {
                        expect(() => src_1.Oid.RegisterScope(ExperimentalScope, 'newshortcode')).toThrow(index_1.ScopeRegistrationError);
                    });
                });
            });
            describe('When: registering a scope for BankAccounts, of type known to be TILDE', () => {
                let scope;
                beforeAll(() => {
                    scope = src_1.Oid.RegisterScope('BankAccount');
                });
                test('Then: a Scope that wraps a stable numeric hash key is returned', () => {
                    expect(scope).toBeInstanceOf(scope_registry_1.Scope);
                    expect(scope.key).toMatchInlineSnapshot('2979548881');
                });
                describe('When: re-registering the same scope', () => {
                    let scope2;
                    beforeAll(() => {
                        scope2 = src_1.Oid.RegisterScope('BankAccount');
                    });
                    test('Then: a Scope that wraps a stable numeric hash key is returned', () => {
                        expect(scope2).toBeInstanceOf(scope_registry_1.Scope);
                        expect(scope2.key).toMatchInlineSnapshot('2979548881');
                    });
                });
            });
            describe.each([['PurchaseOrder', 'po', types_1.ScopeTypes.CHECKDIGIT]])('When: registering a scope for %s, of type %s', (scope, shortcode, scopeType) => {
                let registeredScope;
                beforeAll(() => {
                    registeredScope = src_1.Oid.RegisterScope(scope, shortcode);
                });
                test('Then: an instance of Scope is returned', () => {
                    expect(registeredScope).toBeInstanceOf(scope_registry_1.Scope);
                });
                test('Then: the shortcode is returned as the key', () => {
                    expect(registeredScope.key).toBe(shortcode);
                });
            });
            const UnregisteredScope = 'UnregisteredScope';
            describe(`Given: an unregistered scope '${UnregisteredScope}'`, () => {
                describe(`When: using the scope '${UnregisteredScope}' to create an Oid`, () => {
                    test('Then: an error is thrown', () => {
                        expect(() => {
                            src_1.Oid.Create(UnregisteredScope, 2);
                        }).toThrow(index_1.UnregisteredScopeError);
                    });
                });
            });
        });
    });
    describe('Feature: Oids must be registered with a shortcode', () => {
        describe('When: registering a new scope with no shortcode', () => {
            test('Then: an error is thrown', () => {
                expect(() => src_1.Oid.RegisterScope('FooBarBazQuux')).toThrow(index_1.ScopeRegistrationError);
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
                const oid = src_1.Oid.Create(scope, database_id);
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
                const oid = new src_1.Oid(oid_string);
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
                expect(() => new src_1.Oid(oid_string)).toThrow(index_1.UnregisteredScopeError);
            });
        });
    });
});
//# sourceMappingURL=oid.test.js.map