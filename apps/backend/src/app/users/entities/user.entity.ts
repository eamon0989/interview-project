import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base-entity';
import { CompanyEntity } from '../../companies/entities/company.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Index('user_email_index', { unique: true })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id)
  company: CompanyEntity;
}
