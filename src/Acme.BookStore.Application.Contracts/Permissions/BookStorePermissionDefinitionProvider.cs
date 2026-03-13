using Acme.BookStore.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace Acme.BookStore.Permissions;

public class BookStorePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)// this is where all premissions are registered.
    {
        var bookStoreGroup = context.AddGroup(BookStorePermissions.GroupName, L("Permission:BookStore"));

        //Dashboard permissions
        bookStoreGroup.AddPermission(BookStorePermissions.Dashboard.Host, L("Permission:Dashboard"), MultiTenancySides.Host);
        bookStoreGroup.AddPermission(BookStorePermissions.Dashboard.Tenant, L("Permission:Dashboard"), MultiTenancySides.Tenant);

        //Books permissions
        var booksPermission = bookStoreGroup.AddPermission(BookStorePermissions.Books.Default, L("Permission:Books"));
        booksPermission.AddChild(BookStorePermissions.Books.Create, L("Permission:Books.Create"));
        booksPermission.AddChild(BookStorePermissions.Books.Edit, L("Permission:Books.Edit"));
        booksPermission.AddChild(BookStorePermissions.Books.Delete, L("Permission:Books.Delete"));

        //Authors permissions
        var authorsPermission = bookStoreGroup.AddPermission(
    BookStorePermissions.Authors.Default, L("Permission:Authors"));
        authorsPermission.AddChild(
            BookStorePermissions.Authors.Create, L("Permission:Authors.Create"));
        authorsPermission.AddChild(
            BookStorePermissions.Authors.Edit, L("Permission:Authors.Edit"));
        authorsPermission.AddChild(
            BookStorePermissions.Authors.Delete, L("Permission:Authors.Delete"));

        //Customers permissions
        var customersPermission = bookStoreGroup.AddPermission(
    BookStorePermissions.Customers.Default,
    L("Permission:Customers")
);

        customersPermission.AddChild(
            BookStorePermissions.Customers.Create,
            L("Permission:Customers.Create")
        );

        customersPermission.AddChild(
            BookStorePermissions.Customers.Edit,
            L("Permission:Customers.Edit")
        );

        customersPermission.AddChild(
            BookStorePermissions.Customers.Delete,
            L("Permission:Customers.Delete")
        );

        var ordersPermission = bookStoreGroup.AddPermission(
    BookStorePermissions.Orders.Default,
    L("Permission:Orders")
);

        ordersPermission.AddChild(
            BookStorePermissions.Orders.Create,
            L("Permission:Orders.Create")
        );

        ordersPermission.AddChild(
            BookStorePermissions.Orders.Edit,
            L("Permission:Orders.Edit")
        );

        ordersPermission.AddChild(
            BookStorePermissions.Orders.Delete,
            L("Permission:Orders.Delete")
        );


        var orderItemsPermission = bookStoreGroup.AddPermission(
    BookStorePermissions.OrderItems.Default,
    L("Permission:OrderItems")
);

        orderItemsPermission.AddChild(
            BookStorePermissions.OrderItems.Create,
            L("Permission:OrderItems.Create")
        );

        orderItemsPermission.AddChild(
            BookStorePermissions.OrderItems.Edit,
            L("Permission:OrderItems.Edit")
        );

        orderItemsPermission.AddChild(
            BookStorePermissions.OrderItems.Delete,
            L("Permission:OrderItems.Delete")
        );

           var categoriesPermission = bookStoreGroup.AddPermission(
    BookStorePermissions.Categories.Default,
    L("Permission:Categories")
);
        categoriesPermission.AddChild(
            BookStorePermissions.Categories.Create,
            L("Permission:Categories.Create")
        );

        categoriesPermission.AddChild(
            BookStorePermissions.Categories.Edit,
            L("Permission:Categories.Edit")
        );

        categoriesPermission.AddChild(
            BookStorePermissions.Categories.Delete,
            L("Permission:Categories.Delete")
        );


    }






    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<BookStoreResource>(name);
    }
}
