import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateOrderItemDto {
  orderId: string;
  bookId: string;
  quantity: number;
  price: number;
}

export interface OrderItemDto extends AuditedEntityDto<string> {
  orderId?: string;
  bookId?: string;
  quantity?: number;
  price?: number;
}
