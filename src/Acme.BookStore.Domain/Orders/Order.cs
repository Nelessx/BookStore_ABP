using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.Orders;

public class Order : AuditedAggregateRoot<Guid>
{
    public Guid CustomerId { get; set; }

    public DateTime OrderDate { get; set; }

    public float TotalAmount { get; set; }
}