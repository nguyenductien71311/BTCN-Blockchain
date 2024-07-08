import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  publicKey: string;

  @Column()
  privateKey: string;

  @Column()
  password: string;
}

@Entity()
export class Coin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  coin: number;

  @Column()
  type: string;
}
