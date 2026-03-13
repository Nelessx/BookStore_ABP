using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Acme.BookStore.Customers
{
    public class CreateUpdateCustomerDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "Number must contain only digits")]
        public string Number { get; set; }
    }
}
