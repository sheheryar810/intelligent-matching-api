let profiles = [];

exports.registerProfile = (req, res) => {
    const { name, type, industry, location, investment } = req.body;

    if (!name || !type || !industry || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const profile = { name, type, industry, location, investment };

    profiles.push(profile);

    res.status(201).json({
        message: 'Profile registered successfully',
        profile,
    });
};

exports.matchProfiles = (req, res) => {
    const { industry, location } = req.query;

    if (!industry || !location) {
        return res.status(400).json({ message: 'Missing query parameters' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const matches = profiles.filter(
        profile => profile.industry === industry && profile.location === location
    );

    const results = matches.slice(startIndex, endIndex);

    if (results.length === 0) {
        return res.status(200).json({ page, limit, total: matches.length, results });
    }

    res.status(200).json({
        page,
        limit,
        total: matches.length,
        results,
    });
};
