import bcrypt from "bcrypt";

class PasswordComparator {
    public static create () {
        return new PasswordComparator();
    }

    public async compare(p1: string, p2: string): Promise<boolean> {
        const isValid = await bcrypt.compare(p1, p2);
    
        return isValid;
    } 
}

export default PasswordComparator.create();