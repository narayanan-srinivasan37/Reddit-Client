import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import CommentsPage from "../Pages/CommentsPage/CommentsPage";
import SubRedditPage from "../Pages/SubRedditPage/SubRedditPage";
import RedirectPage from "../Pages/RedirectPage/RedirectPage";
import UserPage from "../Pages/UserPage/UserPage";
import ScrollToTop from "../Helper/ScrollToTop";
const PageRoutes = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route
            path="/:subreddit/comments/:id"
            exact
            element={<CommentsPage />}
          />
          <Route path="/filter/:filtertype" exact element={<HomePage />} />
          <Route
            path="/subreddit/:subreddittype"
            exact
            element={<SubRedditPage />}
          />
          <Route path="/user/:username" exact element={<UserPage />} />
          <Route path="*" element={<RedirectPage />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};
export default PageRoutes;
