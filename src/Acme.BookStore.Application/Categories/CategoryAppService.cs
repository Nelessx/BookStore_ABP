using System;
using Acme.BookStore.Permissions;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore.Categories;

[Authorize(BookStorePermissions.Categories.Default)]
public class CategoryAppService :
    CrudAppService<
        Category,
        CategoryDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateCategoryDto>,
    ICategoryAppService
{
    public CategoryAppService(IRepository<Category, Guid> repository)
        : base(repository)
    {
        GetPolicyName = BookStorePermissions.Categories.Default;
        GetListPolicyName = BookStorePermissions.Categories.Default;
        CreatePolicyName = BookStorePermissions.Categories.Create;
        UpdatePolicyName = BookStorePermissions.Categories.Edit;
        DeletePolicyName = BookStorePermissions.Categories.Delete;
    }
}