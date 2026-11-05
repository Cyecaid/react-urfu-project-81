import { describe, expect, test } from 'vitest';
import Tag from '../src/Tag.js';

describe('Одиночные теги', () => {
  test('без атрибутов', () => {
    expect(new Tag('br').toString()).toBe('<br>');
  });

  test('Один атрибут', () => {
    expect(new Tag('img', { src: 'path/to/image' }).toString()).toBe('<img src="path/to/image">');
  });

  test('Несколько атрибутов', () => {
    expect(new Tag('input', { type: 'submit', value: 'Save' }).toString()).toBe(
      '<input type="submit" value="Save">',
    );
  });

  test('Игнорирование тела атрибута', () => {
    expect(new Tag('hr', {}, 'ignored').toString()).toBe('<hr>');
  });
});

describe('Парные теги', () => {
  test('с телом без атрибутов', () => {
    expect(new Tag('label', {}, 'Email').toString()).toBe('<label>Email</label>');
  });

  test('Тело + аттрибут', () => {
    expect(new Tag('label', { for: 'email' }, 'Email').toString()).toBe(
      '<label for="email">Email</label>',
    );
  });

  test('Без тела', () => {
    expect(new Tag('div').toString()).toBe('<div></div>');
  });

  test('Числовые значения атрибутов', () => {
    expect(new Tag('textarea', { cols: 20, rows: 40, name: 'job' }, 'hexlet').toString()).toBe(
      '<textarea cols="20" rows="40" name="job">hexlet</textarea>',
    );
  });
});

describe('Экранирование', () => {
  test('спецсимволы в значениях атрибутов экранируются', () => {
    expect(new Tag('input', { value: 'a "b" & <c>' }).toString()).toBe(
      '<input value="a &quot;b&quot; &amp; &lt;c&gt;">',
    );
  });
});
