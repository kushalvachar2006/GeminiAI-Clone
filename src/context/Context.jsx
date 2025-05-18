import { createContext, useRef, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showresult, setshowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultdata, setresultdata] = useState("");
  const containerRef = useRef(null);

  const delayPara = (index, nextword) => {
    setTimeout(function () {
      setresultdata((prev) => prev + nextword);
    }, 10 * index);
  };

  const newchat = () => {
    setloading(false);
    setshowresult(false);
  };
  const onSent = async (prompt) => {
    setresultdata("");
    setloading(true);
    setshowresult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setrecentPrompt(prompt);
    } else {
      setprevPrompt((prev) => [...prev, input]);
      setrecentPrompt(input);
      response = await runChat(input);
    }

    let responsearry = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responsearry.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responsearry[i];
      } else {
        newResponse += "<b>" + responsearry[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newresponse3 = newResponse2.split("```").join("</br>");
    let newresponsearray = newresponse3.split(" ");
    for (let i = 0; i < newresponsearray.length; i++) {
      const nextWord = newresponsearray[i];
      delayPara(i, nextWord + " ");
    }
    setloading(false);
    setinput("");
  };
  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showresult,
    loading,
    resultdata,
    input,
    setinput,
    newchat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
