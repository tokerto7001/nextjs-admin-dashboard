import bcrypt from 'bcrypt';

export async function hash(stringToHash: string) {
    try{
        return await bcrypt.hash(stringToHash, 10);
    }catch(err: any){
        throw Error(err.message)
    }
}