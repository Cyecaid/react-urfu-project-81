import { readFileSync } from 'node:fs';

export const normalizeHtml = (html: string): string => html.replace(/>\s+</g, '><').trim();

export const readFixture = (name: string): string => {
  const content = readFileSync(new URL(`../__fixtures__/${name}`, import.meta.url), 'utf-8');

  return normalizeHtml(content);
};
