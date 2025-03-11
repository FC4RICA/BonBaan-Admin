import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ServicesPage from "../pages/ServicesPage";
import InsertServicePage from "../pages/InsertServicePage";
import ServicesCategoriesPage from "../pages/ServicesCategoriesPage";
import ServicesReviewsPage from "../pages/ServicesReviewsPage";
import OrdersPage from "../pages/OrdersPage";
import InboxPage from "../pages/InboxPage";
import ChatsPage from "../pages/ChatsPage";
import UsersPage from "../pages/UsersPage";
import LogoutPage from "../pages/LogoutPage";
import EditServicePage from "../pages/EditServicePage";
import { OrderID, ServiceID } from "./param-ids";
import { serviceAction, serviceLoader } from "../routes/editServiceRoute";
import OrderPage from "../pages/OrderPage";
import { loginAction, loginLoader } from "../routes/loginRoute";
import { categoriesAction, categoriesLoader } from "../routes/categoriesRoute";
import { usersLoader } from "../routes/usersRoute";
import { insertServiceAction, insertSrviceLoader } from "../routes/insertServiceRoute";
import { ordersAction, ordersLoader } from "../routes/OrdersRoute";
import { servicesAction, servicesLoader } from "../routes/servicesRoute";
import ErrorPage from "../pages/ErrorPage";
import { inboxAction, inboxLoader } from "../routes/inboxRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: loginAction,
    loader: loginLoader,
    errorElement: <ErrorPage />
  },
  {
    path: "/logout",
    element: <LogoutPage />
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
            handle: {
              crumb: () => "หน้าหลัก",
            },
          },
          {
            path: "/inbox",
            element: <InboxPage />,
            loader: inboxLoader,
            action: inboxAction,
            handle: {
              crumb: () => "คำขอ",
            },
          },
          {
            path: "/orders",
            handle: {
              crumb: () => "คำสั่งซื้อ",
            },
            children: [
              {
                index: true,
                loader: ordersLoader,
                action: ordersAction,
                element: <OrdersPage />
              },
              {
                path: "/orders/:id",
                element: <OrderPage />,
                handle: {
                  crumb: () => <OrderID />
                }
              }
            ]
          },
          {
            path: "/services",
            handle: {
              crumb: () => "บริการ",
            },
            children: [
              {
                index: true,
                element: <ServicesPage />,
                loader: servicesLoader,
                action: servicesAction
              },
              {
                path: "/services/:id",
                element: <EditServicePage />,
                loader: serviceLoader,
                action: serviceAction,
                handle: {
                  crumb: () => <ServiceID />,
                },
              },
              {
                path: "/services/insert",
                element: <InsertServicePage />,
                loader: insertSrviceLoader,
                action: insertServiceAction,
                handle: {
                  crumb: () => "สร้างบริการใหม่",
                },
              },
              {
                path: "/services/categories",
                element: <ServicesCategoriesPage />,
                loader: categoriesLoader,
                action: categoriesAction,
                handle: {
                  crumb: () => "หมวดหมู่",
                },
              },
              {
                path: "/services/reviews",
                element: <ServicesReviewsPage />,
                handle: {
                  crumb: () => "รีวิว",
                },
              },
            ],
          },
          {
            path: "/chat",
            element: <ChatsPage />,
            handle: {
              crumb: () => "พูดคุย",
            },
          },
          {
            path: "/users",
            element: <UsersPage />,
            loader: usersLoader,
            handle: {
              crumb: () => "ผู้ใช้",
            },
          },
        ],
      },
    ],
  },
]);

export default router;
