import { ScopeTypes } from './types';
export declare class Scope {
    key: string | number;
    name: string;
    constructor(key: string | number, name: string);
}
export declare class ScopeRegistry {
    static ALPHABET: string;
    static readonly hashIdRegEx: RegExp;
    private static registeredByKey;
    private static registeredByScopename;
    static GetScopeType(scopename: string): ScopeTypes;
    static GetScopename(key: string | number): string;
    static GetKey(scopename: string): string | number;
    register(scopename: string, shortcode?: string): Scope;
    resetRegistery(): void;
}
export declare const scopeRegistry: ScopeRegistry;
