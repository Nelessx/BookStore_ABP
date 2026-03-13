using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.Customers
{
    public class CustomerDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public string Number { get; set; }
    }
}
