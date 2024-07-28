import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @Index('IDX_ORDER_ITEM_ID')
  id: number;

  @Column()
  productId: number;

  @Column()
  orderId: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}
