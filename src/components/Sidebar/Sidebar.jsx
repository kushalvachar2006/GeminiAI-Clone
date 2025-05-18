import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setrecentPrompt, newchat } = useContext(Context);
  const loadpropmt = async (prompt) => {
    setrecentPrompt(prompt);
    await onSent(prompt);
  };
  const promp = prevPrompt;
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() => newchat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <h>New Chat</h> : null}
        </div>
        {extended ? (
          <div className="recent">
            <h className="recent-title">Recent</h>
            {promp.map((item, index) => {
              return (
                <>
                  <div
                    onClick={() => loadpropmt(item)}
                    className="recent-entry"
                    key={index}
                  >
                    <img src={assets.message_icon} alt="" />
                    <h>{item.slice(0, 18)}...</h>
                  </div>
                </>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <h>Help</h> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <h>Activity</h> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <h>Settings</h> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
