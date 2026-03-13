using System;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.Orders;

public class OrderDto : AuditedEntityDto<Guid>
{
    public Guid CustomerId { get; set; }

    public DateTime OrderDate { get; set; }

    public float TotalAmount { get; set; }
}