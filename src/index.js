import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "react-quill/dist/quill.snow.css";
import "assets/css/global.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Amplify } from "aws-amplify";
import awsExports from "./config/aws-exports";
import { store } from "redux/store";
import { persistor } from "redux/store";
import { AuthProvider } from "hooks/useAuth";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.APP_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      region: awsExports.REGION,
    },
  },
});
Amplify.Auth.configure({
  authenticationFlowType: "USER_SRP_AUTH",
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={"Loading..."} persistor={persistor}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </PersistGate>
  </Provider>
);
