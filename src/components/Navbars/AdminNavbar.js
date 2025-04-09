import { Link, useLocation } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Row,
  Col,
} from "reactstrap";
import { setIsAuthenticated } from "redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import ModalWrapper from "components/Modal/ModalWrapper";
import { getThumbnailImgPath } from "utils/commonFunctions";
import { getImagePath } from "utils/commonFunctions";
const AdminNavbar = (props) => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState("");
  const [logoutPopup, setLogoutPopup] = useState(false);

  useEffect(() => {
    getCuurentUser();
  }, []);

  const getCuurentUser = async (user) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        setCurrentUser(currentUser?.attributes?.email);
      }
    } catch (error) {}
  };

  const handleLogout = (e) => {
    e?.preventDefault();
    logout();
  };

  const handleLogoutPopup = () => {
    setLogoutPopup((prev) => !prev);
  };
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            <h2>E-Catalogue</h2>
            {/* {location?.pathname?.includes('/index') ? <h2>E-Catalogue</h2> : ''} */}
            {/* {props.brandText} */}
          </Link>
          
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {userDetails?.profile_pic ? (
                      <img
                        alt="Profile Photo"
                        src={getImagePath(userDetails.profile_pic)}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        alt="..."
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    )}
                  </span>
                  {/* <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {currentUser}
                    </span>
                  </Media> */}
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">{userDetails?.name}</h6>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
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
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={handleLogoutPopup}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
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
    </>
  );
};

export default AdminNavbar;
