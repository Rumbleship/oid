import { HashidOidFactory, HashidScopeNames } from './checkdigit';
import { TildeOidFactory, TildeScopeNames } from './tilde';
import { ModernOidFactory, OidScopeNames } from './plain';
import { OidFactory } from './oid-factory.interface';

const hashidFactory = new HashidOidFactory();
const tildeFactory = new TildeOidFactory();
const modernOidFactory = new ModernOidFactory();
export const OidFactoryMapByScope: Map<string, OidFactory> = new Map<string, OidFactory>();

for (const scopeName of Object.keys(TildeScopeNames)) {
  OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of Object.keys(HashidScopeNames)) {
  OidFactoryMapByScope.set(scopeName, hashidFactory);
}
for (const scopeName of Object.keys(OidScopeNames)) {
  OidFactoryMapByScope.set(scopeName, modernOidFactory);
}
