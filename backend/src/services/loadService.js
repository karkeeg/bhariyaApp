const Load = require('../models/Load');

/**
 * Get pending loads. If driver coordinates are provided,
 * returns only loads within the given radius using MongoDB $geoNear.
 * 
 * @param {Object} options
 * @param {number} [options.lat] - Driver's latitude
 * @param {number} [options.lng] - Driver's longitude
 * @param {number} [options.radiusKm] - Search radius in km (default: 10)
 */
const getPendingLoads = async ({ lat, lng, radiusKm = 10 } = {}) => {
    // If driver location is provided, use geospatial aggregation to filter within radius
    if (lat != null && lng != null) {
        const radiusInMeters = radiusKm * 1000;

        const loads = await Load.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    distanceField: 'distanceInMeters',
                    maxDistance: radiusInMeters,
                    spherical: true,
                    query: { status: 'PENDING' }
                }
            },
            {
                $addFields: {
                    distance: { $round: [{ $divide: ['$distanceInMeters', 1000] }, 1] }
                }
            },
            { $sort: { distance: 1 } }
        ]);

        return loads;
    }

    // Fallback: no location, return all pending loads
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
