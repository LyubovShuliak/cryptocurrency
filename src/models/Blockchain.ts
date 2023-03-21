import { cryptoHash } from '../utils/crypto-hash';
import { Block } from './Block';

export class Blockchain {
  chain: Block[];
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }: { data: any }) {
    const newBlock = Block.mineBlock({ data, lastBlock: this.chain[this.chain.length - 1] });
    this.chain.push(newBlock);
  }

  isValidChain(chain: Block[]) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    for (let i = 1; i < chain.length; i++) {
      const { timeStamp, hash, lastHash, data, nonce, difficulty } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;
      if (actualLastHash !== lastHash) {
        return false;
      }
      const validatedHash = cryptoHash(timeStamp, data, lastHash, nonce, difficulty);
      if (hash !== validatedHash) {
        return false;
      }
      if (Math.abs(lastDifficulty - difficulty) > 1) {
        return false;
      }
    }

    return true;
  }

  replaceChain(chain: Block[]) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer');
      return;
    }

    if (!this.isValidChain(chain)) {
      return;
    }

    this.chain = chain;
  }
}
