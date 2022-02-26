import bcrypt from "bcrypt";

class Hasher {
    public async hash (p: string) : Promise<string>{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(p, salt);
    
        return hashed;
    }

    public static create () {
        return new Hasher();
    }
}



export default Hasher.create();
