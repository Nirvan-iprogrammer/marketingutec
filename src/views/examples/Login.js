// reactstrap components
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
  FormFeedback,
} from "reactstrap";
import toast from "react-hot-toast";
import { Auth } from "aws-amplify";
import { setIsAuthenticated } from "redux/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { checkUserExistRequest } from "services/axios-request-handlers";

const Login = () => {
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const keyDownHandler = (event) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       handleSubmit();
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  const handleEmailChange = (e) => {
    setError((prev) => ({ ...prev, email: "" }));
    if (e.target.value.trim()?.length > 40) {
      setError((prev) => ({
        ...prev,
        email: "Email should be less than 40 characters long",
      }));
      return;
    }
    setUsername(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setError((prev) => ({ ...prev, password: "" }));
    if (e.target.value.length > 20) {
      setError((prev) => ({
        ...prev,
        password: "Password should not be greater than 20 characters long",
      }));
      return;
    }
    setPassword(e.target.value.trim());
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Check if email and password are not empty
    if (username.trim() === "") {
      formIsValid = false;
      newErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      formIsValid = false;
      newErrors.password = "Password is required";
    }
    if (username.trim()) {
      // Email validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        formIsValid = false;
        newErrors.email = "Invalid email format";
      }
    }
    if (password.trim()) {
      // Password validation (minimum length, for example, 6 characters)
      if (password.length < 8) {
        formIsValid = false;
        newErrors.password = "Password must be at least 8 characters";
      }
    }
    setError(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      let Payload = {
        email: username,
      };
      let resp = await checkUserExistRequest(Payload);
      if (resp) {
        await login({ username, password });
      } else {
        toast?.error(
          "Sorry, we didn’t find any accounts with this email address."
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <h2 className="text-uppercase mb-4 d-flex justify-content-center">E-Catalogue</h2>
        <Card className="bg-secondary shadow border-0 ">
          <CardHeader className="bg-transparent">
            {/* <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
            <h1 className="text">Login</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    autoFocus
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={handleEmailChange}
                    invalid={error.email ? true : false}
                    value={username}
                  />
                  <FormFeedback>{error.email}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    value={password}
                    invalid={error.password ? true : false}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {showPassword ? (
                        <i
                          className="fas fa-eye-slash c-p"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <i
                          className="fas fa-eye c-p"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </InputGroupText>
                  </InputGroupAddon>
                  <FormFeedback>{error.password}</FormFeedback>
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button
                  disabled={isSubmitting}
                  className="my-4"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner size="sm">Loading...</Spinner>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            {/* <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a> */}
          </Col>
          {/* <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="/auth/register"
              // onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default Login;
