const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return an error for missing credentials', () => {
            req.body = {};

            authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Username and password are required',
            });
        });

        it('should return an error for missing password', () => {
            req.body = { username: 'test' };

            authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Username and password are required',
            });
        });

        it('should return an error for invalid credentials', () => {
            req.body = { username: 'wronguser', password: 'wrongpassword' };

            authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid credentials',
            });
        });

        it('should return an error for invalid username', () => {
            req.body = { username: 'newtest', password: 'password' };
        
            authController.login(req, res);
        
            expect(res.status).toHaveBeenCalledWith(400); 
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid username',  
            });
        });

    });
});
