import { OidFactory } from './oid-factory.interface';
import { ScopeTypes } from './types';
export declare class Scope {
    key: string | number;
    name: string;
    type: ScopeTypes;
    constructor(key: string | number, name: string, type: ScopeTypes);
}
export declare class ScopeRegistry {
    readonly hashIdRegEx: RegExp;
    private registeredByKey;
    private registeredByScopename;
    private scopeKeyToFactoryMap;
    getScopeType(scopename: string): ScopeTypes;
    getScopename(key: string | number): string;
    getKey(scopename: string): string | number;
    constructor();
    getFactoryByScopename(scopename: string): OidFactory;
    getFactoryByOidString(oid_string: string): OidFactory;
    register(scopename: string, shortcode?: string): Scope;
    resetRegistery(): void;
}
export declare const scopeRegistry: ScopeRegistry;
