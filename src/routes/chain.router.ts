import c from 'config';
import express from 'express';

export const chainRouter = express.Router();

chainRouter.get('/', (req, res) => console.log('got it'));
