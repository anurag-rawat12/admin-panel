import Opportunity from '../model/Opportunity.js';
import User from '../model/User.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOpportunities = async (req, res) => {
    try {

        const opportunities = await Opportunity.find();

        return res.status(200).json({
            success: true,
            message: "opportunities fetched successfully",
            data: opportunities
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // Soft delete the user
        user.isDeleted = true;
        user.deletedAt = new Date();

        await user.save();

        const updateduser = await User.findById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            updateduser: updateduser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateOpportunityStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const opportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found",
            });
        }

        await opportunity.save();

        return res.status(200).json({
            success: true,
            message: "Opportunity status updated successfully",
            data: opportunity
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}