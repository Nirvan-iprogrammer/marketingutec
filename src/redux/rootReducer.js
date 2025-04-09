import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import GlobalReducer from "./reducers/GlobalReducer";
import UserRolesReducer from "./reducers/UserRoleReducer";
import ProductReducer from "./reducers/ProductReducer";
import CategoryReducer from "./reducers/CategoryReducer";

const appReducer = combineReducers({
  global: GlobalReducer,
  auth: AuthReducer,
  userRoles: UserRolesReducer,
  product: ProductReducer,
  category: CategoryReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === "DESTROY_SESSION") state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
