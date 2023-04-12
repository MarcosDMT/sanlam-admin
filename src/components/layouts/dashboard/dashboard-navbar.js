import {
    AppBar,
    Avatar,
    Box,
    ButtonBase,
    IconButton,
    Toolbar, Typography,
} from "@mui/material";
import { useRef, useState } from "react";


import { Menu as MenuIcon, Person as UserCircleIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import {useAuth} from "../../../hooks/use-auth";
import {LanguagePopover} from "../../@dmt-components/language-popover";
import {AccountPopover} from "../../@dmt-components/account-popover";

const languages = {
    en: "/static/icons/uk_flag.svg",
    de: "/static/icons/de_flag.svg",
    es: "/static/icons/es_flag.svg",
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    //backgroundColor: theme.palette.primary.main,
    ...(theme.palette.mode === "light"
        ? {
            boxShadow: theme.shadows[3],
        }
        : {
            backgroundColor: theme.palette.background.paper,
            borderBottomColor: theme.palette.divider,
            borderBottomStyle: "solid",
            borderBottomWidth: 1,
            boxShadow: "none",
        }),
}));

const LanguageButton = () => {
    const anchorRef = useRef(null);
    const { i18n } = useTranslation();
    const [openPopover, setOpenPopover] = useState(false);

    const handleOpenPopover = () => {
        setOpenPopover(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
    };

    return (
        <>
            <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        height: 20,
                        width: 20,
                        "& img": {
                            width: "100%",
                        },
                    }}
                >
                    <img alt="" src={languages[i18n.language]} />
                </Box>
            </IconButton>
            <LanguagePopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};

const AccountButton = () => {
    const anchorRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);
    // To get the user from the authContext, you can use
    const { user } = useAuth();

    const handleOpenPopover = () => {
        setOpenPopover(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
    };

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: 2,
                }}
            >
                <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                    src={user?.avatar}
                >
                    <UserCircleIcon />
                </Avatar>
                <Typography sx={{ ml: 1, fontSize:'14px'}} variant={'body1'} color="neutral.500">{user?.userName}</Typography>
            </Box>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};

export const DashboardNavbar = (props) => {
    const { onOpenSidebar, ...other } = props;

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280,
                    },
                    width: {
                        lg: "calc(100% - 280px)",
                    },
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{
                            display: {
                                xs: "inline-flex",
                                lg: "none",
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    {/*<LanguageButton />*/}
                    <AccountButton />
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func,
};
