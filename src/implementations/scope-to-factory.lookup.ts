import { CheckdigitOidFactory, AlphaScopeNames } from './checkdigit';
import { TildeOidFactory, TildeScopeNames } from './tilde';
import { PlainScopeNames } from './plain';
import { OidFactory } from './oid-factory.interface';

const checkdigitFactory = new CheckdigitOidFactory();
const tildeFactory = new TildeOidFactory();
// const modernOidFactory = new PlainOidFactory();
export const OidFactoryMapByScope: Map<string, OidFactory> = new Map<string, OidFactory>();

for (const scopeName of Object.keys(TildeScopeNames)) {
  OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of Object.keys(AlphaScopeNames)) {
  OidFactoryMapByScope.set(scopeName, checkdigitFactory);
}
for (const scopeName of Object.keys(PlainScopeNames)) {
  OidFactoryMapByScope.set(scopeName, checkdigitFactory);
}
