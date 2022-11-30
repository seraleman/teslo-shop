import { BadGatewayException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidObjectId(value))
      throw new BadGatewayException(`'${value}' is not a valid MongoID`);
    return value;
  }
}
