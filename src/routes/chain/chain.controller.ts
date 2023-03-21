import { Request, Response } from 'express';
import { blockchain, pubsub } from '../..';

import { CHANNELS } from '../../services/PubSub';

export const HTTPGetBlocks = async (req: Request, res: Response) => {
  res.status(200).json(blockchain.chain);
};

export const HTTPAddBlocks = (req: Request, res: Response) => {
  const { data } = req.body;

  blockchain.addBlock({ data });
  pubsub.broadcastChain();
  res.redirect('/api/blocks');
};
