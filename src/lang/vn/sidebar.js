const sidebar = [
  {
    id: 'dashboard_sidebar',
    icon: 'fas fa-home-lg-alt',
    name: 'Dashboard',
    route: 'dashboard',
    subMenu: []
  },
  {
    id: 'user_sidebar',
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
  },
  {
    id: 'product_sidebar',
    icon: 'fas fa-boxes',
    name: 'QL Sản phẩm',
    route: '',
    subMenu: [
      {
        name: 'QL Sản phẩm',
        route: 'product.index'
      },
      {
        name: 'QL Nhóm sản phẩm',
        route: 'product.catalogue.index'
      }
    ]
  }
];
export default sidebar;
