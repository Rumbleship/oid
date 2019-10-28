import 'reflect-metadata';
import { Registry } from './../src/registry';
import {
  CheckdigitScopes,
  AlphaHashidScopes,
  TildeScopeNames,
  NoCheckdigitArbiterScopes
} from './../src/implementations/scopes';
const all_scopes = [
  ...Object.keys(AlphaHashidScopes),
  ...Object.keys(NoCheckdigitArbiterScopes),
  ...Object.keys(TildeScopeNames),
  ...Object.keys(CheckdigitScopes)
];

test.each(all_scopes)('Declared scope %s is registered', declared_scope => {
  expect(Reflect.get(Registry, declared_scope)).toBeTruthy();
});
