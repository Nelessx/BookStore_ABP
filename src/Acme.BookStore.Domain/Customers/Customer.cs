using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.Customers;

public class Customer : AuditedAggregateRoot<Guid>
{
    public string Name { get; set; }

    public string Number { get; set; }

}
