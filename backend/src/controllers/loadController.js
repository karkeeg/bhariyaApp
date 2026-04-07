const loadService = require('../services/loadService');
const ApiResponse = require('../utils/apiResponse');

const getLoads = async (req, res, next) => {
    try {
        const loads = await loadService.getPendingLoads();
        res.status(200).json(ApiResponse.success('Pending loads fetched successfully', loads));
    } catch (error) {
        next(error);
    }
};

const acceptLoad = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { driverId } = req.body;

        if (!driverId) {
            return res.status(400).json(ApiResponse.error('driverId is required'));
        }

        const load = await loadService.acceptLoad(id, driverId);
        res.status(200).json(ApiResponse.success('Load accepted successfully', load));
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json(ApiResponse.error(error.message));
        } else {
            next(error);
        }
    }
};

module.exports = {
    getLoads,
    acceptLoad
};
