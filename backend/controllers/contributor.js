const usersSchema = require("../models/users");

const getContributorUsers = async (req, res) => {
    try {
        const contributors = await usersSchema?.find({ role: "volunteer" }) ?? [];
        return res.status(200).json({
            message: "Contributor users retrieved successfully.",
            contributors
        });
    } catch (error) {
        console.error("Error while fetching users:", error.message);
        return res.status(500).json({
            message: "Internal Server Error. Please try again later."
        });
    }
};

exports.getContributorUsers = getContributorUsers;