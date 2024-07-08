import { Injectable } from '@nestjs/common';
import { CreateWalletDto, createNewWallet } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Repository } from 'typeorm';
import { Coin, Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
  ) {}

  async createNewWallet(newWalltet: createNewWallet) {
    newWalltet.password = await bcrypt.hash(newWalltet.password, 10);

    const res = await this.walletRepository.save(newWalltet);

    const newCoin = {
      address: newWalltet?.address,
      coin: 0,
      type: 'ETH',
    };

    await this.coinRepository.save(newCoin);

    return res;
  }

  async accessKeyStore(wallet: createNewWallet) {
    const findWallet = await this.walletRepository.findOne({
      where: {
        address: wallet?.address,
        publicKey: wallet?.publicKey,
        privateKey: wallet?.privateKey,
      },
    });

    if (!findWallet) return null;

    const comparePassword = await bcrypt.compare(
      wallet?.password,
      findWallet?.password,
    );

    if (!comparePassword) return null;

    return findWallet;
  }

  async accessPrivateKey(privateKey: string) {
    const findWallet = await this.walletRepository.findOne({
      where: {
        privateKey: privateKey,
      },
    });

    if (!findWallet) return null;

    return findWallet;
  }

  async getWalletCoins(address: string, type: string) {
    const findWalletCoin = await this.coinRepository.findOne({
      where: {
        address: address,
        type: type,
      },
    });

    if (!findWalletCoin) return null;

    return findWalletCoin;
  }

  async getAllWalletCoins(type: string) {
    const findWalletCoin = await this.coinRepository.find({
      where: {
        type: type,
      },
    });

    if (!findWalletCoin) return null;

    return findWalletCoin;
  }
}
