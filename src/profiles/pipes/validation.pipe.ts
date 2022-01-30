import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
      console.log("Called")

      /**
       * Manually create validator.....
       */
    console.log(value.name, metadata.data)
    return value;
  }
}