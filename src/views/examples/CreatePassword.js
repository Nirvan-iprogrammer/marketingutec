// reactstrap components
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
} from "reactstrap";
import toast from "react-hot-toast";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { POST } from "../../services/axios-request-handlers";
import { ENDPOINT } from "../../config/api-endpoints";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewPassword = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.cognitoUser);
  const [signUpData, setSignUpData] = useState({
    newPassword: "",
    reEnteredPassword: "",
  });

  const [errors, setErrors] = useState(null)
  const handleChange = (e) => {
    setErrors((prev)=>({
      ...prev,
      [e.target.name] : '',
    }))
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCognitoSignUp = async () => {
    try {
      const { name, password, email, phone_number } = signUpData;
      const { isSignUpComplete, userId, nextStep } = await Auth.signUp({
        name,
        password,
        options: {
          userAttributes: {
            email,
            phone_number, // E.164 number convention
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      console.log(userId);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };
  const validatePassword  = (value) =>{
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).*$/;
    if(passwordRegex.test(value)){
      return true
    }else{
      return false
    }
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!signUpData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    }
    if (!signUpData.reEnteredPassword.trim()) {
      newErrors.reEnteredPassword = "Re-enter new password is required";
      isValid = false;
    }
    if (
      signUpData.newPassword.trim() &&
      !validatePassword(signUpData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must have a combination of at least 1 upper case, 1 lower case, 1 number and 1 symbol";
      isValid = false;
    }
    if (
      signUpData.newPassword.trim() && signUpData.newPassword.length < 8
    ) {
      newErrors.newPassword =
        "Password must have at least 8 characters";
      isValid = false;
    }
    if (
      signUpData.newPassword.trim() && signUpData.newPassword.length > 20
    ) {
      newErrors.newPassword =
        "Password should not be greater than 20 characters long";
      isValid = false;
    }
    if (
      validatePassword(signUpData.newPassword) &&
      signUpData.reEnteredPassword.trim() &&
      signUpData.newPassword !== signUpData?.reEnteredPassword
    ) {
      newErrors.reEnteredPassword =
        "New password and re- entered password must be same";
      isValid = false;
    }
    setErrors({
      ...errors,
      ...newErrors,
    });

    return isValid;
  };

  const handleCreatePassword = async () => {
    if(!validateForm()){
      return
    }
    Auth.completeNewPassword(
      user ,// the Cognito User Object
      signUpData?.newPassword
    ).then((res) => {
      if (res) {
        toast.success("Password reset successfully")
        navigate("/");
      }
    });
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <h1 className="text">New Password</h1>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter new password"
                    type="password"
                    autoComplete="new-password"
                    name="newPassword"
                    value={signUpData.newPassword}
                    onChange={handleChange}
                  />
                </InputGroup>
                <label
                    className="form-control-label text-red"
                    htmlFor="input-name"
                  >
                    {errors?.newPassword}
                  </label>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Re-enter new password"
                    type="password"
                    autoComplete="new-password"
                    name="reEnteredPassword"
                    value={signUpData.reEnteredPassword}
                    onChange={handleChange}
                  />
                </InputGroup>
                <label
                    className="form-control-label text-red"
                    htmlFor="input-name"
                  >
                    {errors?.reEnteredPassword}
                  </label>
              </FormGroup>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength: {signUpData?.newPassword?.length || ""}{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handleCreatePassword}
                >
                  Create Pasword
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default NewPassword;
