/*eslint-disable*/
import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import LogoutSection from "./LogoutSection";
import "./Sidebar.css";
import Header from "./Header";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useAuth } from "hooks/useAuth";
import ModalWrapper from "components/Modal/ModalWrapper";
var ps;

const Sidebar = (props) => {

  const { bgColor, routes, logo, isCollapsed, toggleSidebar } = props;

  console.log("isCollapsed", isCollapsed)

  const [collapseOpen, setCollapseOpen] = useState();
  const [collapseState, setCollapseState] = useState({});
  const [logoutPopup, setLogoutPopup] = useState(false);
  const { logout } = useAuth();
  const { userDetails } = useSelector((state) => state.auth);
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  useEffect(() => {
    setCollapseState(getCollapseStates(routes));
    // eslint-disable-next-line
  }, []);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  
  // creates the links that appear in the left menu / Sidebar
  // const createLinks = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (!prop.isSidebarLink) return null;
  //     return (
  //       <NavItem key={key}>
  //         <NavLink
  //           to={prop.layout + prop.path}
  //           tag={NavLinkRRD}
  //           onClick={closeCollapse}
  //         >
  //           <i className={prop.icon} />
  //           {prop.name}
  //         </NavLink>
  //       </NavItem>
  //     );
  //   });
  // };
  const createLinks = (routes) => {

    return routes.map((prop, key) => {
      console.log("prop", prop)
      if (!prop.isSidebarLink) return null;
      if (
        prop?.name?.toLowerCase() === "user management" &&
        userDetails?.role?.role_name?.toLowerCase() !== "super admin"
      )
        return null;
      if (prop.edit) {
        return null;
      } else {
        if (prop.redirect) {
          return null;
        }
        if (prop.collapse) {
          let st = {};
          st[prop["state"]] = !collapseState[prop.state];
          return (
            <NavItem
              // className={activeRoute(prop.layout + prop.path)}
              className={`navItem ${activeRoute(prop.layout + prop.path) ? 'active' : ''}`}

            >
              <NavLink
                //  to={prop.layout + prop.path}
                //  tag={NavLinkRRD}
                style={{
                  color: activeRoute(prop.layout + prop.path) ? '#fff' : '#d0d5dd',
                  backgroundColor: activeRoute(prop.layout + prop.path) ? '#FFF200' : 'transparent',
                  listStyleType: 'none',
                  paddingLeft: 0
                }}
                href="#pablo"
                data-toggle="collapse"
                aria-expanded={collapseState[prop.state]}
                className={classnames('navlink', {
                  active: getCollapseInitialState(prop.views),
                })}
                onClick={(e) => {
                  e.preventDefault();
                  setCollapseState(st);
                }}
              >
                {prop.icon ? (
                  <>
                    <i className={prop.icon} />
                    <span className="nav-icon">{prop.icon}</span>
                    <span className="nav-link-text">{prop.name}</span>
                  </>
                ) : prop.miniName ? (
                  <>
                    <span className="sidenav-mini-icon"> {prop.miniName} </span>
                    <span className="sidenav-normal"> {prop.name} </span>
                  </>
                ) : null}
              </NavLink>
              <Collapse isOpen={collapseState[prop.state]}>
                <Nav className="nav-sm flex-column">
                  {createLinks(prop.views)}
                </Nav>
              </Collapse>
            </NavItem>
          );
        }
        return (
          <NavItem
            // style={{
            //   width: '100%',
            //   borderRadius: '8px',
            //   marginBottom: '8px',
            //   overflow: 'hidden',
            // }}
            // className={activeRoute(prop.layout + prop.path)}
            className={`navItem ${activeRoute(prop.layout + prop.path) ? 'active' : ''}`}
            key={key}
          >
            <NavLink
              className={`${activeRoute(prop.layout + prop.path)} Navlink`}
              style={{
                padding: '12px 16px',
                marginRight: "1rem",
                marginLeft: "1rem",
                display: 'flex',
                alignItems: 'center',
                listStyleType: 'none',
                gap: '12px',
                color: activeRoute(prop.layout + prop.path) ? '#000000' : '#fff',
                backgroundColor: activeRoute(prop.layout + prop.path) ? '#FFF200' : 'transparent',
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '15px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
              
              to={prop.layout + prop.path}
              // activeClassName=""
              tag={NavLinkRRD}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <span className="nav-link-text">{prop.name}</span>
                </>
              ) : prop.miniName !== undefined ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </>
              ) : (
                prop.name
              )}
            </NavLink>
          </NavItem>
        );
        // }
      }
    });
  };


  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const handleLogout = (e) => {
    e?.preventDefault();
    logout();
  };

  const handleLogoutPopup = () => {
    setLogoutPopup((prev) => !prev);
  };

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light"
      style={{ backgroundColor: "#1c1c1c", width: isCollapsed ? "80px" : "250px" }}
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        <button onClick={toggleSidebar} className="menu-button-top">
          {isCollapsed && (<img src={require("../../assets/img/icons/common/Hamburguer menu (1).png")} alt="menu" className="menu-icon-top" />)}
        </button>
        <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        {/* {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null} */}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/Frame 811779.png")}
                    style={{ width: '45px', height: "46px" }}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          {/* <hr className="my-3" /> */}
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6> */}
          {/* Navigation */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem
              style={{
                width: '100%',
                borderRadius: '8px',
                marginBottom: '8px',
                overflow: 'hidden',
              }}
            >

              <NavLink
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color:  '#d0d5dd',
                  backgroundColor:'#4F46E5' ,
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontSize: '15px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                }}
                href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
        <LogoutSection isCollapsed={isCollapsed} handleLogout={handleLogoutPopup} />
        {/* <div style={{
          marginTop: 'auto',
          padding: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#d0d5dd',
            margin: '12px 0'
          }} />
          <div style={{
            width: '100%',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}>
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z-0smuGYgKEKiATf/ic-basel.png"
              alt=""
              style={{ width: '24px', height: '24px' }}
            />
            <span style={{
                 fontFamily: 'Inter',
                 fontWeight: 500,
                 fontSize: '16px',
                 lineHeight: '24px',
                 color: '#d0d5dd',
                 display: 'block',
            }}>Log out</span>
          </div>
        </div> */}
      </Container>
      <ModalWrapper
        toggleModal={handleLogoutPopup}
        modalState={logoutPopup}
        title={"Logout confirmation"}
        submitBtn="Yes"
        cancelBtn="No"
        handleSubmit={handleLogout}
        handleCancel={handleLogoutPopup}
      >
        <Row>
          <Col lg="12">
            <div>
              <span>Are you sure you want to logout?</span>
            </div>
          </Col>
        </Row>
      </ModalWrapper>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
