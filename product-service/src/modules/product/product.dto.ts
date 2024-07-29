export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  category: string;
  isActive?: boolean;
}

export class UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  isActive?: boolean;
}
