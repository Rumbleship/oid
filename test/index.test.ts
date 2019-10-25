import 'reflect-metadata';
import { Oid2, ScopeTypes } from '../src';

describe('Scenario: Oids can be registered', () => {
  describe('Given: an empty scope registry', () => {
    beforeAll(() => {
      Oid2.unregisterScopes();
    });
    describe('When: registering a non-enumerated scope', () => {
      const ExperimentalScope = 'ExperimentalScope';
      const experimentalShortcode = 'es';
      let key: string | number;
      beforeAll(() => {
        key = Oid2.RegisterScope(ExperimentalScope, experimentalShortcode);
      });
      test('Then: the specified shortcode should be returned as a key', () => {
        expect(key).toBe(experimentalShortcode);
      });
      describe('And Given: an oid exists, wrapping a known database_id and the experimental scope', () => {
        let oid: Oid2;
        const database_id = 1;
        beforeAll(() => {
          oid = Oid2.create('ExperimentalScope', database_id);
        });
        test('Then: it can be unwrapped', () => {
          const { scope, id } = oid.unwrap();
          expect(scope).toBe(ExperimentalScope);
          expect(id).toBe(database_id);
        });
      });
      describe('When: registering the same scope', () => {
        let key2: string | number;
        beforeAll(() => {
          key2 = Oid2.RegisterScope(ExperimentalScope, experimentalShortcode);
        });
        test('Then: the specified shortcode should be returned as a key', () => {
          expect(key2).toBe(experimentalShortcode);
        });
      });
    });
    describe('When: registering a scope for BankAccounts, of type known to be TILDE', () => {
      let key: string | number;
      beforeAll(() => {
        key = Oid2.RegisterScope('BankAccount');
      });
      test('Then: a stable numeric hash key is returned', () => {
        expect(key).toMatchInlineSnapshot('2979548881');
      });
      describe('When: re-registering the same scope', () => {
        let key2: string | number;
        beforeAll(() => {
          key2 = Oid2.RegisterScope('BankAccount');
        });
        test('Then: a stable numeric hash key is returned', () => {
          expect(key2).toMatchInlineSnapshot('2979548881');
        });
      });
    });
    describe.each([['Workflow', 'wf', ScopeTypes.OID], ['PurchaseOrder', 'po', ScopeTypes.HASHID]])(
      'When: registering a scope for %s, of type %s',
      (scope, shortcode, scopeType) => {
        let key: string | number;
        beforeAll(() => {
          key = Oid2.RegisterScope(scope as string, shortcode);
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
            Oid2.create(UnregisteredScope, 2);
          }).toThrow();
        });
      });
    });
  });
});

describe('Scenario: ceating Hashid Oids', () => {
  describe('Given: a PurchaseOrder scope has been registered', () => {
    beforeAll(() => {
      Oid2.RegisterScope('PurchaseOrder', 'po');
    });
    describe('When: creating an oid from a known database_id', () => {
      let oid: Oid2;
      const database_id = 1;
      const hashed = 'po_781nx';
      beforeAll(() => {
        oid = Oid2.create('PurchaseOrder', database_id);
      });
      test('Then: it hashes mas expected', () => {
        expect(oid.oid).toBe(hashed);
      });
      test('Then: it can be unwrapped', () => {
        const { scope, id } = oid.unwrap();
        expect(scope).toBe('PurchaseOrder');
        expect(id).toBe(database_id);
      });
    });
  });
});

describe('Scenario: creating Modern Oids', () => {
  describe('Given: a Workflow scope has been registered', () => {
    beforeAll(() => {
      Oid2.RegisterScope('Workflow', 'wf');
    });
    const database_id = 1;
    const hashed = 'wf_ovjey';
    describe('When: creating an oid from known database_id', () => {
      let oid: Oid2;
      beforeAll(() => {
        oid = Oid2.create('Workflow', database_id);
      });
      test('Then: it hashes as expected', () => {
        expect(oid.oid).toBe(hashed);
      });
      test('Then: it can be unwrapped', () => {
        const { scope, id } = oid.unwrap();
        expect(scope).toBe('Workflow');
        expect(id).toBe(database_id);
      });
    });
  });
});

describe('Scenario: creating Tilde Oids', () => {
  describe('Given: a BankAccount scope has been registered', () => {
    beforeAll(() => {
      Oid2.RegisterScope('BankAccount');
    });
    const database_id = '122927aa-11ea-4bb4-bb7a-980ac8088971';
    const hashed =
      '~eyJrZXkiOjI5Nzk1NDg4ODEsImlkIjoiMTIyOTI3YWEtMTFlYS00YmI0LWJiN2EtOTgwYWM4MDg4OTcxIn0=';
    describe('When: creating an oid from a database_id', () => {
      let oid: Oid2;
      let oid_no_tilde: Oid2;

      beforeAll(() => {
        oid = Oid2.create('BankAccount', database_id);
        oid_no_tilde = new Oid2(oid.oid.substring(1, oid.oid.length));
      });
      test('Then: it hashes as expected', () => {
        expect(oid.oid).toBe(hashed);
      });
      test('Then: it can be unwrapped', () => {
        const { scope, id } = oid.unwrap();
        expect(scope).toBe('BankAccount');
        expect(id).toBe(database_id);
      });
      test('then the oid wrapping a non-tilde-prefixed string can be unwrapped', () => {
        const { scope, id } = oid_no_tilde.unwrap();
        expect(scope).toBe('BankAccount');
        expect(id).toBe(database_id);
      });
    });
  });
});
