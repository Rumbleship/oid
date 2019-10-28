import { Oid } from '../../oid';
import { OidFactory } from '../oid-factory.interface';
/**
 * Specific for Banking for historic reasons
 */
export declare class BankingOidFactory implements OidFactory {
    create(scopename: string, id: string | number): Oid;
    unwrap(oid: Oid): {
        scope: string;
        id: string | number;
    };
}
