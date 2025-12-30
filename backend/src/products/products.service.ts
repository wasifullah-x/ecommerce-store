import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async onModuleInit() {
    // Seed initial data if database is empty
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      await this.seedData();
    }
  }

  async seedData() {
    const products = [
      {
        name: 'Handwoven Khaddar Shawl',
        description: 'Authentic Khaddar shawl from Peshawar, handwoven with traditional patterns',
        price: 4500,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500',
        stock: 15,
        rating: 4.8,
        tags: ['traditional', 'winter', 'handmade'],
      },
      {
        name: 'Phulkari Dupatta',
        description: 'Beautiful Phulkari embroidered dupatta from Punjab',
        price: 3200,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        stock: 20,
        rating: 4.9,
        tags: ['embroidery', 'traditional', 'wedding'],
      },
      {
        name: 'Ajrak Sindhi Print',
        description: 'Authentic Ajrak fabric with traditional Sindhi block printing',
        price: 2800,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500',
        stock: 30,
        rating: 4.7,
        tags: ['sindhi', 'traditional', 'cultural'],
      },
      {
        name: 'Truck Art Wall Hanging',
        description: 'Colorful Pakistani truck art canvas - hand painted',
        price: 5500,
        category: 'decor',
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500',
        stock: 8,
        rating: 5.0,
        tags: ['art', 'truck-art', 'handmade'],
      },
      {
        name: 'Multan Blue Pottery Set',
        description: 'Traditional blue pottery tea set from Multan',
        price: 3500,
        category: 'decor',
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500',
        stock: 12,
        rating: 4.6,
        tags: ['pottery', 'handmade', 'traditional'],
      },
      {
        name: 'Hunza Organic Honey',
        description: 'Pure organic honey from the valleys of Hunza',
        price: 1500,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=500',
        stock: 50,
        rating: 4.9,
        tags: ['organic', 'food', 'natural'],
      },
      {
        name: 'Kashmiri Chai Mix',
        description: 'Authentic pink tea mix with traditional spices',
        price: 800,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500',
        stock: 100,
        rating: 4.5,
        tags: ['tea', 'traditional', 'beverage'],
      },
      {
        name: 'Chapshuro Gilgiti Special',
        description: 'Traditional Gilgiti flatbread mix - ready to cook',
        price: 600,
        category: 'food',
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500',
        stock: 40,
        rating: 4.4,
        tags: ['food', 'traditional', 'gilgit'],
      },
      {
        name: 'Peshawari Chappal',
        description: 'Authentic leather Peshawari sandals - handcrafted',
        price: 2200,
        category: 'footwear',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500',
        stock: 25,
        rating: 4.8,
        tags: ['footwear', 'leather', 'traditional'],
      },
      {
        name: 'Balochi Mirror Work Bag',
        description: 'Traditional Balochi bag with intricate mirror work',
        price: 3800,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
        stock: 10,
        rating: 4.9,
        tags: ['accessories', 'handmade', 'balochi'],
      },
      {
        name: 'Sialkot Sports Cricket Bat',
        description: 'Professional cricket bat from Sialkot - world famous quality',
        price: 8500,
        category: 'sports',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
        stock: 15,
        rating: 5.0,
        tags: ['sports', 'cricket', 'sialkot'],
      },
      {
        name: 'Chitral Wool Cap (Pakol)',
        description: 'Traditional Chitrali woolen cap - warm and stylish',
        price: 1200,
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500',
        stock: 35,
        rating: 4.7,
        tags: ['winter', 'traditional', 'chitral'],
      },
    ];

    await this.productModel.insertMany(products);
    console.log('✅ Seeded Pakistani products data');
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
