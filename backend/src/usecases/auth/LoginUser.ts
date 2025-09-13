import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginUser {
    async execute(email: string, password: string) {
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("Usuário não encontrado");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Senha inválida");

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return { token, id: user._id.toString(), email: user.email };
    }
}
