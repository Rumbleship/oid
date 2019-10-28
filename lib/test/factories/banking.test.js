"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oid_1 = require("../../src/oid");
describe('Scenario: creating Tilde Oids', () => {
    describe('Given: a BankAccount scope has been registered', () => {
        beforeAll(() => {
            oid_1.Oid.RegisterScope('BankAccount');
        });
        const database_id = '122927aa-11ea-4bb4-bb7a-980ac8088971';
        const hashed = '~eyJrZXkiOjI5Nzk1NDg4ODEsImlkIjoiMTIyOTI3YWEtMTFlYS00YmI0LWJiN2EtOTgwYWM4MDg4OTcxIn0=';
        describe('When: creating an oid from a database_id', () => {
            let oid;
            let oid_no_tilde;
            beforeAll(() => {
                oid = oid_1.Oid.Create('BankAccount', database_id);
                oid_no_tilde = new oid_1.Oid(oid.oid.substring(1, oid.oid.length));
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
//# sourceMappingURL=banking.test.js.map