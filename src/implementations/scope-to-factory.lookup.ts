import { CheckdigitScopes } from './scopes.enum';
import { CheckdigitOidFactory, AlphaHashidScopes, NoCheckdigitArbiterScopes } from './checkdigit';
import { BankingOidFactory, BankingScopeNames } from './banking';
import { OidFactory } from './oid-factory.interface';
const checkdigitFactory = new CheckdigitOidFactory();
const tildeFactory = new BankingOidFactory();
export const OidFactoryMapByScope: Map<string, OidFactory> = new Map<string, OidFactory>();

for (const scopeName of Object.keys(BankingScopeNames)) {
  OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of [
  ...Object.keys(AlphaHashidScopes),
  ...Object.keys(NoCheckdigitArbiterScopes),
  ...Object.keys(CheckdigitScopes)
]) {
  OidFactoryMapByScope.set(scopeName, checkdigitFactory);
}
