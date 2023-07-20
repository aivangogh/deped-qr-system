import AddTraining from './dashboard/add-training/page';
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
};

export const dashboardRoutes = {
  addTraining: {
    path: '/dashboard/add-training',
    label: 'Add Training',
  },
  settings: {
    path: '/settings',
    label: 'Settings',
    subroutes: {
      documentTemplate: {
        path: '/settings',
        label: 'Document Template',
      },
      excelTemplate: {
        path: '/settings/excel',
        label: 'Excel Template',
      },
      driveFolder: {
        path: '/settings/drive-folder',
        label: 'Drive Folder',
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
