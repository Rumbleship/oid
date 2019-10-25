import { ScopeTypes } from './scopes';
export declare class ScopeRegistry {
    static ALPHABET: string;
    static readonly hashIdRegEx: RegExp;
    private static registeredByKey;
    private static registeredByScopename;
    static getScopeType(scopename: string): ScopeTypes;
    static getScopename(key: string | number): string;
    static getKey(scopename: string): string | number;
    register(scopename: string, shortcode?: string): string | number;
    resetRegistery(): void;
}
export declare const scopeRegistry: ScopeRegistry;
