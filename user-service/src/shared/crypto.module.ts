import { Module } from '@nestjs/common';
import { CryptoHashingService } from './crypto.service';

@Module({
  providers: [CryptoHashingService],
  exports: [CryptoHashingService],
})
export class CryptoModule {}
