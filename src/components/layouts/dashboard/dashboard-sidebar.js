import {
  alpha,
  Box,
  Divider,
  Drawer,
  Icon,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Scrollbar } from "../../@mui-components/scrollbar";
import { Logo } from "../../logo";
import NextLink from "next/link";
// import {getMenuItems} from "../../../api-requests/data/menu";
import { useSelector } from "../../../store";

// const getSections = (t) => getMenuItems(t);

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const { menus } = useSelector(({ roles }) => roles);
  //const sections = useMemo(() => getSections(t), [t]);
  const sections = [{ child: menus }];

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ height: 50 }}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 20,
                    width: 20,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Divider />
        </Box>
        <Scrollbar
          sx={{
            height: "calc(100% - 50px)",
            "& .simplebar-content": {
              height: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {sections.map((section, index) => (
                <DashboardSidebarSection
                  key={index}
                  path={router.asPath}
                  sx={{
                    mt: 2,
                    "& + &": {
                      mt: 2,
                    },
                  }}
                  {...section}
                />
              ))}
            </Box>
            <Divider
              sx={{
                borderColor: "neutral.100", // dark divider
              }}
            />
          </Box>
        </Scrollbar>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            borderRightColor: "divider",
            // backgroundColor:theme => {
            //     return alpha(theme.palette.primary.main,0.2)
            // },
            boxShadow: 3,
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            // color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          //backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
