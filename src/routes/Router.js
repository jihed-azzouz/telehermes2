import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Auth = lazy(() => import("../views/Auth.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Rewards = lazy(() => import("../views/ui/Rewards.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const GMN = lazy(() => import("../views/ui/GMN.js"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Quiz = lazy(() => import("../views/ui/Quiz.js"));
const Table = lazy(() => import("../views/ui/Tables.js"));
const WoF = lazy(() => import("../views/ui/WoF.js"));
const Referrals = lazy(() => import("../views/ui/Referrals.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/auth" /> },
      { path: "/auth", exact: true, element: <Auth /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/rewards", exact: true, element: <Rewards /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/GMN", exact: true, element: <GMN /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/quiz", exact: true, element: <Quiz /> },
      { path: "/table", exact: true, element: <Table /> },
      { path: "/wheel-of-fortune", exact: true, element: <WoF /> },
      { path: "/referrals", exact: true, element: <Referrals /> },
    ],
  },
];

export default ThemeRoutes;
