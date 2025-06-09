/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";
import { Geist_Mono } from "next/font/google";

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

const geist = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
});

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PasteareaReadOnly = ({paste} : any) => {
  return (
    <div className={`bg-black h-screen ${geist.className}`}>
      <input
        type="text"
        value={paste.title}
        placeholder="Untitled"
        className="text-white px-4 mt-2 mb-3 w-full outline-none"
        readOnly={true}
      />
      <CodeMirror
        className="px-4 h-[60vh]"
        value={paste.pasteContent}
        options={{
          mode: languageModes[paste.language],
          theme: paste.theme,
          lineNumbers: true,
          readOnly: true,
        }}
        onBeforeChange={(_editor, _data, value) => {
          console.log(value)
        }}
        editorDidMount={(editor) => {
          const wrapper = editor.getWrapperElement();
          wrapper.style.fontFamily = "system-ui";
          wrapper.style.height = "80vh";
        }}
      />
      </div>
  );
};

export default PasteareaReadOnly;
