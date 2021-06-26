import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const EditContext = createContext();

const DEFAULT_DATA = {
  isEditMode: false,
  id: -1,
};

export function EditProvider({ children }) {
  const [editData, setData] = useState(DEFAULT_DATA);

  const setEdit = (id) => {
    setData({
      isEditMode: true,
      id,
    });
  };

  const resetEdit = () => {
    setData(DEFAULT_DATA);
  };

  return (
    <EditContext.Provider value={{ editData, setEdit, resetEdit }}>
      {children}
    </EditContext.Provider>
  );
}

EditProvider.propTypes = {
  children: PropTypes.node,
};
