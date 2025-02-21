import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('2fa/generate/:userId')
    async generate2FA(@Param('userId') userId: string) {
        return this.authService.generate2FA(userId);
    }

    @Post('2fa/verify/:userId')
    verify2FA(@Param('userId') userId: string, @Body('token') token: string) {
        return { valid: this.authService.verify2FA(userId, token) };
    }
}
