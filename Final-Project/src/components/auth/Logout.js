import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { message } from "antd";
import { useHistory } from "react-router";
import { destroySession } from "../../lib";

export default function Logout() {
  const [sendMessage, setSendMessage] = useState(true);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  destroySession();
  setUser(null);

  useEffect(() => {
    if (sendMessage) {
      message.info("Berhasil Logout.");
      setSendMessage(false);
    }
  }, [sendMessage]);

  history.push("/");

  return null;
}
