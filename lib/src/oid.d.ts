import { OidFactory } from './factories';
export declare class Oid2 {
    oid: string;
    private static readonly registry;
    static RegisterScope(scope: string, shortcode?: string): string | number;
    static getFactoryByScopename(scopename: string): OidFactory;
    static getFactoryByEncoded(external_oid: string): OidFactory;
    static create(scopename: string, id: string | number): Oid2;
    constructor(oid: string);
    unwrap(): {
        id: string | number;
        scope: string;
    };
    static unregisterScopes(): void;
}
