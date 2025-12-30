import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

// In-memory storage for testing
let products = [
  {
    _id: '1',
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
    _id: '2',
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
    _id: '3',
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
    _id: '4',
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
    _id: '5',
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
    _id: '6',
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
    _id: '7',
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
    _id: '8',
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
    _id: '9',
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
    _id: '10',
    name: 'Sialkot Sports Cricket Bat',
    description: 'Professional cricket bat from Sialkot - world famous quality',
    price: 8500,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
    stock: 15,
    rating: 5.0,
    tags: ['sports', 'cricket', 'sialkot'],
  },
];

let orders = [];
let productIdCounter = 11;
let orderIdCounter = 1;

@Controller('products')
export class ProductsTestController {
  @Get()
  async findAll() {
    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return products.find(p => p._id === id);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return products.filter(p => p.category === category);
  }

  @Post()
  async create(@Body() createProductDto: any) {
    const newProduct = {
      _id: String(productIdCounter++),
      ...createProductDto,
    };
    products.push(newProduct);
    return newProduct;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: any) {
    const index = products.findIndex(p => p._id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updateProductDto };
      return products[index];
    }
    return null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const index = products.findIndex(p => p._id === id);
    if (index !== -1) {
      const deleted = products[index];
      products.splice(index, 1);
      return deleted;
    }
    return null;
  }
}

@Controller('orders')
export class OrdersTestController {
  @Get()
  async findAll() {
    return orders;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return orders.find(o => o._id === id);
  }

  @Post()
  async create(@Body() createOrderDto: any) {
    const newOrder = {
      _id: String(orderIdCounter++),
      ...createOrderDto,
      status: 'pending',
      createdAt: new Date(),
    };
    orders.push(newOrder);
    return newOrder;
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const index = orders.findIndex(o => o._id === id);
    if (index !== -1) {
      orders[index].status = status;
      return orders[index];
    }
    return null;
  }
}
