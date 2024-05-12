import bcrypt from 'bcrypt';

export async function hash(stringToHash: string) {
    try{
        return await bcrypt.hash(stringToHash, 10);
    }catch(err: any){
        throw Error(err.message)
    }
};

export async function compare(hashedString: string, stringToCompare: string) {
    try{
        return await bcrypt.compare(stringToCompare, hashedString);
    }catch(err: any){
        throw Error(err.message)
    }
}; 