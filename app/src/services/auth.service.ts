import { AuthResponse, SigninRequest, SignupRequest } from "@/types"
import { HttpClient } from "./http.service"

export class AuthService {
    private http: HttpClient<AuthResponse>

    constructor() {
        this.http = new HttpClient<AuthResponse>()
    }

    signin = async (data:SigninRequest) => {
        try {
            const response = await this.http.post<SigninRequest>('/api/login', data)
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            return response
        }
        catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            throw error
        }
        
    }

    signup = async (data:SignupRequest) => {
        try {
        const response = await this.http.post<SignupRequest>('/api/register', data)
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        return response
        } 
        catch (error){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            throw error
        }
    }

    signout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        try {
            await this.http.post('/api/logout', {})
        } finally {
            window.location.href = '/signin' 
        }
        
    }
}







