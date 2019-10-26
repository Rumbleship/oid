import Hashids from 'hashids';
import { Oid2 } from '../../oid';
import { OidFactory } from '../oid-factory.interface';
export declare class ModernOidFactory implements OidFactory {
    create(scopename: string, id: string | number): Oid2;
    unwrap(oid: Oid2): {
        scope: string;
        id: string | number;
    };
    getEncoder(_scopename: string): Hashids;
}
