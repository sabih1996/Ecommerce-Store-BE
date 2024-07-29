import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/db/index.export';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: number) {
    const deleteResult = await this.productRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: 'Product deleted successfully' };
  }
}
