import JWT from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { NotAuthorizedError } from './errors-handler';

const tokens: string[] = ['auth','seller','gig','search','buyer','message','order','review'];

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.gatewayToken)
    {
        throw new NotAuthorizedError('invalid request','verifyGatewayRequest() method: Request not coming from api gateway');
    }
    const token: string = req.headers.gatewayToken as string;
    if(!token){
        throw new NotAuthorizedError('invalid request','verifyGatewayRequest() method: no token!');
    }

    try{
        const payload: {id: string; iat: number} = JWT.verify(token,'') as {id: string; iat: number};
        if(!token.includes(payload.id))
        {
            throw new NotAuthorizedError('invalid request','verifyGatewayRequest() method: Request payload is invalid');
        }
    }catch(error)
    {
        throw new NotAuthorizedError('invalid request','verifyGatewayRequest() method: Request not coming from api gateway');
    }
}