import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class GetDoctorAppointmentsOptionsDto {
  @IsOptional()
  @IsDate()
  readonly fromDate?: Date;

  @IsOptional()
  @IsDate()
  readonly toDate?: Date;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.toString().split(',').map(Number))
  readonly filterDepartmentIds?: number[];

  @IsOptional()
  @IsBoolean()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  readonly isIncludeEmptyValues?: boolean;
}
