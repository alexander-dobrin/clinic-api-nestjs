import { UserRoleEnum } from 'src/common/enum';
import { PatientEntity } from 'src/database/entity/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { DoctorEntity } from './doctor.entity';
import { ReviewEntity } from './review.entity';
import { ReviewNotificationEntity } from './review-notification.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password?: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role!: UserRoleEnum;

  @Column()
  fullName!: string;

  @Column({ type: String, select: false, nullable: true })
  resetToken?: string | null;

  @Column({ type: String, select: false, nullable: true })
  refreshToken?: string | null;

  @OneToMany(() => PatientEntity, (patient) => patient.user)
  patients?: PatientEntity[];

  @OneToMany(() => DoctorEntity, (doctor) => doctor.user)
  doctors?: DoctorEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews?: ReviewEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments?: CommentEntity[];

  @OneToMany(
    () => ReviewNotificationEntity,
    (reviewNotification) => reviewNotification.user,
  )
  reviewNotifications?: ReviewNotificationEntity[];

  @CreateDateColumn({ select: false, type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ select: false, type: 'timestamptz' })
  updatedAt?: Date;
}
