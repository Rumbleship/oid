import { CheckdigitOidFactory, AlphaHashidScopes, NoCheckdigitArbiterScopes } from './checkdigit';
import { TildeOidFactory, TildeScopeNames } from './tilde';
import { OidFactory } from './oid-factory.interface';

const checkdigitFactory = new CheckdigitOidFactory();
const tildeFactory = new TildeOidFactory();
export const OidFactoryMapByScope: Map<string, OidFactory> = new Map<string, OidFactory>();

for (const scopeName of Object.keys(TildeScopeNames)) {
  OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of [
  ...Object.keys(AlphaHashidScopes),
  ...Object.keys(NoCheckdigitArbiterScopes)
]) {
  OidFactoryMapByScope.set(scopeName, checkdigitFactory);
}
