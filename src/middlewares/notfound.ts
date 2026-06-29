import { Request , Response , NextFunction } from 'express';

type Errorhandler = (
    req :Request,
    res : Response,
    next : NextFunction,
) => void;

const NotFound: Errorhandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route doesn't exist`,
  });
};

export default NotFound;