import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderTable1627890000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'totalAmount',
            type: 'decimal',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['Pending', 'On the way', 'Delivered'],
            default: "'Pending'",
          },
        ],
        indices: [
          {
            name: 'IDX_ORDER_ID',
            columnNames: ['id'],
          },
          {
            name: 'IDX_ORDER_NAME',
            columnNames: ['name'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}
