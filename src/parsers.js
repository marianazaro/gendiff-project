// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export default (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
