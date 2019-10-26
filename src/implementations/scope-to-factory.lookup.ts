import { CheckdigitOidFactory, AlphaScopeNames } from './checkdigit';
import { TildeOidFactory, TildeScopeNames } from './tilde';
import { ModernOidFactory, PlainScopeNames } from './plain';
import { OidFactory } from './oid-factory.interface';

const hashidFactory = new CheckdigitOidFactory();
const tildeFactory = new TildeOidFactory();
const modernOidFactory = new ModernOidFactory();
export const OidFactoryMapByScope: Map<string, OidFactory> = new Map<string, OidFactory>();

for (const scopeName of Object.keys(TildeScopeNames)) {
  OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of Object.keys(AlphaScopeNames)) {
  OidFactoryMapByScope.set(scopeName, hashidFactory);
}
for (const scopeName of Object.keys(PlainScopeNames)) {
  OidFactoryMapByScope.set(scopeName, modernOidFactory);
}
