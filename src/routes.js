
import Login from "views/examples/Login.js";
import LoginSSO from "components/Welcome/LoginSSO";
import QuestionIcon from "../src/assets/img/icons/common/Content.png"
import ModulePerformanceLayout from "views/ModulePerformance/ModulePerformanceLayout";
import Layout from "components/Navbars/Layout";
import MainContent from "views/DataModule/MainContent";
import DataIcon from "../src/assets/img/icons/common/DataWhite.png"
import DataIconActive from "../src/assets/img/icons/common/data.svg"
import HomeIcon from "../src/assets/img/icons/common/HomeWhite.png"
import HomeActiveIcon from "../src/assets/img/icons/common/home.png"
import ScenarioIcon from "../src/assets/img/icons/common/carbon_text-link-analysis.png"
import ModuleIcon from "../src/assets/img/icons/common/carbon_result.png"


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
    icon: HomeIcon,
    component:<LoginSSO />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/scenario",
    name: "Scenario Performance",
    icon: ScenarioIcon,
    component: <LoginSSO />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/performance",
    name: "Module Performance",
    icon: ModuleIcon,
    component: <ModulePerformanceLayout />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/data",
    name: "Data",
    icon:DataIcon,
    component: <MainContent />,
    layout: "/admin",
    isSidebarLink: true
  },
  {
    path: "/query",
    name: "Query",
    icon: QuestionIcon,
    component: <ModulePerformanceLayout />,
    layout: "/admin",
    isSidebarLink: true
  }
];
export default routes;
