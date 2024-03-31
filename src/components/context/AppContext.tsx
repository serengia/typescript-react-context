import React, { createContext } from "react";

const Context = createContext("");

export default function AppContext() {
  return (
    <Context.Provider value={{ name: "James" }}>
      <h2>Hello there</h2>
    </Context.Provider>
  );
}
