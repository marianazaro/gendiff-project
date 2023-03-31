import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/extensions
import genDiff from '../src/index.js';
// eslint-disable-next-line import/extensions
import parsers from '../src/parsers.js';
// eslint-disable-next-line import/extensions
import format from '../src/formatters/index.js';
// eslint-disable-next-line import/extensions
import stylish from '../src/formatters/stylish.js';
// eslint-disable-next-line import/extensions
import plain from '../src/formatters/plain.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// eslint-disable-next-line no-undef
test('testing result for tree files stylish/json', () => {
  const expected = readFile('testFile.txt');
  const actual = genDiff(getFixturePath('treefile1.json'), getFixturePath('treefile2.json'), 'stylish');
  // eslint-disable-next-line no-undef
  expect(actual).toBe(expected);
});
// eslint-disable-next-line no-undef
test('testing result for tree files stylish/yml-yaml', () => {
  const expected = readFile('testFile.txt');
  const actual = genDiff(getFixturePath('treefile1.yml'), getFixturePath('treefile2.yaml'));
  // eslint-disable-next-line no-undef
  expect(actual).toBe(expected);
});
// eslint-disable-next-line no-undef
test('testing result for tree files plain/json', () => {
  const expected = readFile('plainFile.txt');
  const actual = genDiff(getFixturePath('treefile1.json'), getFixturePath('treefile2.json'), 'plain');
  // eslint-disable-next-line no-undef
  expect(actual).toBe(expected);
});
// eslint-disable-next-line no-undef
test('testing result for tree files json/json', () => {
  const expected = readFile('jsonFile.txt');
  const actual = genDiff(getFixturePath('treefile1.json'), getFixturePath('treefile2.json'), 'json');
  // eslint-disable-next-line no-undef
  expect(actual).toBe(expected);
});
// eslint-disable-next-line no-undef
test('testing throw parsers', () => {
  // eslint-disable-next-line no-undef
  expect(() => parsers('mjs')).toThrow('Unknown format: mjs');
});
// eslint-disable-next-line no-undef
test('testing throw formatters', () => {
  const a = [{ type: '1' }];
  // eslint-disable-next-line no-undef
  expect(() => format(a, 2)).toThrow('Unknown format: 2');
});
// eslint-disable-next-line no-undef
test('testing stylish for throw wrong type', () => {
  const a = [{ type: 'sam' }];
  // eslint-disable-next-line no-undef
  expect(() => stylish(a)).toThrow(new Error('This type does not exist: sam'));
});
// eslint-disable-next-line no-undef
test('testing plain for throw wrong type', () => {
  const a = [{ type: 'samo' }];
  // eslint-disable-next-line no-undef
  expect(() => plain(a)).toThrow(new Error('This type does not exist: samo'));
});
