import { snippet } from "../db/index.js";
import Snippet from "../models/snippet.model.js";
import { randomBytes } from "crypto";

//=======================================================================================================================
// SNIPPET CONTROLLER
//=======================================================================================================================
// This controller is used to handle all the requests related to snippet, the title and code
//=======================================================================================================================
export const createSnipet = async (req, res) => {
    console.log("➡️ POST /snippets/create called");
    try {
        const id = randomBytes(4).toString("hex");

        const { title, code } = req.body;
        console.log("Received data:", { title, code });

        if (!title || !code) {
            return res.status(400).json({ success: false, message: "Title and code are required" });
        }
        snippet[id] = {
            id,
            title,
            code,
        };

        const newSnippet = new Snippet({ title, code });
        const savedSnippet = await newSnippet.save();

        return res.status(201).json({
            success: true,
            message: "Snippet created successfully",
            data: {
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
