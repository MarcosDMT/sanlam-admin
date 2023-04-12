export const appName = 'Sanlam';
export const menuItems = [
    {
        name: "products",
        icon: "",
        collapse: [
            {
                name: "educare plus",
                href: "/products/educare-plus",
            },
            {
                name: "sanlam educare",
                href: "/products/sanlam-educare",
            },
            {
                name: "super endowment",
                href: "/products/super-endowment",
            },
        ],
    },
    {
        name: "about us",
        icon: "",
        href: '/',
    },
    {
        name: "help",
        icon: "",
        href: '#help',
    },
];
export const AUTH_TOKEN_KEY = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';