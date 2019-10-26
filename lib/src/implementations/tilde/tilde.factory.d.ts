import { Oid2 } from '../../oid';
import { OidFactory } from '../oid-factory.interface';
export declare class TildeOidFactory implements OidFactory {
    create(scopename: string, id: string | number): Oid2;
    unwrap(oid: Oid2): {
        scope: string;
        id: string | number;
    };
}
