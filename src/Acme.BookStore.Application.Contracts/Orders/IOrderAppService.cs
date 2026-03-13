using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Orders;

public interface IOrderAppService :
    ICrudAppService<
        OrderDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateOrderDto>
{
}