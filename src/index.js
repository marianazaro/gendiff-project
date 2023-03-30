import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/extensions
import parse from './parsers.js';
// eslint-disable-next-line import/extensions
import buildTree from './buildTree.js';
// eslint-disable-next-line import/extensions
import format from './formatters/index.js';

const readFile = (filename) => fs.readFileSync(path.resolve(process.cwd(), filename.trim()), 'utf-8');
const extractFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1format = extractFormat(filepath1);
  const file2format = extractFormat(filepath2);
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const obj1 = parse(file1format, fileContent1);
  const obj2 = parse(file2format, fileContent2);
  const innerTree = buildTree(obj1, obj2);
  return format(innerTree, formatName);
};
export default genDiff;
