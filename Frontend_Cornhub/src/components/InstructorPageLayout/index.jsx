import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";

import Profilemenu from "../Navbar/components/Profilemenu";
import Logo from "../Logo";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function InstructorPageLayout(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (route) => {
    handleDrawerClose();
    if (route){
      navigate(route);
    }
  };

  const menu = [
    {
      icon: OndemandVideoIcon,
      label: "Courses",
      route: "/instructor/courses",
    },
    {
      icon: SettingsIcon,
      label: "Settings",
      route: "/instructor/settings",
    },
    {
      icon: PeopleOutlinedIcon,
      label: "Instructors",
      route: "/instructor/team",
    },
  ];

  return (
    <div className="flex">
      <CssBaseline />
      <AppBar open={open} position="fixed" color="">
        <Toolbar className="lg:px-20">
          <Logo variant="header" />
          <div className="flex items-center gap-8 ml-auto">
            <Link to="/">Learner</Link>
            <Profilemenu />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader />
        <Divider />
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => handleMenuClick(item.route)}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <div className="flex-grow p-6">
        <DrawerHeader />
        <Outlet />
      </div>
    </div>
  );
}