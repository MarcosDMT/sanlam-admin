export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URL = {
    //------------------------ Admin ----------------------//
    GET_CUSTOMERS: '/api/v1/Customer/Customers',
    GET_APPLICATIONS: '/api/v1/Customer/applications',
    GET_CUSTOMER_APPLICATIONS: '/api/v1/Customer',
    LOGIN: '/api/adlogin',
    REFRESH_TOKEN: '/api/refresh',


     /***************** ROLES APIS **********************/
     GET_ROLES: '/api/v1/account/getroles',
     GET_ROLE: '/api/v1/account/getrole',
     ADD_ROLE: '/api/v1/account/addrole',
     GET_PERMISSIONS: '/api/v1/account/getallpermissions',
     ADD_ROLE_PERMISSION: '/api/v1/account/addrolesandpermissions',

}

export const APP_API_URL = {
    //------------------------ Admin ----------------------//
    GET_CUSTOMERS: '/api/admin/customers',
    GET_APPLICATIONS: '/api/admin/applications',
    LOGIN: '/api/admin/login',
    REFRESH_TOKEN: '/api/admin/refresh-token',


      /***************** ROLES APIS **********************/
      GET_ROLES: '/api/admin/roles',
      GET_PERMISSIONS: '/api/admin/roles/permissions',
}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
