import { createHash } from 'crypto';
const hexToBinary = require('hex-to-binary');
export const cryptoHash = (...inputs: any) => {
  const hash = createHash('sha256');

  hash.update(inputs.sort().join(' '));

  return hexToBinary(hash.digest('hex'));
};
