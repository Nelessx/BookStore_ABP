using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.BookStore.Categories;

public interface ICategoryAppService :
    ICrudAppService<
        CategoryDto,                    // Used to show categories
        Guid,                           // Primary key of Category
        PagedAndSortedResultRequestDto, // Paging and sorting
        CreateUpdateCategoryDto>        // Used to create/update
{
}
