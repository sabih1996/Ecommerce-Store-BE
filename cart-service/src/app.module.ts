import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [CartModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
