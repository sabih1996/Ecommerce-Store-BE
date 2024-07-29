import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
