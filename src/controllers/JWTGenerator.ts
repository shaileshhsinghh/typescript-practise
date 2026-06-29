import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWTpayload {
    id : string;
}

const generatetoken = (payload : JwtPayload) => {
    return jwt.sign(payload , process.env.JWT_SECRET as string, {
        expiresIn : '30d',
    });
};

export default generatetoken;