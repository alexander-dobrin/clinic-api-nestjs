import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn({ name: 'department_id' })
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => DepartmentEntity, { nullable: true })
  parent_department?: DepartmentEntity;

  @OneToMany(
    () => DepartmentEntity,
    (department) => department.parent_department,
  )
  child_departments?: DepartmentEntity[];

  // TODO: use or not
  @RelationId((department: DepartmentEntity) => department.parent_department)
  parent_department_id?: number;

  @OneToMany(() => DoctorEntity, (doctor) => doctor.department)
  doctors?: DoctorEntity[];

  @CreateDateColumn({ select: false, type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ select: false, type: 'timestamptz' })
  updatedAt?: Date;
}