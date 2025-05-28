import Snippet from "../models/snippet.model.js";

//=======================================================================================================================
// SNIPPET CONTROLLER
//=======================================================================================================================
// This controller is used to handle all the requests related to snippet, the title and code
//=======================================================================================================================
export const createSnipet = async (req, res) => {
    try {
        const { title, code } = req.body;
        console.log("Received data:", { title, code });

        if (!title || !code) {
            return res.status(400).json({ success: false, message: "Title and code are required" });
        }


        const newSnippet = new Snippet({ title, code });
        const savedSnippet = await newSnippet.save();


        return res.status(201).json({
            success: true,
            message: "Snippet created successfully",
            snippet: {
                id: savedSnippet._id,
                title: savedSnippet.title,
                code: savedSnippet.code
            }
        });
    } catch (error) {
        console.error("Error in createSnipet:", error);
        return res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};

//=======================================================================================================================
// GET ALL SNIPPETS
//=======================================================================================================================
// This controller is used to handle all the requests related to snippet, the title and code
//=======================================================================================================================
export const getAllSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Snippets fetched successfully",
            snippets: snippets,
        });
    } catch (error) {
        console.error("Error in getAllSnippets:", error);
        return res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};

