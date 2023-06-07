import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bycrypt from 'bcrypt';

export const createHash = async(password) => {
    //Generar los salts
    const salts = await bycrypt.genSalt(10);
    return bycrypt.hash(password, salts);
}

export const validatePassword = async (password, hashedPassword) => bycrypt.compare(password, hashedPassword);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;