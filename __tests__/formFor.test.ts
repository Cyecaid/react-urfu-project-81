import { describe, expect, test, vi } from 'vitest';
import HexletCode from '../src/index.js';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

describe('HexletCode.formFor с пустой формой', () => {
  test('action="#" и method="post"', () => {
    const form = HexletCode.formFor(template, {}, () => {});

    expect(form).toBe('<form action="#" method="post"></form>');
  });

  test('url в action', () => {
    const form = HexletCode.formFor(template, { url: '/users' }, () => {});

    expect(form).toBe('<form action="/users" method="post"></form>');
  });

  test('method переопределяется', () => {
    const form = HexletCode.formFor(template, { url: '/users', method: 'get' }, () => {});

    expect(form).toBe('<form action="/users" method="get"></form>');
  });

  test('без опций', () => {
    const form = HexletCode.formFor(template);

    expect(form).toBe('<form action="#" method="post"></form>');
  });

  test('Вызов колбэка', () => {
    const callback = vi.fn();

    HexletCode.formFor(template, {}, callback);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback.mock.calls[0]?.[0]).toBeDefined();
  });
});
