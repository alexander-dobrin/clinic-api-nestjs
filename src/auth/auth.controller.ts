import {
  Body,
  Controller,
  Param,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { RecoverPasswordDto } from './dto/recoverPassword.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/response/authResponse.dto';
import { ResetPasswordResponseDto } from './dto/response/resetPasswordResponse.dto';
import { Throttle } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthenticatedRequest } from 'src/common/interface';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 5)
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthResponseDto })
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 5)
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthResponseDto })
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 5)
  @ApiResponse({ status: HttpStatus.OK, type: ResetPasswordResponseDto })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.email);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 5)
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  // TODO: logout

  @Post('recover/:resetToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 5)
  @ApiParam({
    name: 'resetToken',
    description: 'v4',
    example: 'f58e129c-2db7-400c-a5f4-45b19a9afff3',
  })
  recoverPassword(
    @Param('resetToken') resetToken: string,
    @Body() dto: RecoverPasswordDto,
  ) {
    return this.authService.recoverPassword(resetToken, dto.password);
  }
}
