import { Controller, Get, Post, Body, Patch, Param, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: CreateAuthDto, @Ip() ip: string) {
    return this.authService.create(createAuthDto, ip);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto, @Ip() ip: string) {
    return this.authService.login(createAuthDto, ip);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }
}
