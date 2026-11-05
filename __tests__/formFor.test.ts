import { describe, expect, test, vi } from 'vitest';
import HexletCode, { type InputOptions } from '../src/index.js';
import { readFixture } from './helpers.js';

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

describe('HexletCode.formFor с полями', () => {
  test('input и textarea', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(readFixture('input-and-textarea.html'));
  });

  test('доп атрибуты', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
    });

    expect(form).toBe(readFixture('inputs-with-attributes.html'));
  });

  test('textarea по умолчанию', () => {
    const form = HexletCode.formFor(template, {}, (f) => f.input('job', { as: 'textarea' }));

    expect(form).toBe(readFixture('textarea.html'));
  });

  test('переопределение размера textarea', () => {
    const form = HexletCode.formFor(template, { url: '#' }, (f) =>
      f.input('job', { as: 'textarea', rows: 50, cols: 50 }));

    expect(form).toBe(readFixture('textarea-custom-size.html'));
  });

  test('несуществующее поле', () => {
    const build = () => HexletCode.formFor(template as Record<string, string>, { url: '/users' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.input('age');
    });

    expect(build).toThrow(new Error('Поля \'age\' в шаблоне нет'));
  });

  test('экранирование textarea', () => {
    const form = HexletCode.formFor({ bio: '<b>Rob & co</b>' }, {}, (f) => f.input('bio', { as: 'textarea' }));

    expect(form).toBe(
      '<form action="#" method="post"><label for="bio">Bio</label><textarea cols="20" rows="40" name="bio">&lt;b&gt;Rob &amp; co&lt;/b&gt;</textarea></form>',
    );
  });
});

describe('HexletCode.formFor в граничных случаях', () => {
  test('неизвестный тип поля', () => {
    const build = () => HexletCode.formFor(template, {}, (f) => {
      f.input('name', { as: 'select' } as unknown as InputOptions);
    });

    expect(build).toThrow(new Error('Неизвестный тип \'select\'.'));
  });

  test('null и undefined', () => {
    const form = HexletCode.formFor({ name: null, job: undefined }, {}, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(
      '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="">'
      + '<label for="job">Job</label><textarea cols="20" rows="40" name="job"></textarea></form>',
    );
  });
});

describe('HexletCode.formFor с кнопкой отправки', () => {
  test('submit', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit();
    });

    expect(form).toBe(readFixture('submit-default.html'));
  });

  test('переопределение текста кнопки', () => {
    const form = HexletCode.formFor(template, { method: 'post', url: '/users' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
      f.submit('Wow');
    });

    expect(form).toBe(readFixture('submit-custom.html'));
  });

  test('только submit', () => {
    const form = HexletCode.formFor(template, {}, (f) => f.submit());

    expect(form).toBe('<form action="#" method="post"><input type="submit" value="Save"></form>');
  });

  test('порядок элементов', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.submit('Top');
      f.input('gender');
    });

    expect(form).toBe(
      '<form action="#" method="post"><input type="submit" value="Top">'
      + '<label for="gender">Gender</label><input name="gender" type="text" value="m"></form>',
    );
  });

  test('экранирование текста кнопки', () => {
    const form = HexletCode.formFor(template, {}, (f) => f.submit('Save "now"'));

    expect(form).toBe('<form action="#" method="post"><input type="submit" value="Save &quot;now&quot;"></form>');
  });
});
