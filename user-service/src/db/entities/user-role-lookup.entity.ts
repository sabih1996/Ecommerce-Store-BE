import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'UM_UserRoleLookups' })
export class UserRoleLookup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  name: string;
}
