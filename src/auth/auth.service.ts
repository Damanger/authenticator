import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class AuthService {
    private users = new Map();

    // Genera un secreto y el QR para el usuario
    async generate2FA(userId: string) {
        const secret = speakeasy.generateSecret({ name: `MyApp (${userId})` });

        this.users.set(userId, { secret: secret.base32 });

        const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);
        return { secret: secret.base32, qrCodeDataURL };
    }

    // Verifica el código TOTP ingresado por el usuario
    verify2FA(userId: string, token: string): boolean {
        const user = this.users.get(userId);
        if (!user) return false;

        return speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token,
            window: 1,
        });
    }
}
