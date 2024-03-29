import { Type } from 'class-transformer';
import { IsArray, IsOptional, Validate, ValidateNested } from 'class-validator';
import { DatesNotOverlapConstraint } from 'src/common/constraint/dates-not-overlap.constraint';
import { DoctorAvailableSlotDto } from '../../doctor-available-slot/doctor-available-slot.dto';

export class UpdateDoctorDto {
  @IsOptional()
  readonly speciality?: string;

  @IsOptional()
  @IsArray()
  @Type(() => DoctorAvailableSlotDto)
  @Validate(DatesNotOverlapConstraint)
  @ValidateNested({ each: true })
  readonly availableSlots?: DoctorAvailableSlotDto[];
}
