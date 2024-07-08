import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {}

export class createNewWallet {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  publicKey: string;

  @IsNotEmpty()
  @IsString()
  privateKey: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
