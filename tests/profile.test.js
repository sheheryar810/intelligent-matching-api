const profileController = require('../controllers/profileController');

describe('Profile Controller', () => {
    let req, res;

    const profiles = [
        { name: 'Business A', type: 'Business', industry: 'Tech', location: 'Doha', investment: 500000, },
        { name: 'Business B', type: 'Business', industry: 'Tech', location: 'Doha', investment: 500000, },
        { name: 'Business C', type: 'Business', industry: 'Tech', location: 'Doha', investment: 500000, },
    ];

    beforeEach(() => {
        req = {
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        profileController.profiles = profiles;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerProfile', () => {
        it('should register a valid profile', () => {
            const validProfile = {
                name: 'Business A',
                type: 'Business',
                industry: 'Tech',
                location: 'Doha',
                investment: 500000,
            };

            req.body = validProfile;

            profileController.registerProfile(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Profile registered successfully',
                profile: validProfile,
            });
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should return 400 for missing required fields', () => {
            req.body = {
                name: 'Business A',
                type: 'Business',
                industry: 'Tech',
            };

            profileController.registerProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Missing required fields',
            });
        });

        it('should return 400 if name is missing', () => {
            req.body = {
                type: 'Business',
                industry: 'Tech',
                location: 'Doha',
            };

            profileController.registerProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Missing required fields',
            });
        });

        it('should return 400 if type is missing', () => {
            req.body = {
                name: 'Business A',
                industry: 'Tech',
                location: 'Doha',
            };

            profileController.registerProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Missing required fields',
            });
        });

        it('should return 400 if industry is missing', () => {
            req.body = {
                name: 'Business A',
                type: 'Business',
                location: 'Doha',
            };

            profileController.registerProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Missing required fields',
            });
        });

        it('should return 400 if location is missing', () => {
            req.body = {
                name: 'Business A',
                type: 'Business',
                industry: 'Tech',
            };

            profileController.registerProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Missing required fields',
            });
        });
    });

    describe('matchProfiles', () => {
        it('should return matching profiles based on industry and location', () => {
            req.query = { industry: 'Tech', location: 'Doha', page: 1, limit: 2 };

            profileController.matchProfiles(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                page: 1,
                limit: 2,
                total: 3,
                results: [
                    { name: 'Business A', type: 'Business', industry: 'Tech', location: 'Doha', investment: 500000, },
                    { name: 'Business B', type: 'Business', industry: 'Tech', location: 'Doha', investment: 500000, }
                ]
            });
        });

        it('should return empty results if no matching profiles', () => {
            req.query = { industry: 'Finance', location: 'Doha', page: 1, limit: 10 };

            profileController.matchProfiles(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                page: 1,
                limit: 10,
                total: 0,
                results: []
            });
        });
    });
});
