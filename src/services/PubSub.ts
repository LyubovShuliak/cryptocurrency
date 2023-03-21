import { createClient, RedisClientType } from 'redis';
import { Block } from '../models/Block';
import { Blockchain } from '../models/Blockchain';

export enum CHANNELS {
  TEST = 'TEST',
  BLOCKCHAIN = 'BLOCKCHAIN'
}

export class PubSub {
  publisher: RedisClientType;
  subscriber: RedisClientType;

  blockchain: Blockchain;

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
    this.publisher = createClient();
    this.subscriber = createClient();
  }

  async connect() {
    await this.subscriber.connect();
    await this.publisher.connect();

    await this.subscriber.subscribe(CHANNELS.TEST, this.handleMessage);
    await this.subscriber.subscribe(CHANNELS.BLOCKCHAIN, this.handleMessage);
  }

  handleMessage(channel: string, message: any) {
    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(JSON.parse(message));
    }
  }
  async publishMessage({ channel, message }: { channel: any; message: string }) {
    this.subscriber.unsubscribe(channel, async () => {
      await this.publisher.publish(channel, message);
      await this.subscriber.subscribe(channel, this.handleMessage);
    });
  }

  broadcastChain() {
    this.publishMessage({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
}
