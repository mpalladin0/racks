import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class RawBodyMiddleware implements NestMiddleware {
    constructor();
    use(req: Request<any>, res: Response<any>, next: () => any): any;
}
