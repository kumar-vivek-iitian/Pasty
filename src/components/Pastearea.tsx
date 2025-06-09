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
import { Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
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

const geist = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
});

const Pastearea = () => {

  const router = useRouter();
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("material");
  const [language, setLanguage] = useState("cpp");

  const themes = ["material", "dracula", "monokai", "eclipse"];

  const duration = ["15mins", "30mins", "1hr", "8hr", "24hr"];
  const [timeout, setTimeoutt] = useState(duration[0]);
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
      };
      const response = await axios.post("/api/v1/paste-content", payload, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Success! Redirecting...");
        setTimeout(() => {
          router.push(`/p/${response.data.pasteid}`)
        })
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
              onChange={(e) => setTimeoutt(e.target.value)}
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
