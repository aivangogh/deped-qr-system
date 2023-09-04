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

export const participantRoutes = {
  participant: {
    path: '/participant',
    label: 'Participant',
  },
  participantDetails: {
    path: '/participant/details',
    label: 'Participant Details',
  },
};

export const dashboardRoutes = {
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
  },
  addTraining: {
    path: '/dashboard/add-training',
    label: 'Add Training',
  },
  settings: {
    path: '/dashboard/settings',
    label: 'Settings',
    subroutes: {
      documentTemplate: {
        path: '/dashboard/settings',
        label: 'Document Template',
      },
      excelTemplate: {
        path: '/dashboard/settings/excel',
        label: 'Excel Template',
      },
      driveFolder: {
        path: '/dashboard/settings/drive-folder',
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
