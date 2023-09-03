import { ReactElement, useEffect } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { getUserThunk } from "../../services/reducers/thunks/user-thunk";
import { Navigate } from "react-router-dom";

interface IProtectedRouteElementProps {
  element: ReactElement;
}

const ProtectedRouteElement: React.FC<IProtectedRouteElementProps> = ({
  element,
}) => {
  const dispatch = useAppDispatch();
  const { user, isUserLoading } = useTypedSelector((state) => state.user);

  const init = async () => {
    dispatch(getUserThunk());
  };

  useEffect(() => {
    if (user == null) {
      init();
    }
  }, [user, init]);

  if (!isUserLoading) {
    return null;
  }

  return user != null ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
