import { PipeTransform, Injectable, ArgumentMetadata, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Equals, IsAlpha, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, NotEquals, validate, ValidateNested, validateSync, ValidationError } from 'class-validator';
import { map, Observable, pipe, take, toArray } from 'rxjs';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile, Profile_Name } from '../schemas/profile.schema';

// class ProfileValidator {
//   @IsNotEmpty()
//   @IsString()
//   @IsAlpha()
//   @IsOptional({ always: true })
//   first_name: string

//   @IsNotEmpty()
//   @IsString()
//   @IsAlpha()
//   @IsOptional({ always: true })
//   middle_name: string

//   @IsNotEmpty()
//   @IsString()
//   @IsAlpha()
//   @IsOptional({ always: true })
//   last_name: string

//   error: any

//   constructor(first: string, middle: string, last: string) {
//     this.first_name = first
//     this.middle_name = middle
//     this.last_name = last
//   }
// }
class ProfileValidator {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @IsOptional({ always: true })
  value: string

  constructor(value: string) {
    this.value = value
  }
}

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const { name: { first, middle, last }} = context.switchToHttp().getRequest().body

     
      // console.log(first, middle, last)

      let error = [];
      
      if (typeof first !== 'undefined') {
        // first name was sent as an arg
        const validateName = new ProfileValidator(first)
        validate(validateName).then(res => {

          console.log(res)
          
          if (res.length) {
            error.push(res)
          }
        })

      }
      if (typeof middle !== 'undefined') {
        // middle name was sent as an arg
      }
      if (typeof last !== 'undefined') {
        // last name was sent as an arg
      }
      
     
     
      // for some reason javascript thinks an empty array is true
      if (error.length) {
        console.log(error)
        return next.handle().pipe(map(error => error == null ? '' : error))
      }

    return next.handle().pipe(map(res => res === null ? '' : res))
  }
}