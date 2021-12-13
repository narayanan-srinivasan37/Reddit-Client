import React from "react";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom'
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./RedirectPage.css";
const RedirectPage = () => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIosIcon />}>
          HomePage
        </Button>
      </div>
    </div>
  );
};

export default RedirectPage;
