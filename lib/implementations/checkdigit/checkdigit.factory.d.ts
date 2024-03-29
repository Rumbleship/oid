import Hashids from 'hashids';
import { OidFactory } from '../oid-factory.interface';
import { Oid } from '../../oid';
import { ScopeRegistry } from './../scope-registry';
export declare class CheckdigitOidFactory implements OidFactory {
    private registry;
    private readonly ALPHABET;
    static GetHashidOidOptions(scopename: string): {
        length: number;
        checksum: number;
        salt: string;
    };
    constructor(registry: ScopeRegistry);
    checksumDigit(oid_suffix: string, checksum?: number): string;
    create(scopename: string, id: string | number): Oid;
    verifyAndStripCheckDigit(scope: string, shortcode: string, suffix: string): string;
    unwrap(oid: Oid): {
        scope: string;
        id: string | number;
    };
    getEncoder(scopename: string): Hashids;
}
