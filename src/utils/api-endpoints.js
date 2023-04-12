export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URL = {
    //------------------------ Admin ----------------------//
    GET_CUSTOMERS: '/api/v1/Customer/Customers',
    GET_APPLICATIONS: '/api/v1/Customer/applications',
    GET_CUSTOMER_APPLICATIONS: '/api/v1/Customer',
    LOGIN: '/api/Login',
    REFRESH_TOKEN: '/api/refresh',
}

export const APP_API_URL = {
    //------------------------ Admin ----------------------//
    GET_CUSTOMERS: '/api/admin/customers',
    GET_APPLICATIONS: '/api/admin/applications',
    LOGIN: '/api/admin/login',
    REFRESH_TOKEN: '/api/admin/refresh-token'
}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
