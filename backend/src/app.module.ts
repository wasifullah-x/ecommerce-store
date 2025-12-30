import { Module } from '@nestjs/common';
import { ProductsTestController, OrdersTestController } from './test.controllers';

@Module({
  imports: [],
  controllers: [ProductsTestController, OrdersTestController],
})
export class AppModule {}
