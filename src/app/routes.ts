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

export const dashboardNavRoutes = [
  {
    href: '/dashboard/trainings',
    label: 'Trainings',
  },
  {
    href: '/dashboard/budget-allocation',
    label: 'Budget Allocation',
  },
];

export const dashboardRoutes = {
  dashboard: {
    path: '/dashboard/trainings',
    label: 'Trainings',
  },
  budgetAllocation: {
    path: '/dashboard/budget-allocation',
    label: 'Budget Allocation',
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
  singOut: {
    path: '/sign-out',
    label: 'Sign Out',
  },
  error: {
    path: '/error',
    label: 'Error',
  },
};
