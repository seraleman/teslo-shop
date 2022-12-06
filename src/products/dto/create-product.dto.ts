import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  description?: string;

  @IsIn(['men', 'women'])
  gender: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) return (value = [...new Set(value)]);
    else throw new BadRequestException(`'Tags' must be an array of strings`);
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: [string];

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  //@IsString({ each: true }) // Cada Objeto del arreglo debe ser un string
  @IsArray()
  @IsIn(['s', 'm', 'l', 'xl'], { each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return (value = [...new Set(value)]);
    else throw new BadRequestException(`'Sizes' must be an array of strings`);
  })
  sizes: string[];

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @Transform(({ value }) => {
    if (Array.isArray(value)) return (value = [...new Set(value)]);
    else throw new BadRequestException(`'Tags' must be an array of strings`);
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: [string];

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.toLowerCase())
  title: string;
}
