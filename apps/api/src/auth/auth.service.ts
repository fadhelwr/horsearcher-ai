import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity.js';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(
      dto.password,
      10,
    );

    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
        where: {
        email: dto.email,
        },
    });

    if (!user) {
        throw new UnauthorizedException(
        'Invalid credentials',
        );
    }

    const isPasswordValid =
        await bcrypt.compare(
        dto.password,
        user.passwordHash,
        );

    if (!isPasswordValid) {
        throw new UnauthorizedException(
        'Invalid credentials',
        );
    }

    const payload = {
        sub: user.id,
        email: user.email,
        };

        const accessToken =
        await this.jwtService.signAsync(payload);

        return {
        accessToken,
        };
    }
}