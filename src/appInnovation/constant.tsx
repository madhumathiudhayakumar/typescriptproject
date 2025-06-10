
export interface RegisterFormData {
    name: string,
    email: string,
    password: string,
    gender: '' | 'male' | 'female' | 'other'
    skils: string[],
    dob: string,
    age: number,
    phone: string,
    profile: File | null,
    document: File | null
    country: string,
    role: string
}
export interface ErrorData {
    name: string,
    email: string,
    password: string,
    age: string,
    phone: string,
    gender: string,
    skils: string,
    dob: string,
    profile: string,
    document: string,
    country: string,
    role: string

    // [key: string]: string,

}

export interface LoginFormData {
    email:string,
    password:string,
    initialLogin:boolean
}

export interface LoginErrorData {
    email:string,
    password:string
}
