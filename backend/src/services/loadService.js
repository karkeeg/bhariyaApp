const Load = require('../models/Load');

const getPendingLoads = async () => {
    return await Load.find({ status: 'PENDING' }).sort({ createdAt: -1 });
};

const acceptLoad = async (id, driverId) => {
    const load = await Load.findById(id);

    if (!load) {
        const error = new Error('Load not found');
        error.statusCode = 404;
        throw error;
    }

    if (load.status === 'ACCEPTED') {
        const error = new Error('Load already accepted');
        error.statusCode = 400;
        throw error;
    }

    load.status = 'ACCEPTED';
    load.driverId = driverId;
    await load.save();

    return load;
};

module.exports = {
    getPendingLoads,
    acceptLoad
};
