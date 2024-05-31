import { LoginPage, RegistrationPage, EmailVerificationPage, PasswordRecoveryPage } from '../../../pages/auth/index'

export const AUTH_ROUTES = {
    login: {
        route: "/auth/login",
        element: <LoginPage />
    },
    registration: {
        route: "/auth/registration",
        element: <RegistrationPage />
    },
    emailcode: {
        route: "/auth/email-verification",
        element: <EmailVerificationPage />
    }
}