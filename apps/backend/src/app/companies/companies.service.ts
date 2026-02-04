import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    email: string,
  ): Promise<CompanyEntity> {
    this.logger.log(
      `Creating company: ${createCompanyDto.VAT} for user ${email}`,
    );

    const company = this.companyRepository.create(createCompanyDto);
    const createdCompany = await this.companyRepository.save(company);

    await this.usersService.assignCompany(email, createdCompany);

    return createdCompany;
  }

  async findAll(email: string): Promise<CompanyEntity[]> {
    this.logger.log(`Getting all companies for ${email}`);

    const user = await this.usersService.findOne(email);
    return user.company ? [user.company] : [];
  }

  async findOne(email: string, companyId: string) {
    return `This action returns a #${companyId} company`;
  }
}
