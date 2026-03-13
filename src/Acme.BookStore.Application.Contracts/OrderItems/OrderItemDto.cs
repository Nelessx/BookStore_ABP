using System;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.OrderItems;

public class OrderItemDto : AuditedEntityDto<Guid>
{
    public Guid OrderId { get; set; }
    public Guid BookId { get; set; }
    public int Quantity { get; set; }
    public float Price { get; set; }
}