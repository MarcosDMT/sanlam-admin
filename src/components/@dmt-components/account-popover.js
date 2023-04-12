import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { Person as UserCircleIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/use-auth";
import { useRouter } from "next/router";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { logout } = useAuth();
  // To get the user from the authContext, you can use
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      onClose?.();
      await logout();
      router.push("/").catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      //PaperProps={{ sx: { width: 200 } }}
      transitionDuration={0}
      {...other}
    >
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    alignItems: "center",*/}
      {/*    p: 2,*/}
      {/*    display: "flex",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Avatar*/}
      {/*    src={user?.avatar}*/}
      {/*    sx={{*/}
      {/*      height: 40,*/}
      {/*      width: 40,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <UserCircleIcon />*/}
      {/*  </Avatar>*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      ml: 1,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography variant="body1">{user?.fullname}</Typography>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      {/*<Divider />*/}
      <Box sx={{ my: 1 }}>
        {/*<NextLink href="/dashboard/account" passHref>*/}
        {/*  <MenuItem component="a">*/}
        {/*    <ListItemIcon>*/}
        {/*      <UserCircleIcon fontSize="small" />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText*/}
        {/*      primary={<Typography variant="body2">Account</Typography>}*/}
        {/*    />*/}
        {/*  </MenuItem>*/}
        {/*</NextLink>*/}
        {/*<Divider />*/}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
