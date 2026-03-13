using System;
using Acme.BookStore.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.OrderItems;

[Authorize(BookStorePermissions.OrderItems.Default)]
public class OrderItemAppService :
    CrudAppService<
        OrderItem,
        OrderItemDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateOrderItemDto>,
    IOrderItemAppService
{
    public OrderItemAppService(IRepository<OrderItem, Guid> repository)
        : base(repository)
    {
        GetPolicyName = BookStorePermissions.OrderItems.Default;
        GetListPolicyName = BookStorePermissions.OrderItems.Default;
        CreatePolicyName = BookStorePermissions.OrderItems.Create;
        UpdatePolicyName = BookStorePermissions.OrderItems.Edit;
        DeletePolicyName = BookStorePermissions.OrderItems.Delete;
    }
}