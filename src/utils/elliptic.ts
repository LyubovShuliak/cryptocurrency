import { ec as EC } from 'elliptic';
import { cryptoHash } from './crypto-hash';

export const ecliptic = new EC('secp256k1');

export const verifySignature: (props: { publicKey: string; data: any; signature: any }) => any = ({
  publicKey,
  data,
  signature
}) => {
  const keyFromPublic = ecliptic.keyFromPublic(publicKey, 'hex');
  return keyFromPublic.verify(cryptoHash(data), signature);
};
