import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { DoctorEntity } from '../entity/doctor.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder(DoctorEntity, 'doctor')
      .select([
        'doctor.doctor_id',
        'full_name',
        'department_id',
        'count(*)::integer as appointment_count',
        'extract (week from start_date)::integer as week_number',
        'min(start_date) as week_min_date',
      ])
      .innerJoin('doctor.user', 'user')
      .innerJoin('doctor.appointments', 'appointment')
      .groupBy('doctor.doctor_id, full_name, week_number')
      .orderBy('appointment_count', 'DESC')
      .addOrderBy('week_number', 'ASC'),
})
export class DoctorAppointmentsSummaryEntity {
  @ViewColumn()
  doctorId!: number;

  @ViewColumn()
  fullName!: string;

  @ViewColumn()
  departmentId!: number;

  @ViewColumn()
  appointmentCount!: number;

  @ViewColumn()
  weekNumber!: number;

  @ViewColumn()
  weekMinDate!: Date;
}