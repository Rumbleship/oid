import { Oid2 } from '..//oid';
import { OidFactory } from './factory.interface';
export declare class HashidOidFactory implements OidFactory {
    static GetHashidOidOptions(scopename: string): {
        shortcode: string;
        checksum: number;
        salt: string;
    };
    checksumDigit(oid_suffix: string, checksum?: number): string;
    create(scopename: string, id: string | number): Oid2;
    verifyAndStripCheckDigit(scope: string, shortcode: string, suffix: string): string;
    unwrap(oid: Oid2): {
        scope: string;
        id: string | number;
    };
    getEncoder(scopename: string): any;
}
