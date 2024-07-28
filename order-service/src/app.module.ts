import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [OrderModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
