import Snippet from "../models/snippet.model.js";

//=======================================================================================================================
// SNIPPET CONTROLLER
//=======================================================================================================================
// This controller is used to handle all the requests related to snippet, the title and code
//=======================================================================================================================
export const createSnippet = async (req, res) => {
    try {
        console.log("📝 CREATE SNIPPET REQUEST");
        console.log("Request body:", req.body);

        const { title, code } = req.body;

        if (!title || !code) {
            console.log("❌ Missing title or code");
            return res.status(400).json({ success: false, message: "Title and code are required" });
        }

        console.log("✅ Creating snippet with:", { title, code });
        const newSnippet = new Snippet({ title, code });

        console.log("💾 Saving to database...");
        const savedSnippet = await newSnippet.save();
        console.log("✅ Snippet saved successfully:", savedSnippet._id);

        return res.status(201).json({
            success: true,
            message: "Snippet created successfully",
            snippet: {
                _id: savedSnippet._id,
                title: savedSnippet.title,
                code: savedSnippet.code,
                createdAt: savedSnippet.createdAt,
                updatedAt: savedSnippet.updatedAt
            }
        });
    } catch (error) {
        console.error("❌ ERROR in createSnippet:", error.message);
        console.error("Full error:", error);
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

