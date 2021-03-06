import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ProfilesService } from '../../profiles/profiles.service';
import { UnitService } from '../../unit/unit.service';
import { ApiHeader } from '@nestjs/swagger';
import { UpdateProfileDto } from '../../profiles/dto/update-profile.dto';
import { ValidationInterceptor } from '../../profiles/pipes/validation.interceptor';


@ApiHeader({ name: 'User API', style: 'label'})
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly unitService: UnitService,
    ) {}

  /**
   * Creates a new user doc in the database
   * @param @type CreateUserDto 
   * @returns The newly created user document
   * @exmaple POST user/create
   */
  @ApiHeader({
    name: 'User API'
  })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Delete a user from the database
   * NOTE: Also deleted thier references/sub documents
   * Cannnot be undone
   * @param userId userId
   * @returns void
   * @example DELETE user/:userId/delete
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':userId/delete')
  delelteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }

  /**
   * Find a user by their userId
   * @param userId 
   * @returns A fully populated user document for the given userId
   * @example GET user/:userId
   */
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOneById(userId)
  }

  /**
   * Find a profile by a given userId
   * @param userId 
   * @returns a fully populated profile for a given user
   * @example GET user/:userId/profile
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  findProfile(@Param('id') userId: string) {
    return this.profilesService.findOne(userId)
  }

  /**
   * Update a profile by the given userId
   * @param userId
   * @returns a fully updated profile for a given user
   * @example PUT user/:userId/profile 
   */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ValidationInterceptor)
  @Put(':id/profile')
  updateProfile(
    @Param('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(userId, updateProfileDto)
  }


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
