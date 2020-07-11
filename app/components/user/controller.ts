import { UserModel, IUserDoc } from './model'
import { IGoogleUser } from '../../utils/googleapi'

export class UserController {
    async getUsers(): Promise<IUserDoc[]> {
        return await UserModel.find()
    }

    async getUser(email: string): Promise<IUserDoc> {
        return await UserModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    throw Error()
                }
                return user
            })
            .catch((e) => {
                throw e
            })
    }

    async getOrAddUser(googleUser: IGoogleUser): Promise<IUserDoc> {
        if (!googleUser.email) {
            throw Error('Email does not exist')
        }

        return await this.getUser(googleUser.email).catch(async () => {
            return await this.addUser(googleUser)
        })
    }

    async addUser(googleUser: IGoogleUser): Promise<IUserDoc> {
        const user = new UserModel({
            resourceName: googleUser.resourceName,
            email: googleUser.email,
            name: googleUser.name,
            photo: googleUser.photo,
            tokens: '',
        })

        return user.save().catch((e) => {
            throw e
        })
    }
}
