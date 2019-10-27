import Hashids from 'hashids';
import { OidFactory } from '../oid-factory.interface';
import { Oid2 } from '../../oid';
export declare class CheckdigitOidFactory implements OidFactory {
    static GetHashidOidOptions(scopename: string): {
        length: number;
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
    getEncoder(scopename: string): Hashids;
}
