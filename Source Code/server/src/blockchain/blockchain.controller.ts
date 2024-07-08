import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import {
  createNewBlock,
  createNewTransaction,
} from './dto/create-blockchain.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('/blocks')
  getAllBlocks() {
    return this.blockchainService.getAllBlocks();
  }

  @Get('/transactions')
  getAllTransactions() {
    return this.blockchainService.getAllTransactions();
  }

  @Post('/create-block')
  createNewBlock(@Body() newBlock: createNewBlock) {
    return this.blockchainService.createNewBlock(newBlock);
  }

  @Post('/create-transaction')
  createNewTransaction(@Body() newTransaction: createNewTransaction) {
    return this.blockchainService.createNewTransaction(newTransaction);
  }

  @Get('/transactions/:address')
  getTransactionsByAddress(@Param() param: { address: string }) {
    return this.blockchainService.getTransactionsByAddress(param?.address);
  }
}
