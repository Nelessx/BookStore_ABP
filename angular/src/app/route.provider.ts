import { RoutesService, eLayoutType } from '@abp/ng.core';
import { inject, provideAppInitializer } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    const routes = inject(RoutesService);

    routes.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/book-store',
        name: '::Menu:BookStore',
        iconClass: 'fas fa-book',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.Books || BookStore.Authors',
      },
      {
        path: '/books',
        name: '::Menu:Books',
        parentName: '::Menu:BookStore',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.Books',
      },
      {
        path: '/authors',
        name: '::Menu:Authors',
        parentName: '::Menu:BookStore',
        iconClass: 'fas fa-user-edit',
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.Authors',
      },
      {
        path: '/customers',
        name: '::Menu:Customers',
        parentName: '::Menu:BookStore',
        iconClass: 'fas fa-users',
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.Customers',
      },
      {
        path: '/orders',
        name: '::Menu:Orders',
        parentName: '::Menu:BookStore',
        iconClass: 'fas fa-shopping-cart',
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.Orders',
      },
      {
        path: '/order-items',
        name: '::Menu:OrderItems',
        parentName: '::Menu:BookStore',
        iconClass: 'fas fa-list',
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.OrderItems',
      },
      {
        path: '/categories',
        name: '::Menu:Categories',
        parentName: '::Menu:BookStore',
        iconClass: 'fas fa-tags',
        layout: eLayoutType.application,
        requiredPolicy: 'BookStore.Categories',
      }

    ]);
  }),
];
