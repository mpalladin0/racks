import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class JsonBodyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => any): void;
}
