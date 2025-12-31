import { UpdateCompanyDto } from "../dto/update-company.dto";
import { CompanyEntity } from "../entities/company.entity";

export function mapUpdate(company: CompanyEntity, updateDto: UpdateCompanyDto) {
    updateDto.VAT && (company.VAT = updateDto.VAT)
    updateDto.name &&(company.name = updateDto.name)

    return company;
}