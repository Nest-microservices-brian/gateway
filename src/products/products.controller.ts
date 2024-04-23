import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Create a product';
  }

  @Get()
  findAllProducts(): Observable<any> {
    return this.productsClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return `Find return product id ${id}`;
  }

  @Delete(':id')
  deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return `Delete product id ${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return `Update product id ${id} ${body}`;
  }
}
