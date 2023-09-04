import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { ReactElement, memo } from "react";
import React from "react";

interface ProtectedProps {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps) => {
  const { user, isAuthChecked } = useTypedSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

interface OnlyUnAuthProps {
  component: ReactElement;
}

export const OnlyAuth = memo(Protected);
export const OnlyUnAuth = memo(({ component }: OnlyUnAuthProps) => (
  <Protected onlyUnAuth={true} component={component} />
));
