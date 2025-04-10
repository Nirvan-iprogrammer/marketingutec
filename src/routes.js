
import Login from "views/examples/Login.js";
import LoginSSO from "components/Welcome/LoginSSO";
import QuestionIcon from "../src/assets/img/icons/common/Content.png"
import ModulePerformanceLayout from "views/ModulePerformance/ModulePerformanceLayout";
import Layout from "components/Navbars/Layout";
import MainContent from "views/DataModule/MainContent";
import DataIcon from "../src/assets/img/icons/common/data.svg"

var routes = [
  //  {
  //   collapse: true,
  //   isSidebarLink: true,
  //   name: "User management",
  //   icon: "fas fa-users text-default",
  //   state: "userManagerCollapse",
  //   layout: "/admin",
  //   views: [
  //     {
  //       path: "/users",
  //       name: "Users",
  //       component: (
  //         <RBAC roles={[USER_ROLES.SUPER_ADMIN]}>
  //           <UsersList />
  //         </RBAC>
  //       ),
  //       layout: "/admin",
  //       isSidebarLink: true,
  //     }
  //   ],
  // } 
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    layout: "/auth",
    isSidebarLink: false,
  },
  {
    path: "/home",
    name: "Home",
    icon: "fa-solid fa-house",
    component:<LoginSSO />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/scenario",
    name: "Scenario Performance",
    icon: "ni ni-single-02",
    component: <LoginSSO />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/performance",
    name: "Module Performance",
    icon: "fa-solid fa-clipboard-list",
    component: <ModulePerformanceLayout />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/data",
    name: "Data",
    icon: "fa-solid fa-share-nodes",
    component: <MainContent />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/query",
    name: "Query",
    icon: "fa-solid fa-question",
    component: <ModulePerformanceLayout />,
    layout: "/admin",
    isSidebarLink: true
  }
];
export default routes;
