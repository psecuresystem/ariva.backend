import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto, ipAddress: string) {
    const user = await this.authRepository.create(createAuthDto);
    return this.generateTokenPair(user, ipAddress);
  }

  async login(createAuthDto: CreateAuthDto, ipAddress: string) {
    const user = await this.authRepository.findOneOrFail({
      phoneNumber: createAuthDto.phoneNumber,
    });
    if (await this.comparePassword(user.password, createAuthDto.password)) {
      return this.generateTokenPair(user, ipAddress);
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  private comparePassword(original: string, provided: string) {
    return bcrypt.compare(provided, original);
  }

  findAll() {
    return this.authRepository.findAll();
  }

  findOne(id: string) {
    return this.authRepository.findOneById(id);
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(id, updateAuthDto);
  }

  async generateTokenPair(data: UserDocument, ipAddress: string) {
    const accessToken = this.jwtService.sign(
      {
        _id: data._id,
        phoneNumber: data.phoneNumber,
        ipAddress,
      },
      {
        expiresIn: '3h',
      },
    );
    // I'm not generating refresh token because since this is a banking application, I would want to log user out automatically for security
    return { accessToken };
  }
}
