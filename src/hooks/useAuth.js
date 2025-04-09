import { createContext, useContext, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  setTokenToLocalStorage,
  useLocalStorage,
} from "./useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
// import { DESTROY_SESSION } from "../redux/types";
import toast from "react-hot-toast";
import { Auth } from "aws-amplify";
import { setIsAuthenticated } from "redux/reducers/AuthReducer";
import { GET } from "services/axios-request-handlers";
import { logoutUser } from "redux/reducers/AuthReducer";
import { setCognitoUser } from "redux/reducers/AuthReducer";
import { setLoading } from "redux/reducers/GlobalReducer";
import { ENDPOINT } from "config/api-endpoints";
import { setUserDetails } from "redux/reducers/AuthReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("token", null);
  const [role, setRole] = useLocalStorage("role", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);

  // call this function when you want to authenticate the user
  const login = async ({ username, password }) => {
    try {
      const response = await Auth.signIn(username, password);
      if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
        dispatch(setCognitoUser(response));
        navigate("/auth/create-password");
      } else {
        const res = await GET(ENDPOINT.GET_USER_INFO);
        const { role } = res?.response?.data?.data;
        if (
          res?.status === 200 &&
          (role?.role_name?.toLowerCase() === "super admin" ||
            role?.role_name?.toLowerCase() === "admin")
        ) {
          dispatch(setUserDetails(res?.response?.data?.data));
          dispatch(setIsAuthenticated(true));
          toast.success("Logged in successfully");
          setTokenToLocalStorage(
            response?.signInUserSession?.idToken?.jwtToken.replace(/"/g, "")
          );
          setRefreshToken(
            response?.signInUserSession?.refreshToken?.token.replace(/"/g, "")
          );
          navigate("/admin/index");
        } else toast.error("Sorry, you don't have access to the admin panel!");
      }
    } catch (error) {
      if(error.message === 'Incorrect username or password.'){
        toast.error("Incorrect Email or Password.")
      }else{
        toast.error(error.message);
      }
    } finally {
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    dispatch(setLoading(true));
    Auth.signOut()
      .then(() => {
        dispatch({ type: "DESTROY_SESSION" });
        dispatch(setIsAuthenticated(false));
        clearLocalStorage();
        dispatch(setCognitoUser({}));
        dispatch(setLoading(false));
        toast.success("Logged out successfully");

        navigate("/auth/login");
      })
      .catch((error) => {
        dispatch(setLoading(false));
        toast.error(error.message);
      });
  };

  const value = useMemo(
    () => ({
      user,
      role,
      login,
      logout,
    }),
    [user, role]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
