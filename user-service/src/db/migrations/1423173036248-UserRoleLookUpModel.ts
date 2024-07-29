import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRoleLookupTable1680012300000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'UM_UserRoleLookups',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
        indices: [
          {
            name: 'IDX_USER_ROLE_LOOKUP_ID',
            columnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('UM_UserRoleLookups');
  }
}
