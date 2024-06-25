const sidebar = [
  {
    icon: 'ti-home',
    name: 'Dashboard',
    route: 'dashboard',
    subMenu: []
  },
  {
    icon: 'ti-harddrives',
    name: 'QL Thành viên',
    route: '',
    subMenu: [
      {
        name: 'QL Thành viên',
        route: 'user.index'
      },
      {
        name: 'QL Nhóm thành viên',
        route: 'user.index'
      }
    ]
  }
];
export default sidebar;
