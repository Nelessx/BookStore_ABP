import { authGuard, permissionGuard } from '@abp/ng.core';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(c => c.createRoutes()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(c => c.createRoutes()),
  },
  {
    path: 'tenant-management',
    loadChildren: () => import('@abp/ng.tenant-management').then(c => c.createRoutes()),
  },
  {
    path: 'setting-management',
    loadChildren: () => import('@abp/ng.setting-management').then(c => c.createRoutes()),
  },
  // ADD THIS NEW ROUTE FOR BOOKS
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then(m => m.BookModule)
  },
  //route for authors
  {
    path: 'authors',
    loadChildren: () => import('./author/author.module').then(m => m.AuthorModule)
  },

  //route for customers
  {
    path: 'customers',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },

  //route for orders
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },

  //route for order items
{
  path: 'order-items',
  loadChildren: () => import('./order-item/order-item.module').then(m => m.OrderItemModule)
},

//route for categories
{
  path: 'categories',
  loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
}



];
