import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongooseTypes } from 'mongoose';

import { Category, CategoryDocument } from './model/categories.model';
import {
  UpdateCategoryInput,
  CreateCategoryInput
} from './dto/categories.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async findAll() {
    try {
      return await this.categoryModel.find({}).sort({ name: 1 });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async create(data: CreateCategoryInput) {
    try {
      const newFaq = new this.categoryModel(data);
      return await newFaq.save();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async update(_id: MongooseTypes.ObjectId, input: UpdateCategoryInput) {
    const category = await this.findOne(_id);
    if (!category) throw new NotFoundException(`Category #${_id} not found`);

    return await this.categoryModel
      .findByIdAndUpdate(_id, { $set: input }, { new: true })
      .sort({ name: 1 })
      .exec();
  }

  async delete(_id: MongooseTypes.ObjectId) {
    const category = await this.findOne(_id);
    if (!category) throw new NotFoundException(`Category #${_id} not found`);

    return await this.categoryModel.findByIdAndDelete(_id);
  }

  async findOne(_id: MongooseTypes.ObjectId) {
    try {
      return await this.categoryModel
        .findOne({
          _id
        })
        .exec();
    } catch (error) {
      throw new NotFoundException(`Category #${_id} not found`);
    }
  }
}
