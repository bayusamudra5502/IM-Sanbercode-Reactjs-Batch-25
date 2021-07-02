import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

MessageProvider.propTypes = {
  children: PropTypes.node,
};

export default MessageContext;
