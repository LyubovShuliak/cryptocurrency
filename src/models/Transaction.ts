import { ec } from 'elliptic';
import { nanoid } from 'nanoid';
import { verifySignature } from '../utils/elliptic';
import { Wallet } from './Wallet';

type Props = { senderWallet: Wallet; recipient: string; amount: number };
type InputProps = { senderWallet: Wallet; outputMap: Map<any, any> };

export class Transaction {
  id: string;
  outputMap: Map<any, any>;
  input: {
    timestamp: string;
    amount: number;
    address: string;
    signature: ec.Signature;
  };
  constructor(props: Props) {
    this.id = nanoid();
    this.outputMap = this.createOutputMap(props);
    this.input = this.createInput({ senderWallet: props.senderWallet, outputMap: this.outputMap });
  }

  createOutputMap({ senderWallet, recipient, amount }: Props) {
    const outputMap = new Map();

    outputMap.set(recipient, amount);
    outputMap.set(senderWallet.publicKey, senderWallet.balance - amount);

    return outputMap;
  }

  createInput({ senderWallet, outputMap }: InputProps) {
    return {
      timestamp: Date.now().toString(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap)
    };
  }
  updateInput({
    senderWallet,
    amount,
    recipient
  }: {
    recipient: string;
    amount: number;
    senderWallet: Wallet;
  }) {
    if (amount > this.outputMap.get(recipient)) {
      throw new Error('Balance exceeded');
    }

    if (!this.outputMap.get(recipient)) {
      this.outputMap.set(recipient, amount);
    } else {
      this.outputMap.set(recipient, this.outputMap.get(recipient) + amount);
    }
    this.outputMap.set(recipient, amount);
    this.outputMap.set(senderWallet.publicKey, this.outputMap.get(senderWallet.publicKey) - amount);
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }
  isValidTransaction(transaction: Transaction) {
    const {
      outputMap,
      input: { timestamp, amount, address, signature }
    } = transaction;

    const outputTotal = [...outputMap.values()].reduce((total, outputAmount) => {
      return total + outputAmount;
    });

    if (amount !== outputTotal) {
      console.error(`Invalid transaction from ${address}`);

      return false;
    }

    if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
      console.error(`Invalid signature from ${address}`);
      return false;
    }

    return true;
  }
}
