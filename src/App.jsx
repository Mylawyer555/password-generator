import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setTsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // A function to generate Password using useCallabck hook
  
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) {
      str += "0123456789";
    }
    if (isCharAllowed) {
      str += "._*^¨`?=)(/%&";
    }

    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isCharAllowed, isNumberAllowed]);

 // A function to copy password to clipboard
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
  };

  //This useEffect to generate new password on the reload or refresh of the page
  useEffect(() => {
    generatePassword();
  }, [length, isCharAllowed, isNumberAllowed]);

  return (
    <div className="wrapper">
      <div className="w-full h-screen bg-slate-950 pt-11">
        <div className="w-1/3 h-36 bg-slate-900 m-auto rounded-2xl shadow-slate-800 text-orange-400 p-3">
          <h1 className=" text-center font-sans text-xl">Password Generator</h1>

          <input
            className="w-60 h-9  mt-5 ml-10 pl-2 pr-2 rounded-lg outline-none"
            type="text"
            name=""
            id=""
            value={password}
            placeholder="Enter Password"
            readOnly
          />

          <button
            className="bg-blue-700 w-16 h-9 flex-grow-0 ml-2 rounded-lg text-white font-sans text-center"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>

          <div className="w-100 h-6 ml-9 mt-3 flex items-center ">
            <input
              className="w-32 cursor-pointer "
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="text-xs ">
              Length {length}
            </label>

            <input
              className=" ml-5 flex align-middle"
              type="checkbox"
              defaultChecked={isNumberAllowed}
              onChange={() => setIsNumberAllowed((prev) => !prev)}
              name=""
              id=""
            />
            <label htmlFor="numbers" className="text-xs flex align-middle">
              Numbers{" "}
            </label>

            <input
              className=" ml-3"
              type="checkbox"
              name=""
              id=""
              value={isCharAllowed}
              onChange={() => setTsCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-xs">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
