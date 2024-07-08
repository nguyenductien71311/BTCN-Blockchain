import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlockchainDto {}

export class createNewBlock {
  @IsNotEmpty()
  @IsString()
  hash: string;

  @IsNotEmpty()
  @IsString()
  previousHash: string;

  @IsNotEmpty()
  @IsString()
  validator: string;

  @IsNotEmpty()
  @IsString()
  timestamp: string;
}

export class createNewTransaction {
  @IsNotEmpty()
  @IsString()
  blockHash: string;

  @IsNotEmpty()
  @IsString()
  toAddress: string;

  @IsNotEmpty()
  @IsString()
  fromAddress: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  signature: string;
}
