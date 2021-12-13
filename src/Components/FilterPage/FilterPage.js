import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import DescriptionIcon from "@material-ui/icons/Description";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import { NavLink } from "react-router-dom";
import "./FilterPage.css";

const filterOptions = [
  { name: "all", path: "/", icon: <DynamicFeedIcon /> },
  { name: "hot", path: "/filter/hot", icon: <WhatshotIcon /> },
  { name: "new", path: "/filter/new", icon: <DescriptionIcon /> },
  { name: "rising", path: "/filter/rising", icon: <TrendingUpIcon /> },
  { name: "top", path: "/filter/top", icon: <EqualizerIcon /> },
];
const theme = createTheme();

const styles = makeStyles((theme) => ({
  listItem: {
    fontWeight: 500,
    "&:hover": {
      background: "none",
      "& .MuiTypography-root": {
        color: theme.palette.warning.main,
      },
      "& .MuiListItemIcon-root > svg": {
        color: theme.palette.warning.main,
      },
    },
  },
  activeLink: {
    textDecoration: "none",
    "& .MuiListItem-root": {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      color: "white",
      "& .MuiTypography-root": {
        color: "white",
      },
      "& .MuiListItemIcon-root > svg": {
        color: "white",
      },
    },
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
}));
const FilterSide = () => {
  const classes = styles();

  return (
    <div style={{ textTransform: "uppercase", maxWidth: "100%" }}>
      {filterOptions.map((data, index) => {
        return (
          <NavLink
            className={(isActive) =>
              isActive.isActive ? classes.activeLink : classes.link
            }
            to={data.path}
            key={data.name}
          >
            <ListItem
              key={index}
              style={{ maxWidth: "100%", padding: "5px 0" }}
            >
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText style={{ maxWidth: "100%" }}>
                {data.name}
              </ListItemText>
            </ListItem>
          </NavLink>
        );
      })}
    </div>
  );
};
export default FilterSide;
