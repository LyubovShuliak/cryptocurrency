import express from 'express';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
  export const hexToBinary = require('hex-to-binary');

  interface BlockType {
    timeStamp: string;
    lastHash: string;
    hash: string;
    data: any;
    difficulty: number;
    nonce: number;
  }

  interface MineType {
    lastBlock: BlockType;
    data: any;
  }
  const MINE_RATE = 1000;
  const INITIAL_DIFFICULTY = 3;
}
