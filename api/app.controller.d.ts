import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    returnHome(): Promise<string>;
    returnChallenge(): Promise<string>;
    login(req: any): Promise<{
        access_token: string;
        id: any;
    }>;
    getProfile(req: any): any;
}
