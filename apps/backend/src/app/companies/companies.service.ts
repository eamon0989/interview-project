import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entities/company.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async create(
    createCompanyDto: CreateCompanyDto,
    email: string
  ): Promise<CompanyEntity> {
    this.logger.log(
      `Creating company:  ${createCompanyDto.VAT} for user ${email}`
    );
    this.companyRepository.create(createCompanyDto);
    const createdCompany = await this.companyRepository.save(createCompanyDto);

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `User with email ${email} not found when creating company ${createCompanyDto.VAT}`
      );
    }

    await this.userRepository.save({
      ...user,
      company: createdCompany,
    });

    return createdCompany;
  }

  async findAll(email: string): Promise<CompanyEntity[]> {
    this.logger.log(`Getting all companies for ${email}`);
    const foundUser = await this.userRepository.findOne({
      where: { email },
      relations: ['company'],
    });
    if (!foundUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    if (!foundUser?.company) {
      return [];
    }
    return this.companyRepository.find({
      where: { id: foundUser.company.id },
    });
  }

  async findOne(email: string, id: string) {
    return `This action returns a #${id} company`;
  }
}
