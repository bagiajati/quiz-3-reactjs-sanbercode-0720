import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = props => {
  const [daftarMovie, setDaftarMovie] =  useState({
    lists: null,
    selectedId: 0,
    statusForm: "create"
  })

  return (
    <MovieContext.Provider value={[daftarMovie, setDaftarMovie]}>
      {props.children}
    </MovieContext.Provider>
  );
};