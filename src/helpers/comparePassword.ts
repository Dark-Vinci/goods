import bcrypt from "bcrypt";

async function comparePassword(p1: string, p2: string): Promise<boolean> {
    const isValid = await bcrypt.compare(p1, p2);

    return isValid;
}

export default comparePassword;