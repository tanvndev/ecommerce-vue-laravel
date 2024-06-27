const sidebar = [
  {
    icon: 'fas fa-home-lg-alt',
    name: 'Dashboard',
    route: 'dashboard',
    subMenu: []
  },
  {
    icon: 'fas fa-users-medical',
    name: 'QL Thành viên',
    route: '',
    subMenu: [
      {
        name: 'QL Thành viên',
        route: 'user.index'
      },
      {
        name: 'QL Nhóm thành viên',
        route: 'user.catalogue.index'
      }
    ]
  }
];
export default sidebar;
