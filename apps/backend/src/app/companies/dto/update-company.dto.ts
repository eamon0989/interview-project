import { IsOptional, IsString } from 'class-validator';


export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  VAT?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
