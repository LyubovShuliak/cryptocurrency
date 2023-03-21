import express from 'express';
import { Blockchain } from '../../models/Blockchain';
import { HTTPAddBlocks, HTTPGetBlocks } from './chain.controller';

export const chainRouter = express.Router();

chainRouter.get('/blocks', HTTPGetBlocks);
chainRouter.post('/mine', HTTPAddBlocks);
