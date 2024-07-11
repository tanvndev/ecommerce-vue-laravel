const sidebar = [
  {
    icon: 'ti-home',
    name: 'Dashboard',
    route: 'dashboard',
    subMenu: []
  },
  {
    icon: 'ti-harddrives',
    name: 'Member Management',
    route: '',
    subMenu: [
      {
        name: 'Member Management',
        route: 'user.index'
      },
      {
        name: 'Managing member group',
        route: 'user.index'
      }
    ]
  }
];
export default sidebar;
