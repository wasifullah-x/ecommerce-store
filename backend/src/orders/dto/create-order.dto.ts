import { IsString, IsNumber, IsArray, IsEmail } from 'class-validator';

class OrderItemDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsArray()
  items: OrderItemDto[];

  @IsNumber()
  totalAmount: number;
}
