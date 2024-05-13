import { JwtPayload, sign, verify } from 'jsonwebtoken';


export function jwtSign<T extends object>(objectToSign: T, expiresIn: string): string {
    try{
        return sign(objectToSign, process.env.JWT_SECRET_KEY!, { expiresIn });
    } catch(err: any){
        throw Error(err.message);
    }
}

export function jwtVerify<T>(stringToVerify: string):T{
    try{
        return verify(stringToVerify, process.env.JWT_SECRET_KEY!) as T;
    } catch(err: any){
        throw Error(err.message);
    }
}