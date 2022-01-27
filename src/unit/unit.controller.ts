import { Controller, Post, Request } from '@nestjs/common';
// import { Request, request } from 'express';

@Controller('unit')
export class UnitController {

    @Post('webhook')
    respondToApproval(@Request() req: Request) {
        const payload = req.body.toString()
        const bodyJson = req.json()
        console.log("Responding to Unit application approval", payload, bodyJson)
        return null
    }
}
