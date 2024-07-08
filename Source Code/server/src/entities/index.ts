import { Wallet, Coin } from 'src/wallet/entities/wallet.entity';
import { Block, Transaction } from 'src/blockchain/entities/blockchain.entity';

const entities = [Wallet, Block, Transaction, Coin];

export { Wallet, Block, Transaction, Coin };
export default entities;
