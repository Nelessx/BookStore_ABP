using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.Categories;

public class Category : AuditedAggregateRoot<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
}
