import { createHash } from 'crypto';

export const cryptoHash = (...inputs: any) => {
  const hash = createHash('sha256');

  hash.update(
    inputs
      .map((input: any) => JSON.stringify(input))
      .sort()
      .join(' ')
  );

  return hash.digest('hex');
};
