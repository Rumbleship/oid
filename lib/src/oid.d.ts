import { Scope } from './implementations/scope-registry';
export declare class Oid {
    oid: string;
    private id;
    private scope;
    private static readonly registry;
    static RegisterScope(scope: string, shortcode?: string): Scope;
    static UnregisterScopes(): void;
    static Create(scopename: string, id: string | number): Oid;
    constructor(oid: string);
    unwrap(): {
        id: string | number;
        scope: string;
    };
    valueOf(): string;
    toString(): string;
}
