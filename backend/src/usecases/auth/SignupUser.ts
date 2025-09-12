import { CreateUser } from "../users/CreateUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class SignupUser {
    async execute(username: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = new CreateUser();
        const user = await createUser.execute(username, email, hashedPassword);

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return { token, id: user._id.toString(), email: user.email };
    }
}
