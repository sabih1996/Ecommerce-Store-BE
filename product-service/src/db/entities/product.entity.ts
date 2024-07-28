import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Index('IDX_PRODUCT_ID')
  id: number;

  @Column()
  @Index('IDX_PRODUCT_NAME')
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
