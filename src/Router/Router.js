import React, { lazy } from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import SubRedditPage from "../Pages/SubRedditPage/SubRedditPage";
import RedirectPage from "../Pages/RedirectPage/RedirectPage";
import UserPage from "../Pages/UserPage/UserPage";
import ScrollToTop from "../Helper/ScrollToTop";
import SkeletonElement from "../Components/SkeletonFolder/Layouts/Skeleton";

const HomePage = lazy(() => import("../Pages/HomePage/HomePage"));
const CommentsPage = lazy(() => import("../Pages/CommentsPage/CommentsPage"));

const PageRoutes = () => {
  return (
    <React.Suspense fallback={<SkeletonElement />}>
      <Router>
        <ScrollToTop>
          <Routes>
 <Route path='*'  element={<RedirectPage />} />
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
           
          </Routes>
        </ScrollToTop>
      </Router>
    </React.Suspense>
  );
};
export default PageRoutes;
