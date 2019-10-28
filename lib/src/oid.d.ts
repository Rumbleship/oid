import { OidFactory } from './implementations/oid-factory.interface';
export declare class Oid {
    oid: string;
    private id;
    private scope;
    private factory;
    private static readonly registry;
    static RegisterScope(scope: string, shortcode?: string): import("./implementations/scope-registry").Scope;
    static UnregisterScopes(): void;
    static GetFactoryByScopename(scopename: string): OidFactory;
    static GetFactoryByEncoded(external_oid: string): OidFactory;
    static Create(scopename: string, id: string | number): Oid;
    constructor(oid: string);
    unwrap(): {
        id: string | number;
        scope: string;
    };
    valueOf(): string;
    toString(): string;
}
