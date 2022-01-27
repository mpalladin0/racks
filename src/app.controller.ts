import { Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('/')
  async returnHome() {
    return  `Racks | Online`
  }

  @Get('/.well-known/acme-challenge/AdVi-CU-ahmDhGj7mEnKY2qo8SNgUVeRtEUqWoRSWbc')
  async returnChallenge() {
    return `AdVi-CU-ahmDhGj7mEnKY2qo8SNgUVeRtEUqWoRSWbc.eGvCmrZ8msnGq5sBVvHvjrQhtjilAA1Xf_Fhvl0hnVc`
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
  
}
