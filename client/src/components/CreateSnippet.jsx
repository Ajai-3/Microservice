import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CreateComment from "./CreateComment";
import { FaComment } from "react-icons/fa";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [activeSnippet, setActiveSnippet] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:4002/api/snippets/");
        console.log("Fetched snippets:", res.data);
        setSnippets(res.data.snippets || []);
      } catch (error) {
        console.error("Error fetching snippets:", error);
        toast.error("Failed to fetch snippets");
      }
    };

    fetchSnippets();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || code === "") {
      return toast.error("Please fill all the fields");
    } else if (title.length < 3) {
      return toast.error("Title must be at least 3 characters");
    } else if (code.length < 10) {
      return toast.error("Code must be at least 10 characters");
    }

    try {
      const res = await axios.post("http://localhost:4002/api/snippets/create", {
        title,
        code,
      });

      console.log("Create snippet response:", res.data);

      if (res.data.success) {
        setCode("");
        setTitle("");
        setSnippets([res.data.snippet, ...snippets]);
        return toast.success("Snippet created successfully");
      } else {
        return toast.error(res.data.message || "Failed to create snippet");
      }
    } catch (error) {
      console.error("Error creating snippet:", error);
      toast.error("Failed to create snippet");
    }
  };

  const getComments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4001/api/comments/${id}`);
      console.log("Fetched comments:", res.data);
      setShowComments(res.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to fetch comments");
    }
  };

  const toggleComments = (id) => {
    if (activeSnippet === id) {
      setActiveSnippet(null);
    } else {
      setActiveSnippet(id);
      getComments(id);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 w-[500px]"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-white p-2 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          type="text"
          name="title"
          placeholder="Title"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border text-blue-500 border-white p-2 h-40 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          name="code"
          placeholder="Write code snippet"
        ></textarea>
        <button
          className="rounded-md p-2 bg-green-500 text-white hover:bg-green-600 transition cursor-pointer"
          type="submit"
        >
          Create
        </button>
      </form>

      <div className="flex flex-wrap mt-2 p-10 w-full">
        {snippets.map((snippet) => (
          <div
            key={snippet._id}
            className="relative bg-zinc-800 whitespace-pre-wrap p-5 m-2 rounded-md border border-red-500 hover:border-amber-300 cursor-crosshair h-[300px] w-[300px] overflow-auto"
          >
            <h1 className="font-bold tracking-wider mb-1">{snippet.title}</h1>
            <p className="text-blue-500 text-sm">{snippet.code}</p>
            <CreateComment snippetId={snippet._id} />
            <div className="absolute right-2 bottom-2">
              <button
                onClick={() => toggleComments(snippet._id)}
                className="text-2xl text-cyan-500 cursor-pointer"
              >
                <FaComment />
              </button>
            </div>

            {activeSnippet === snippet._id && (
              <div className="absolute bottom-2 left-2 right-10 bg-black p-2 rounded-md h-48 overflow-y-auto overflow-x-hidden custom-scrollbar">
                {showComments.length > 0 ? (
                  showComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="mb-2 border-b border-zinc-700 pb-1"
                    >
                      <p className="text-white text-sm break-words">
                        {comment.comment}
                      </p>
                      <p className="text-gray-400 text-xs text-right mt-1">
                        {new Date(comment.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No comments yet</p> // Message when no comments are available
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSnippet;
