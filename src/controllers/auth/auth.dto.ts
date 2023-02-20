import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthRegister {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}

export class AuthLogin {
    @IsNotEmpty()
    @IsEmail()
    email: string

    username: string

    @IsNotEmpty()
    password: string
}
