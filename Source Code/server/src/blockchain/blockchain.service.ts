import { BadRequestException, Injectable } from '@nestjs/common';
import {
  createNewBlock,
  createNewTransaction,
} from './dto/create-blockchain.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block, Transaction } from './entities/blockchain.entity';
import { Coin } from 'src/entities';

@Injectable()
export class BlockchainService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
  ) {}

  async getAllBlocks() {
    const blocks = await this.blockRepository.find();
    return blocks;
  }

  async getAllTransactions() {
    const trans = await this.transactionRepository.find();
    return trans;
  }

  async createNewBlock(newBlock: createNewBlock) {
    const block = await this.blockRepository.save(newBlock);
    return block;
  }

  async createNewTransaction(newTransaction: createNewTransaction) {
    const transaction = await this.transactionRepository.save(newTransaction);

    const fromAddress = transaction?.fromAddress;
    const toAddress = transaction?.toAddress;
    const amount = transaction?.amount;
    const type = 'ETH';

    const findFromWalletCoin = await this.coinRepository.findOne({
      where: {
        address: fromAddress,
        type: type,
      },
    });

    const findToWalletCoin = await this.coinRepository.findOne({
      where: {
        address: toAddress,
        type: type,
      },
    });

    if (findFromWalletCoin !== null) {
      if (findFromWalletCoin.coin < amount) {
        throw new BadRequestException("You don't have enough coin!");
      }

      await this.coinRepository
        .createQueryBuilder()
        .update(Coin)
        .set({ coin: findFromWalletCoin.coin - amount })
        .where('address = :address', { address: fromAddress })
        .andWhere('type = :type', { type: type })
        .execute();
    }

    if (findToWalletCoin !== null) {
      await this.coinRepository
        .createQueryBuilder()
        .update(Coin)
        .set({ coin: findToWalletCoin.coin + amount })
        .where('address = :address', { address: toAddress })
        .andWhere('type = :type', { type: type })
        .execute();
    }

    return transaction;
  }

  async getTransactionsByAddress(address: string) {
    const transactions = await this.transactionRepository.find({
      where: [{ toAddress: address }, { fromAddress: address }],
    });

    return transactions;
  }
}
