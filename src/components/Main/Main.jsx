import React, { useContext, useEffect, useRef, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showresult,
    loading,
    resultdata,
    setinput,
    input,
  } = useContext(Context);

  const [ison, setison] = useState(false);
  const toggle = () => {
    setison(!ison);
    const t = document.getElementById("toggle");
    const s = document.getElementById("switch_elem");
    const p1 = document.querySelectorAll("p");
    if (!ison) {
      t.style.backgroundColor = "#3a3939";
      s.style.backgroundColor = "white";
      s.style.transform = "translateX(38px)";
      t.style.borderColor = "#cecbcb";
      document.body.style.backgroundColor = "#3a3939";
      p1.forEach((p) => {
        p.style.color = "white";
      });
    } else {
      s.style.backgroundColor = "black";
      t.style.backgroundColor = "white";
      t.style.borderColor = "#585858";
      s.style.transform = "translateX(0px)";
      document.body.style.backgroundColor = "white";
      p1.forEach((p) => {
        p.style.color = "#585858";
      });
    }
  };
  return (
    <div className="main">
      <div className="nav" id="nav">
        <p>Gemini</p>
        <div className="toggle" onClick={toggle} id="toggle">
          <div className="switch" id="switch_elem"></div>
        </div>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showresult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <div>
                  Suggest beautiful places to see on an upcoming road trip
                </div>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <div>Briefly summarize this concep: Urban Planning</div>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <div>
                  Brainstorm team bonding activities for our work retreat.
                </div>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <div>Improve the readablitiy of the following code.</div>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <>
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  </>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: resultdata }}
                    id="result"
                  ></p>
                )}
              </div>
            </div>
          </>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setinput(e.target.value)}
              value={input}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSent();
                }
              }}
              type="text"
              placeholder="Enter a prompt"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info" id="bottom-info">
            Gemini may display inaccurate info, inlcuding about people , so
            double-check its response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
