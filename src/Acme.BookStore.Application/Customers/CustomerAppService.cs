using System;
using Acme.BookStore.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Customers;

[Authorize(BookStorePermissions.Customers.Default)]
public class CustomerAppService :
    CrudAppService<Customer, CustomerDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateCustomerDto>,
    ICustomerAppService
{
    public CustomerAppService(IRepository<Customer, Guid> repository)
        : base(repository)
    {
        GetPolicyName = BookStorePermissions.Customers.Default;
        GetListPolicyName = BookStorePermissions.Customers.Default;
        CreatePolicyName = BookStorePermissions.Customers.Create;
        UpdatePolicyName = BookStorePermissions.Customers.Edit;
        DeletePolicyName = BookStorePermissions.Customers.Delete;
    }
}