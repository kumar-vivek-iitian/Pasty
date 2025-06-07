/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
import { toast } from "react-hot-toast";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/htmlmixed/htmlmixed");
  require("codemirror/mode/css/css");
  require("codemirror/mode/xml/xml");

  require("codemirror/mode/python/python");
  require("codemirror/mode/clike/clike");
  require("codemirror/mode/ruby/ruby");
  require("codemirror/mode/php/php");
  require("codemirror/mode/go/go");
  require("codemirror/mode/rust/rust");
  require("codemirror/mode/perl/perl");
  require("codemirror/mode/shell/shell");
  require("codemirror/mode/sql/sql");
  require("codemirror/mode/swift/swift");

  require("codemirror/mode/markdown/markdown");
  require("codemirror/mode/yaml/yaml");
  require("codemirror/mode/toml/toml");

  require("codemirror/mode/nginx/nginx");
  require("codemirror/mode/dockerfile/dockerfile");
  require("codemirror/mode/properties/properties");
}
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/css/css";
// import "codemirror/mode/xml/xml";

// import "codemirror/mode/python/python";
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/ruby/ruby";
// import "codemirror/mode/php/php";
// import "codemirror/mode/go/go";
// import "codemirror/mode/rust/rust";
// import "codemirror/mode/perl/perl";
// import "codemirror/mode/shell/shell";
// import "codemirror/mode/sql/sql";
// import "codemirror/mode/swift/swift";

// import "codemirror/mode/markdown/markdown";
// import "codemirror/mode/yaml/yaml";
// import "codemirror/mode/toml/toml";

// import "codemirror/mode/nginx/nginx";
// import "codemirror/mode/dockerfile/dockerfile";
// import "codemirror/mode/properties/properties";

import { Geist_Mono } from "next/font/google";

const geist = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
});

const Pastearea = () => {

  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("material");
  const [language, setLanguage] = useState("cpp");
  const [password, setPassword] = useState("");

  const themes = ["material", "dracula", "monokai", "eclipse"];

  const duration = ["15mins", "30mins", "1hr", "8hr", "24hr"];
  const [timeout, setTimeout] = useState(duration[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("Untitled");

  const languageModes: { [key: string]: string } = {
    javascript: "javascript",
    html: "htmlmixed",
    css: "css",
    xml: "xml",
    python: "python",
    c: "text/x-csrc",
    cpp: "text/x-c++src",
    java: "text/x-java",
    ruby: "ruby",
    php: "php",
    go: "go",
    rust: "rust",
    perl: "perl",
    shell: "shell",
    sql: "sql",
    swift: "swift",
    markdown: "markdown",
    yaml: "yaml",
    json: "application/json",
    toml: "toml",
    nginx: "nginx",
    dockerfile: "dockerfile",
    properties: "properties",
  };

  const languages = [
    "javascript",
    "html",
    "css",
    "xml",
    "python",
    "c",
    "cpp",
    "java",
    "ruby",
    "php",
    "go",
    "rust",
    "perl",
    "shell",
    "sql",
    "swift",
    "markdown",
    "yaml",
    "json",
    "toml",
    "nginx",
    "dockerfile",
    "properties",
  ];

  const submitPaste = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        title,
        code,
        language,
        theme,
        timeout,
        password: password || null,
      };
      const response = await axios.post("/api/v1/paste-content", payload, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("success!");
      } else {
        throw Error("Error Occurred.");
      }
    } catch (err: unknown) {
      toast.error("Error Occurred.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-black h-screen ${geist.className}`}>
      <input
        type="text"
        value={title}
        placeholder="Untitled"
        className="text-white px-4 mt-2 mb-3 w-full outline-none"
        onChange={(e) => setTitle(e.target.value)}
      />
      <CodeMirror
        className="px-4 h-[60vh]"
        value={code}
        options={{
          mode: languageModes[language],
          theme: theme,
          lineNumbers: true,
          readOnly: false,
        }}
        onBeforeChange={(_editor, _data, value) => {
          setCode(value);
        }}
        editorDidMount={(editor) => {
          const wrapper = editor.getWrapperElement();
          wrapper.style.fontFamily = "system-ui";
          wrapper.style.height = "60vh";
        }}
      />
      <div className="text-md py-2 px-4 flex gap-[1rem] bg-black text-white justify-center items-center">
        <div className="flex gap-4 mt-4">
          <div>
            <label htmlFor="theme-select">Theme: </label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-300 rounded-md text-white focus:outline-none hover:border-gray-500 min-w-[150px] cursor-pointer transition duration-150 ease-in-out"
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center">
            <label htmlFor="language-select" className=" mr-2 text-white">
              Language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-300 rounded-md text-white focus:outline-none hover:border-gray-500 min-w-[150px] cursor-pointer transition duration-150 ease-in-out"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="expire" className="text-white">
              Expire Duration:
            </label>
            <select
              id="timeout-select"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-300 rounded-md text-white focus:outline-none hover:border-gray-500 min-w-[150px] cursor-pointer transition duration-150 ease-in-out"
            >
              {duration.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-4 gap-4">
        <div>
          <label htmlFor="password" className="ml-4 mt-2 text-white">
            Optional Password:{" "}
          </label>
          <input
            type="password"
            className="text-sm text-white p-2 rounded-lg border border-gray-600 outline-none shadow-none bg-transparent"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="">
          <button
            className="text-white bg-blue-600 ml-4 rounded-lg cursor-pointer p-2 hover:text-blue-600 hover:bg-white"
            onClick={submitPaste}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pastearea;
