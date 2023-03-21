import { time } from 'console';
import { GENESIS_DATA } from '../constants';
import { cryptoHash } from '../utils/crypto-hash';

const hexToBinary = require('hex-to-binary');

export class Block {
  hash: string;
  timeStamp: string;
  data: any;
  lastHash: string;
  nonce: number;
  difficulty: number;
  constructor(props: BlockType) {
    this.hash = props.hash;
    this.data = props.data;
    this.timeStamp = props.timeStamp;
    this.lastHash = props.lastHash;
    this.nonce = props.nonce;
    this.difficulty = props.difficulty;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }
  static mineBlock({ lastBlock, data }: MineType) {
    let nonce: number = 0,
      timeStamp: string,
      hash: string = '';

    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    do {
      nonce++;
      timeStamp = Date.now().toString();
      hash = cryptoHash(timeStamp, data, lastHash, nonce, difficulty);
      difficulty = this.adjustDifficulty({ originalBlock: lastBlock, timeStamp });
    } while (!hexToBinary(hash).startsWith('0'.repeat(lastBlock.difficulty)));

    return new Block({
      lastHash,
      data,
      timeStamp,
      hash,
      nonce,
      difficulty: lastBlock.difficulty
    });
  }
  static adjustDifficulty({
    originalBlock,
    timeStamp
  }: {
    originalBlock: BlockType;
    timeStamp: string;
  }) {
    let { difficulty } = originalBlock;

    const difference = Number(timeStamp) - Number(originalBlock.timeStamp);
    if (difficulty < 1) {
      return 1;
    }
    if (difference > INITIAL_DATA.MINE_RATE) {
      return difficulty--;
    }

    return difficulty++;
  }
}
