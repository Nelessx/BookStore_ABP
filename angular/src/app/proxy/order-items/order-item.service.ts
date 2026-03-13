import type { CreateUpdateOrderItemDto, OrderItemDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateUpdateOrderItemDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderItemDto>({
      method: 'POST',
      url: '/api/app/order-item',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/order-item/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderItemDto>({
      method: 'GET',
      url: `/api/app/order-item/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OrderItemDto>>({
      method: 'GET',
      url: '/api/app/order-item',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateOrderItemDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderItemDto>({
      method: 'PUT',
      url: `/api/app/order-item/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}