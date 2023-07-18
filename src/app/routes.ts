export const navRoutes = {
  home: {
    path: '/',
    label: 'Home',
  },
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
  },
  participant: {
    path: '/participant',
    label: 'Participant',
  },
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
      driveFolder: {
        path: '/settings/drive-folder',
        name: 'Drive Folder',
      },
    },
  },
};

export const authRoutes = {
  signIn: {
    path: '/sign-in',
    label: 'Sign In',
  },
  signUp: {
    path: '/sign-up',
    label: 'Sign Up',
  },
};
