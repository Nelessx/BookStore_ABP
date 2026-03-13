import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateCustomerDto {
  name: string;
  number: string;
}

export interface CustomerDto extends AuditedEntityDto<string> {
  name?: string;
  number?: string;
}
