import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateOrderDto {
  customerId: string;
  orderDate: string;
  totalAmount: number;
}

export interface OrderDto extends AuditedEntityDto<string> {
  customerId?: string;
  orderDate?: string;
  totalAmount?: number;
}
