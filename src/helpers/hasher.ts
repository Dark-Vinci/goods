import bcrypt from "bcrypt";

async function hashPassword(p: string) : Promise<string>{
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(p, salt);

    return hashed;
}


export default hashPassword;
