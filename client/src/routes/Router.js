import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout.js"));

/***** Pages ****/

const Auth = lazy(() => import("../views/Auth.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Rewards = lazy(() => import("../views/ui/Rewards.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
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
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Navigate to="/auth" />, index: true },
      { path: "auth", element: <Auth /> },
    ],
  },
  {
    path: "/starter",
    element: <FullLayout />,
    children: [
      { element: <Starter />, index: true },
      { path: "rewards", element: <Rewards /> },
      { path: "alerts", element: <Alerts /> },

      { path: "GMN", element: <GMN /> },
      { path: "cards", element: <Cards /> },
      { path: "quiz", element: <Quiz /> },
      { path: "table", element: <Table /> },
      { path: "wheel-of-fortune", element: <WoF /> },
      { path: "referrals", element: <Referrals /> },
    ],
  },
];

export default ThemeRoutes;
