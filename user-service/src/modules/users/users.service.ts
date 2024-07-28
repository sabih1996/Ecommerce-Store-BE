import { User } from '@/db/index.export';
import { CryptoHashingService } from '@/shared/crypto.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoHashingService: CryptoHashingService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.cryptoHashingService.hashPassword(
      createUserDto.password,
    );
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findByEmail(email);
    const hashedPassword =
      await this.cryptoHashingService.hashPassword(password);
    const verifyPassword = await this.cryptoHashingService.verifyPassword(
      password,
      hashedPassword,
    );
    if (!verifyPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(user);

    return {
      access_token: accessToken,
      user,
    };
  }
}
