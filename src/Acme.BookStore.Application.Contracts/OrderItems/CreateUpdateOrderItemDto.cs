using System;
using System.ComponentModel.DataAnnotations;

namespace Acme.BookStore.OrderItems;

public class CreateUpdateOrderItemDto
{
    [Required]
    public Guid OrderId { get; set; }

    [Required]
    public Guid BookId { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public float Price { get; set; }
}