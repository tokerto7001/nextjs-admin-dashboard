import { sign } from 'jsonwebtoken';


export function jwtSign<T extends object>(objectToSign: T): string {
    try{
        return sign(objectToSign, process.env.JWT_SECRET_KEY!);
    } catch(err: any){
        throw Error(err.message);
    }
}