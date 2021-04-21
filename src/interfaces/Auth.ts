import {User} from "../entities/User";

export default interface Auth {
    token: string
    user: User | undefined
}