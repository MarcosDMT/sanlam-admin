import { Box, Button, Collapse, ListItem } from "@mui/material";

import NextLink from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";
import {alpha} from "@mui/material/styles";
import {ChevronRight, ExpandMore} from "@mui/icons-material";
import MKButton from "../../@mui-components/button";

export const DashboardSidebarItem = (props) => {
    const {
        active,
        children,
        chip,
        depth,
        icon,
        info,
        open: openProp,
        path,
        title,
        ...other
    } = props;
    const [open, setOpen] = useState(!!openProp);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    let paddingLeft = 24;

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth;
    }

    // Branch
    if (children) {
        return (
            <ListItem
                disableGutters
                sx={{
                    display: "block",
                    mb: 0.5,
                    py: 0,
                    px: 2,
                }}
                {...other}
            >
                <MKButton
                    endIcon={
                        !open ? (
                            <ChevronRight fontSize="small" />
                        ) : (
                            <ExpandMore fontSize="small" />
                        )
                    }
                    //disableRipple
                    onClick={handleToggle}
                    startIcon={icon}
                    sx={{
                        backgroundColor: active ? "primary.main":"inherit",
                        //   backgroundColor: theme => {
                        //       return active ? alpha(theme.palette.primary.main,0.5) : "inherit"
                        //   },
                        color: active ? "primary.contrastText" : "neutral.500",
                        justifyContent: "flex-start",
                        pl: `${paddingLeft}px`,
                        pr: 3,
                        textAlign: "left",
                        textTransform: "none",
                        width: "100%",
                        "&:hover": {
                            backgroundColor: active ? "primary.main":"neutral.100",
                        },
                        "& .MuiButton-startIcon": {
                            color: active ? "primary.contrastText" : "neutral.500",
                        },
                        "& .MuiButton-endIcon": {
                            color: active ? "primary.contrastText" : "neutral.500",
                        },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                    {info}
                </MKButton>
                <Collapse in={open} sx={{ mt: 0.5 }}>
                    {children}
                </Collapse>
            </ListItem>
        );
    }

    // Leaf
    return (
        <ListItem
            disableGutters
            sx={{
                display: "flex",
                mb: 0.5,
                py: 0,
                px: 2,
            }}
        >
            <NextLink href={path} passHref>
                <MKButton
                    component="a"
                    startIcon={icon}
                    endIcon={chip}
                    //disableRipple
                    sx={{
                        borderRadius: 1,
                       //color: "light.main",
                        justifyContent: "flex-start",
                        pl: `${paddingLeft}px`,
                        pr: 3,
                        textAlign: "left",
                        textTransform: "none",
                        width: "100%",
                        ...(active && {
                            //backgroundColor: "neutral.200",
                            backgroundColor: theme => {
                                return alpha(theme.palette.primary.main,1)
                            },
                            color:  "light.main",
                            fontWeight: "fontWeightBold",
                        }),
                        "& .MuiButton-startIcon": {
                            color: active? "light.main" : "inherit",
                        },
                        "&:hover": {
                            color: active ? "light.main" : "primary.main",
                            backgroundColor: active ? "primary.main":"grey.200",
                        },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                    {info}
                </MKButton>
            </NextLink>
        </ListItem>
    );
};

DashboardSidebarItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    depth: PropTypes.number.isRequired,
    icon: PropTypes.node,
    info: PropTypes.node,
    open: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string.isRequired,
};

DashboardSidebarItem.defaultProps = {
    active: false,
    open: false,
};
