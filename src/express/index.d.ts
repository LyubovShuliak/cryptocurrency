import express from 'express';

declare global {
  declare const enum INITIAL_DATA {
    INITIAL_DIFFICULTY = 3,
    MINE_RATE = 1000,
    STARTING_BALANCE = 1000
  }
  namespace Express {
    interface Request {
      id: string;
    }
  }

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
}
