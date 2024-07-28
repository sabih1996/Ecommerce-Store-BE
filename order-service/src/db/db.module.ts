import { Inject, Module, OnModuleInit } from '@nestjs/common';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'node:path';
import { config } from 'dotenv';

config();
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  dbConnectionUrl = new URL(process.env.DATABASE_URL);
  databaseName = this.dbConnectionUrl.pathname.substring(1);

  initDB = async () => {
    const connection = new DataSource({
      type: 'postgres',
      url: `postgres://${this.dbConnectionUrl.username}:${
        this.dbConnectionUrl.password
      }@${this.dbConnectionUrl.hostname}:${this.dbConnectionUrl.port || 5432}`,
    });

    await connection.initialize();

    const queryResult = await connection.query(
      `SELECT 1 FROM pg_database WHERE datname='${this.databaseName}';`,
    );
    if (queryResult.length === 0) {
      try {
        await connection.query(`CREATE DATABASE "${this.databaseName}";`);
      } catch (err) {
        if (
          (err as { constraint: string })?.constraint !=
          'pg_database_datname_index'
        ) {
          throw err;
        }
      }
    }
    await connection.destroy();
  };

  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    await this.initDB();
    return {
      type: 'postgres',
      url: this.dbConnectionUrl.toString(),
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: false,
      migrations: [path.join(__dirname, '**/migrations/*.{ts,js}')],
      migrationsRun: true,
      logging: process.env.NODE_ENV === 'development',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  controllers: [],
  providers: [],
})
export class DatabaseModule implements OnModuleInit {
  @Inject() private readonly datasource!: DataSource;

  constructor() {
    console.log('Connecting to DB', process.env.DATABASE_URL);
  }

  async onModuleInit() {
    try {
      await this.datasource.runMigrations();
      console.log('Migrations completed successfully');
    } catch (error) {
      console.error('Error running migrations:', error);
      throw new Error('Outstanding database migrations');
    }
  }
}
