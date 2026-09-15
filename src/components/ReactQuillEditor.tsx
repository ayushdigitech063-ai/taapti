"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "220px", background: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontSize: "14px" }}>
      Loading ReactQuill Editor...
    </div>
  ),
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "code-block",
];

interface ReactQuillEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function ReactQuillEditor({ content, onChange }: ReactQuillEditorProps) {
  return (
    <div className="react-quill-wrapper" style={{ background: "#FFF", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "hidden" }}>
      <ReactQuill
        theme="snow"
        value={content || ""}
        onChange={onChange}
        modules={modules}
        placeholder="Write full blog article details here..."
        style={{ minHeight: "220px", marginBottom: "42px" }}
      />
    </div>
  );
}
