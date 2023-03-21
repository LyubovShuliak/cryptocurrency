import { ec as EC } from 'elliptic';
import { cryptoHash } from '../utils/crypto-hash';
import { ecliptic } from '../utils/elliptic';

export class Wallet {
  balance: number;
  publicKey: string;
  keyPair: EC.KeyPair;
  constructor() {
    this.balance = INITIAL_DATA.STARTING_BALANCE;
    this.keyPair = ecliptic.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex', true);
  }

  sign(data: any) {
    return this.keyPair.sign(cryptoHash(data));
  }
}
