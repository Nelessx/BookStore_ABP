using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.OrderItems;

public class OrderItem :AuditedAggregateRoot<Guid>
{
 
    public Guid OrderId { get; set; }
    public Guid BookId { get; set; }
    public int Quantity { get; set; }
    public float Price { get; set; }

}
