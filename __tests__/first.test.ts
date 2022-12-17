import { describe, expect, test, } from 'vitest';
import { setup, $fetch, url, } from '@nuxt/test-utils';

describe('My test', async () => {
  await setup({ server: true, });

  test("page url", async () => {
    const index = await url('/');
    expect(index).toContain('127.0.0.1');
  })

  test('render the index page', async () => {
    const html = await $fetch('/');
    expect(html).toContain('Tenticketing'); // The title
  });
});
