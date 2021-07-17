import React from "react";

export const UserContext = React.createContext({});

const initialState = {
  isAuthenticated: false,
  userName: null,
  token: null,
  email: null,
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log("🚀 ~ file: yat.js ~ line 43 ~ reducer ~ LOGIN", state);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userName: action.payload.userName,
        email: action.payload.email,
        _id: action.payload.id,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };
  }

  return state;
};

function App(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default App;
