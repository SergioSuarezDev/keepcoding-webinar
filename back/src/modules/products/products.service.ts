import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';

import { ProductDocument, Product } from './model/products.model';
import { CreateProductInput, UpdateProductInput } from './dto/products.input';
import { Category } from 'src/modules/categories/model/categories.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async findAll() {
    try {
      return await this.productModel
        .find({})
        .populate({ path: 'categories', model: Category.name })
        .sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async create(data: CreateProductInput) {
    try {
      const product = new this.productModel(data);
      return await product.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async update(_id: MongooseTypes.ObjectId, input: UpdateProductInput) {
    const product = await this.findOne(_id);
    if (!product) throw new NotFoundException(`Product #${_id} not found`);

    return await this.productModel
      .findByIdAndUpdate(_id, { $set: input }, { new: true })
      .sort({ name: 1 })
      .exec();
  }

  async delete(_id: MongooseTypes.ObjectId) {
    const product = await this.findOne(_id);
    if (!product) throw new NotFoundException(`Product #${_id} not found`);

    return await this.productModel.findByIdAndDelete(_id);
  }

  async findOne(_id: MongooseTypes.ObjectId) {
    try {
      return await this.productModel
        .findOne({
          _id
        })
        .populate({ path: 'categories', model: Category.name })
        .exec();
    } catch (error) {
      throw new NotFoundException(`Product #${_id} not found`);
    }
  }

  async findOneSimple(_id: MongooseTypes.ObjectId) {
    try {
      return await this.productModel
        .findOne({
          _id
        })
        .select('_id name')
        .exec();
    } catch (error) {
      throw new NotFoundException(`Product #${_id} not found`);
    }
  }
}
