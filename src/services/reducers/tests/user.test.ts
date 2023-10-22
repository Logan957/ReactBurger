import {initialState, userReducer, setAuthChecked, isUserLoading, setUser, userError, isLoginLoading, setLoginUser, loginError, isRegisterLoading, setRegisterUser, registerError, isGetCodeLoading, getedCode, getCodeError, resetGetedCode } from '../slices/user-slice';

describe('userReducer', () => {
  it('should handle setAuthChecked', () => {
    const nextState = userReducer(initialState, setAuthChecked(true));
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('should handle isUserLoading', () => {
    const nextState = userReducer(initialState, isUserLoading());
    expect(nextState.isUserLoading).toBe(true);
    expect(nextState.userError).toBe("");
  });

  it('should handle setUser', () => {
    const user = { name: 'user12', email: "roman.zaidulin2015@gmail.com" };
    const nextState = userReducer(initialState, setUser(user));
    expect(nextState.isUserLoading).toBe(false);
    expect(nextState.user).toEqual(user);
  });

  it('should handle userError', () => {
    const error = "Failed to fetch user";
    const nextState = userReducer(initialState, userError(error));
    expect(nextState.isUserLoading).toBe(false);
    expect(nextState.userError).toBe(error);
  });

  it('should handle isLoginLoading', () => {
    const nextState = userReducer(initialState, isLoginLoading());
    expect(nextState.isLoginLoading).toBe(true);
    expect(nextState.loginError).toBe("");
  });

  it('should handle setLoginUser', () => {
    const user = { name: 'user12', email: "roman.zaidulin2015@gmail.com" };
    const nextState = userReducer(initialState, setLoginUser(user));
    expect(nextState.isLoginLoading).toBe(false);
    expect(nextState.user).toEqual(user);
  });

  it('should handle loginError', () => {
    const error = "Failed to login";
    const nextState = userReducer(initialState, loginError(error));
    expect(nextState.isLoginLoading).toBe(false);
    expect(nextState.loginError).toBe(error);
  });

  it('should handle isRegisterLoading', () => {
    const nextState = userReducer(initialState, isRegisterLoading());
    expect(nextState.isRegisterLoading).toBe(true);
    expect(nextState.registerError).toBe("");
  });

  it('should handle setRegisterUser', () => {
    const user = { name: 'user12', email: "roman.zaidulin2015@gmail.com" };
    const nextState = userReducer(initialState, setRegisterUser(user));
    expect(nextState.isRegisterLoading).toBe(false);
    expect(nextState.user).toEqual(user);
  });

  it('should handle registerError', () => {
    const error = "Failed to register";
    const nextState = userReducer(initialState, registerError(error));
    expect(nextState.isRegisterLoading).toBe(false);
    expect(nextState.registerError).toBe(error);
  });

  it('should handle isGetCodeLoading', () => {
    const nextState = userReducer(initialState, isGetCodeLoading());
    expect(nextState.isGetCodeLoading).toBe(true);
    expect(nextState.getCodeError).toBe("");
  });

  it('should handle getedCode', () => {
    const nextState = userReducer(initialState, getedCode(true));
    expect(nextState.isGetCodeLoading).toBe(false);
    expect(nextState.getedCode).toBe(true);
  });

  it('should handle getCodeError', () => {
    const error = "Failed to get code";
    const nextState = userReducer(initialState, getCodeError(error));
    expect(nextState.isGetCodeLoading).toBe(false);
    expect(nextState.getCodeError).toBe(error);
  });

  it('should handle resetGetedCode', () => {
    const stateWithGetedCode = { ...initialState, getedCode: true };
    const nextState = userReducer(stateWithGetedCode, resetGetedCode());
    expect(nextState.getedCode).toBe(false);
  });
});