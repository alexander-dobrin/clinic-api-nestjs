import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Delete,
  Request,
  UseGuards,
  SetMetadata,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { AuthenticatedRequest, ReadOptions } from 'src/common/interface';
import { UserEntity } from '../database/entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { MetadataEnum, RoleEnum } from 'src/common/enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserResponseDto } from './dto/response/userResponse.dto';
import { UserDetailsResponseDto } from './dto/response/userDetailsResponse.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata(MetadataEnum.ROLES, [RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata(MetadataEnum.ROLES, [RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  get(@Query() query: ReadOptions<UserEntity>) {
    return this.userService.get(query.find);
  }

  @Get('profile')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata(MetadataEnum.ROLES, [RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDetailsResponseDto })
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.userService.getById(req.user.sub);
  }

  @Get(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata(MetadataEnum.ROLES, [RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDetailsResponseDto })
  getById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.getById(uuid);
  }

  @Put(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata(MetadataEnum.ROLES, [RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(uuid, dto);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata(MetadataEnum.ROLES, [RoleEnum.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin' })
  @ApiResponse({ status: HttpStatus.OK })
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.delete(uuid);
  }
}
