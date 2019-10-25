import { OidFactory } from './factory.interface';
import { Oid2 } from 'src/oid';
export declare class TildeOidFactory implements OidFactory {
    create(scopename: string, id: string | number): Oid2;
    unwrap(oid: Oid2): {
        scope: string;
        id: string | number;
    };
}
