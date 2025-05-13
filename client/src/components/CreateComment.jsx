import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateComment = ({ snippetId }) => {
  const [comment, setComment] = useState({});
  const [showButton, setShowButton] = useState(false);
  

  const handleComment = (id, value) => {
    setComment((prev) => ({ ...prev, [id]: value }));
    setShowButton((prev) => ({ ...prev, [id]: value.length >= 3 }));
  };

  const submitComment = async (e, id) => {
    e.preventDefault();

    if (!comment[id] || comment[id] === "") {
      return toast.error("Please enter a comment");
    } else if (comment[id].length < 3) {
      return toast.error("Comment must be at least 3 characters");
    }

    try {
      const res = await axios.post(
        `http://localhost:5001/snippet/${id}/comment`,
        { comment: comment[id] }
      );

      if (res.data.success) {
        console.log(res.data.comments);
        toast.success("Comment posted successfully");
        setComment((prev) => ({ ...prev, [id]: "" }));
        setShowButton((prev) => ({ ...prev, [id]: false }));
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    }
  };

  return (
    <div className="absolute bottom-2 left-2 right-10">
      <form onSubmit={(e) => submitComment(e, snippetId)}>
        <div className="relative">
          <input
            value={comment[snippetId] || ""}
            onChange={(e) => handleComment(snippetId, e.target.value)}
            className="p-1 pr-14 pl-2 w-full outline-none border border-cyan-700 rounded-md text-white"
            type="text"
            placeholder="Add comment"
          />
          {showButton[snippetId] && (
            <div className="absolute right-2 top-1">
              <button type="submit" className="text-cyan-500 cursor-pointer">
                post
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
