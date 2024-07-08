import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @Column()
  previousHash: string;

  @Column()
  validator: string;

  @Column()
  timestamp: string;
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  blockHash: string;

  @Column()
  fromAddress: string;

  @Column()
  toAddress: string;

  @Column()
  signature: string;

  @Column()
  amount: number;
}
