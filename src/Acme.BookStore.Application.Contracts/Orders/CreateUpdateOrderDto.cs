using System;
using System.ComponentModel.DataAnnotations;

namespace Acme.BookStore.Orders;

public class CreateUpdateOrderDto
{
    [Required]
    public Guid CustomerId { get; set; }

    [Required]
    public DateTime OrderDate { get; set; }

    [Required]
    public float TotalAmount { get; set; }
}