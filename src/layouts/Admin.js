import React, { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Spinner } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Layout from "components/Navbars/Layout";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "routes.js";
import EditBtn from "components/Buttons/EditBtn";
import DeleteBtn from "components/Buttons/DeleteBtn";
import GenericBtn from "components/Buttons/GenericBtn";
import MasterLoader from "components/loader/MasterLoader";
import { setLoading } from "redux/reducers/GlobalReducer";
import { Auth } from "aws-amplify";
import { useAuth } from "hooks/useAuth";
import { getIdToken } from "config/Axios";
import { resetCategorySection } from "redux/reducers/CategoryReducer";
import Footer from "components/Footers/footer";

const Admin = ( props ) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  const { logout } = useAuth();
  const mainContent = React.useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  React.useEffect(() => {
    const session = checkSession();
    if (!session) {
      navigate("/auth/login");
    }
    if (document && mainContent.current) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
    if(!location?.pathname?.includes('/category')){
      dispatch(resetCategorySection())
    }
  }, [location]);

  React.useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  const checkSession = async () => {
    let token = null;
    try {
      token = await getIdToken();
    } catch (error) {}
    return token;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.collapse) {
          return getRoutes(prop.views);
        }
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Sidebar
            {...props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/LOGO.png"),
              imgAlt: "...",
            }}
            location={location}
            isCollapsed={isCollapsed} 
            toggleSidebar={toggleSidebar}
            // logo={{
            //   innerLink: "/admin/index",
            //   imgSrc: require("../assets/img/brand/argon-react.png"),
            //   imgAlt: "...",
            // }}
          />
          <div className="main-content" style={{marginLeft : isCollapsed? "80px": "260px"}} ref={mainContent}>
            {/* <AdminNavbar
              {...props}
              brandText={getBrandText(props?.location?.pathname)}
            /> */}
            <Layout  isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <Routes>
              {getRoutes(routes)}
              {/* <Route
                path="*"
                element={<Navigate to="/admin/index" replace />}
              /> */}
            </Routes>
            {/* <Container fluid> */}
              {/* <GenericBtn
                handleClick={() => console.log("Edit Clicked")}
                label=""
                icon={<i className="fas fa-pen"></i>}
                color="primary"
                operation="update"
              />
              <GenericBtn
                handleClick={() => console.log("Delete Clicked")}
                // label="Delete"
                icon={<i class="fas fa-trash-alt"></i>}
                color="danger"
                operation="delete"
              /> */}

              {/* <AdminFooter /> */}
              <Footer isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
              <MasterLoader />
            {/* </Container> */}
          </div>
        </>
      ) : (
        // <Navigate to="/auth/login" replace={true} />
        <>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/LOGO.png"),
            imgAlt: "...",
          }}
          location={location}
          isCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar}
          // logo={{
          //   innerLink: "/admin/index",
          //   imgSrc: require("../assets/img/brand/argon-react.png"),
          //   imgAlt: "...",
          // }}
        />
        <div className="main-content" style={{marginLeft : isCollapsed? "80px": "250px"}} ref={mainContent}>
          {/* <AdminNavbar
            {...props}
            brandText={getBrandText(props?.location?.pathname)}
          /> */}
          <Layout  isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <Routes>
            {getRoutes(routes)}
            <Route
              path="*"
              element={<Navigate to="/admin/index" replace />}
            />
          </Routes>
          {/* <Container fluid> */}
            {/* <GenericBtn
              handleClick={() => console.log("Edit Clicked")}
              label=""
              icon={<i className="fas fa-pen"></i>}
              color="primary"
              operation="update"
            />
            <GenericBtn
              handleClick={() => console.log("Delete Clicked")}
              // label="Delete"
              icon={<i class="fas fa-trash-alt"></i>}
              color="danger"
              operation="delete"
            /> */}

            {/* <AdminFooter /> */}
            <Footer isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <MasterLoader />
          {/* </Container> */}
        </div>
      </>
      )}
    </>
  );
};

export default Admin;
