import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block, Transaction } from './entities/blockchain.entity';
import { Coin } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Block, Transaction, Coin])],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
