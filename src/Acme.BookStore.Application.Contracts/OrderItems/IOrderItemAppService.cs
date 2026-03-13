using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.OrderItems;

public interface IOrderItemAppService :
    ICrudAppService<
        OrderItemDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateOrderItemDto>
{
}