import Comment from "../models/comment.model.js";

//=======================================================================================================================
// CREATE COMMENT
//=======================================================================================================================
// This controller is used to handle all the requests related to comment, the title and code
//=======================================================================================================================
export const createComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "Comment is required" });
    }

    const snippetId = req.params.id;

    const newComment = new Comment({
      comment,
      snippetId,
    });
    const savedComment = await newComment.save();

    console.log("Comment saved successfully:", savedComment);

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: savedComment,
    });
  } catch (error) {
    console.error("Error in createComment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

//=======================================================================================================================
// COMMENT BY SNIPPET ID
//=======================================================================================================================
// This controller is used to handle all the requests related to comment, the title and code
//=======================================================================================================================
export const getCommentBySnippetId = async (req, res) => {
  try {
    const { id } = req.params;

    const dbComments = await Comment.find({ snippetId: id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments: dbComments,
    });
  } catch (error) {
    console.error("Error in getCommentBySnippetId:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};
