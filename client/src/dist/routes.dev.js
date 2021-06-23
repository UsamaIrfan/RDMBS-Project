"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Toaster = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/notifications/toaster/Toaster'));
  });
});

var Tables = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/tables/Tables'));
  });
});

var Breadcrumbs = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/breadcrumbs/Breadcrumbs'));
  });
});

var Cards = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/cards/Cards'));
  });
});

var Carousels = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/carousels/Carousels'));
  });
});

var Collapses = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/collapses/Collapses'));
  });
});

var BasicForms = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/forms/BasicForms'));
  });
});

var Jumbotrons = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/jumbotrons/Jumbotrons'));
  });
});

var ListGroups = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/list-groups/ListGroups'));
  });
});

var Navbars = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/navbars/Navbars'));
  });
});

var Navs = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/navs/Navs'));
  });
});

var Paginations = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/paginations/Pagnations'));
  });
});

var Popovers = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/popovers/Popovers'));
  });
});

var ProgressBar = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/progress-bar/ProgressBar'));
  });
});

var Switches = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/switches/Switches'));
  });
});

var Tabs = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/tabs/Tabs'));
  });
});

var Tooltips = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/base/tooltips/Tooltips'));
  });
});

var BrandButtons = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/buttons/brand-buttons/BrandButtons'));
  });
});

var ButtonDropdowns = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/buttons/button-dropdowns/ButtonDropdowns'));
  });
});

var ButtonGroups = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/buttons/button-groups/ButtonGroups'));
  });
});

var Buttons = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/buttons/buttons/Buttons'));
  });
});

var Charts = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/charts/Charts'));
  });
});

var Dashboard = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/dashboard/Dashboard'));
  });
});

var CoreUIIcons = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/icons/coreui-icons/CoreUIIcons'));
  });
});

var Flags = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/icons/flags/Flags'));
  });
});

var Brands = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/icons/brands/Brands'));
  });
});

var Alerts = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/notifications/alerts/Alerts'));
  });
});

var Badges = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/notifications/badges/Badges'));
  });
});

var Modals = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/notifications/modals/Modals'));
  });
});

var Colors = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/theme/colors/Colors'));
  });
});

var Typography = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/theme/typography/Typography'));
  });
});

var Widgets = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/widgets/Widgets'));
  });
});

var Users = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/users/Users'));
  });
});

var User = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/users/User'));
  });
});

var AddProduct = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/products/AddProduct'));
  });
});

var AllProducts = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/products/AllProducts'));
  });
});

var Product = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/products/AllProducts/Product'));
  });
});

var AllCatagories = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Catagories/AllCatagories'));
  });
});

var AddCatagory = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Catagories/AddCatagories'));
  });
});

var Catagory = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./views/Catagories/AllCatagories/Catagory'));
  });
});

var routes = [{
  path: '/',
  exact: true,
  name: 'Home'
}, {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard
}, {
  path: '/theme',
  name: 'Theme',
  component: Colors,
  exact: true
}, {
  path: '/theme/colors',
  name: 'Colors',
  component: Colors
}, {
  path: '/theme/typography',
  name: 'Typography',
  component: Typography
}, {
  path: '/base',
  name: 'Base',
  component: Cards,
  exact: true
}, {
  path: '/base/breadcrumbs',
  name: 'Breadcrumbs',
  component: Breadcrumbs
}, {
  path: '/base/cards',
  name: 'Cards',
  component: Cards
}, {
  path: '/base/carousels',
  name: 'Carousel',
  component: Carousels
}, {
  path: '/base/collapses',
  name: 'Collapse',
  component: Collapses
}, {
  path: '/base/forms',
  name: 'Forms',
  component: BasicForms
}, {
  path: '/base/jumbotrons',
  name: 'Jumbotrons',
  component: Jumbotrons
}, {
  path: '/base/list-groups',
  name: 'List Groups',
  component: ListGroups
}, {
  path: '/base/navbars',
  name: 'Navbars',
  component: Navbars
}, {
  path: '/base/navs',
  name: 'Navs',
  component: Navs
}, {
  path: '/base/paginations',
  name: 'Paginations',
  component: Paginations
}, {
  path: '/base/popovers',
  name: 'Popovers',
  component: Popovers
}, {
  path: '/base/progress-bar',
  name: 'Progress Bar',
  component: ProgressBar
}, {
  path: '/base/switches',
  name: 'Switches',
  component: Switches
}, {
  path: '/base/tables',
  name: 'Tables',
  component: Tables
}, {
  path: '/base/tabs',
  name: 'Tabs',
  component: Tabs
}, {
  path: '/base/tooltips',
  name: 'Tooltips',
  component: Tooltips
}, {
  path: '/buttons',
  name: 'Buttons',
  component: Buttons,
  exact: true
}, {
  path: '/buttons/buttons',
  name: 'Buttons',
  component: Buttons
}, {
  path: '/buttons/button-dropdowns',
  name: 'Dropdowns',
  component: ButtonDropdowns
}, {
  path: '/buttons/button-groups',
  name: 'Button Groups',
  component: ButtonGroups
}, {
  path: '/buttons/brand-buttons',
  name: 'Brand Buttons',
  component: BrandButtons
}, {
  path: '/charts',
  name: 'Charts',
  component: Charts
}, {
  path: '/icons',
  exact: true,
  name: 'Icons',
  component: CoreUIIcons
}, {
  path: '/icons/coreui-icons',
  name: 'CoreUI Icons',
  component: CoreUIIcons
}, {
  path: '/icons/flags',
  name: 'Flags',
  component: Flags
}, {
  path: '/icons/brands',
  name: 'Brands',
  component: Brands
}, {
  path: '/notifications',
  name: 'Notifications',
  component: Alerts,
  exact: true
}, {
  path: '/notifications/alerts',
  name: 'Alerts',
  component: Alerts
}, {
  path: '/notifications/badges',
  name: 'Badges',
  component: Badges
}, {
  path: '/notifications/modals',
  name: 'Modals',
  component: Modals
}, {
  path: '/notifications/toaster',
  name: 'Toaster',
  component: Toaster
}, {
  path: '/widgets',
  name: 'Widgets',
  component: Widgets
}, {
  path: '/users',
  exact: true,
  name: 'Users',
  component: Users
}, {
  path: '/users/:id',
  exact: true,
  name: 'User Details',
  component: User
}, {
  path: '/products/allproducts',
  exact: true,
  name: 'All Products',
  component: AllProducts
}, {
  path: '/products/addproduct',
  exact: true,
  name: 'Add Product',
  component: AddProduct
}, {
  path: '/products/:id',
  exact: true,
  name: 'Product',
  component: Product
}, {
  path: '/catagories/addcatagory',
  exact: true,
  name: 'Add Catagory',
  component: AddCatagory
}, {
  path: '/catagories/allcatagories',
  exact: true,
  name: 'All Catagories',
  component: AllCatagories
}, {
  path: '/catagories/:id',
  exact: true,
  name: 'Catagory',
  component: Catagory
}];
var _default = routes;
exports["default"] = _default;