export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URL = {
  //------------------------ Admin ----------------------//
  GET_CUSTOMERS: "/api/v1/Customer/Customers",
  GET_APPLICATIONS: "/api/v1/Customer/applications",
  GET_CUSTOMER_APPLICATIONS: "/api/v1/customer",
  GET_OTHER_DOCUMENTS: "/api/v1/customer",
  DOWNLOAD_APPLICATION: "/api/v1/customer",
  LOGIN: "/api/adlogin",
  REFRESH_TOKEN: "/api/refresh",

  /***************** ROLES APIS **********************/
  GET_ROLES: "/api/v1/account/getroles",
  GET_ROLE: "/api/v1/account/getrole",
  ADD_ROLE: "/api/v1/account/addrole",
  GET_PERMISSIONS: "/api/v1/account/getallpermissions",
  ADD_ROLE_PERMISSION: "/api/v1/account/addrolesandpermissions",

  // USERS
  CREATE_USER: "/api/v1/adminusers/createuser",
  GET_USER: "/api/v1/adminusers/getusers",

  GET_MENUS: 'api/v1/account/getmenus',

};

export const APP_API_URL = {
  //------------------------ Admin ----------------------//
  GET_CUSTOMERS: "/api/admin/customers",
  GET_APPLICATIONS: "/api/admin/applications",
  GET_OTHER_DOCUMENTS: "/api/admin/application-attachment",
  DOWNLOAD_APPLICATION: "/api/admin/application-document",
  LOGIN: "/api/admin/login",
  REFRESH_TOKEN: "/api/admin/refresh-token",

  /***************** ROLES APIS **********************/
  GET_ROLES: "/api/admin/roles",
  GET_PERMISSIONS: "/api/admin/roles/permissions",
  GET_MENUS: '/api/admin/menus',


  /***************** USERS **********************/
  ADD_USER: "/api/admin/users",
  GET_USER: "/api/admin/users/getusers",
};

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
