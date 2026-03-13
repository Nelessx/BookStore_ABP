using Acme.BookStore.Authors;
using Acme.BookStore.Books;
using Acme.BookStore.Categories;
using Acme.BookStore.Customers;
using Acme.BookStore.OrderItems;
using Acme.BookStore.Orders;
using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace Acme.BookStore;

/*
 * You can add your own mappings here.
 * [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
 * public partial class BookStoreApplicationMappers : MapperBase<BookDto, CreateUpdateBookDto>
 * {
 *    public override partial CreateUpdateBookDto Map(BookDto source);
 * 
 *    public override partial void Map(BookDto source, CreateUpdateBookDto destination);
 * }
 */

[Mapper]
public partial class BookToBookDtoMapper : MapperBase<Book, BookDto>
{
    public override partial BookDto Map(Book source);

    public override partial void Map(Book source, BookDto destination);
}

[Mapper]
public partial class CreateUpdateBookDtoToBookMapper : MapperBase<CreateUpdateBookDto, Book>
{
    public override partial Book Map(CreateUpdateBookDto source);

    public override partial void Map(CreateUpdateBookDto source, Book destination);
}

[Mapper]
public partial class AuthorToAuthorDtoMapper : MapperBase<Author, AuthorDto>
{
    public override partial AuthorDto Map(Author source);

    public override partial void Map(Author source, AuthorDto destination);
}

[Mapper]
public partial class AuthorToAuthorLookupDtoMapper : MapperBase<Author, AuthorLookupDto>
{
    public override partial AuthorLookupDto Map(Author source);

    public override partial void Map(Author source, AuthorLookupDto destination);
}

[Mapper]
public partial class CustomerToCustomerDtoMapper : MapperBase<Customer, CustomerDto>
{
    public override partial CustomerDto Map(Customer source);

    public override partial void Map(Customer source, CustomerDto destination); 
}

[Mapper]
public partial class CreateUpdateCustomerDtoToCustomerMapper : MapperBase<CreateUpdateCustomerDto, Customer>
{
    public override partial Customer Map(CreateUpdateCustomerDto source);

    public override partial void Map(CreateUpdateCustomerDto source, Customer destination);
}


[Mapper]
public partial class OrderToOrderDtoMapper : MapperBase<Order, OrderDto>
{
    public override partial OrderDto Map(Order source);

    public override partial void Map(Order source, OrderDto destination);
}

[Mapper]
public partial class CreateUpdateOrderDtoToOrderMapper : MapperBase<CreateUpdateOrderDto, Order>
{
    public override partial Order Map(CreateUpdateOrderDto source);

    public override partial void Map(CreateUpdateOrderDto source, Order destination);
}

[Mapper]
public partial class OrderItemToOrderItemDtoMapper : MapperBase<OrderItem, OrderItemDto>
{
    public override partial OrderItemDto Map(OrderItem source);

    public override partial void Map(OrderItem source, OrderItemDto destination);
}

[Mapper]
public partial class CreateUpdateOrderItemDtoToOrderItemMapper : MapperBase<CreateUpdateOrderItemDto, OrderItem>
{
    public override partial OrderItem Map(CreateUpdateOrderItemDto source);

    public override partial void Map(CreateUpdateOrderItemDto source, OrderItem destination);
}

[Mapper]
public partial class CategoryToCategoryDtoMapper : MapperBase<Category, CategoryDto>
{
    public override partial CategoryDto Map(Category source);

    public override partial void Map(Category source, CategoryDto destination);
}

[Mapper]
public partial class CreateUpdateCategoryDtoToCategoryMapper : MapperBase<CreateUpdateCategoryDto, Category>
{
    public override partial Category Map(CreateUpdateCategoryDto source);

    public override partial void Map(CreateUpdateCategoryDto source, Category destination);
}