import { OidFactory } from './implementations/oid-factory.interface';
export declare class Oid {
    oid: string;
    private factory;
    private static readonly registry;
    valueOf(): string;
    toString(): string;
    static RegisterScope(scope: string, shortcode?: string): string | number;
    static getFactoryByScopename(scopename: string): OidFactory;
    static getFactoryByEncoded(external_oid: string): OidFactory;
    static create(scopename: string, id: string | number): Oid;
    constructor(oid: string);
    unwrap(): {
        id: string | number;
        scope: string;
    };
    static unregisterScopes(): void;
}
