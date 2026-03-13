using System;
using Acme.BookStore.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Orders;

[Authorize(BookStorePermissions.Orders.Default)]
public class OrderAppService :
    CrudAppService<
        Order,
        OrderDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateOrderDto>,
    IOrderAppService
{
    public OrderAppService(IRepository<Order, Guid> repository)
        : base(repository)
    {
        GetPolicyName = BookStorePermissions.Orders.Default;
        GetListPolicyName = BookStorePermissions.Orders.Default;
        CreatePolicyName = BookStorePermissions.Orders.Create;
        UpdatePolicyName = BookStorePermissions.Orders.Edit;
        DeletePolicyName = BookStorePermissions.Orders.Delete;
    }
}