import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { UnitService } from 'src/unit/unit.service';
import { ApiProperty } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly unitService: UnitService,
    ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  delelte() {
    return 'Not yet implemented'
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id)
  }

  /**
   * PROFILE
   * @param userId 
   * @returns 
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  findProfile(@Param('id') userId: string) {
    return this.profilesService.findOne(userId)
  }

  @ApiProperty()
  @UseGuards(JwtAuthGuard)
  @Put(':id/profile')



  @UseGuards(JwtAuthGuard)
  @Get(':id/applications')
  findApplications(@Param('id') userId: string) {
    return this.unitService.findApplicationsByUserId(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/applications/create')
  createNewApplicationForUser(@Param('id') userId: string) {
    return this.unitService.createApplicationURL(userId)
  }

  /**
   * DEPOSIT ACCOUNTS
   */

   @UseGuards(JwtAuthGuard)
   @Get(':id/accounts')
   getAccounts(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Get(':id/accounts/:accountId')
   getAccountsById(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Put(':id/accounts/:accountId')
   updateAccountById(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id/accounts/:accountId/delete')
   deleteAccountById(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Get(':id/cards')
   getCards(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Post(':id/cards/create/:type')
   createCard(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Get(':id/cards/:cardId')
   getCardByID(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }

   @UseGuards(JwtAuthGuard)
   @Put(':id/cards/:cardId')
   updateCardById(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }
   
   @UseGuards(JwtAuthGuard)
   @Delete(':id/cards/:cardId/delete')
   deleteCardById(@Param('id') userId: string) {
     return this.profilesService.findOne(userId)
   }
}
