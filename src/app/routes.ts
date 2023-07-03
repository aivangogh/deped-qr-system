export const routes = {
  settings: {
    path: '/settings',
    name: 'Settings',
    subroutes: {
      documentTemplate: {
        path: '/settings',
        name: 'Document Template',
      },
      excelTemplate: {
        path: '/settings/excel',
        name: 'Excel Template',
      },
    },
  },
};
