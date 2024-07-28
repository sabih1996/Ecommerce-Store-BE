import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  @Index('IDX_CART_ITEM_ID')
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
