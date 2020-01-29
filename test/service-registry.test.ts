import { Registry2 } from './../src/oid';
describe('Reregistering a scope', () => {
  test('errors', () => {
    const registery = new Registry2();

    registery.register('Foo', 'f', 'alpha');
    expect(() => registery.register('Foo', 'f', 'alpha')).toThrow();
  });
});
