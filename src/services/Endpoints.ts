const Endpoints = {
    Timeout: 30000,
    // BaseURL: 'http://localhost:8080',
    BaseURL: 'https://3fff-117-194-137-198.ngrok.io',
    // User apis
    Login: '/user/login',
    LoginOTPVerification: '/user/login-otp-verification',
    CreateUser: '/user',
    Roles: '/roles',
    Permissions: '/user/permissions',
    Sections: '/section',
    RefreshToken: '/user/refresh-token',
    // Secure apis
    Station: '/station'
}

export default Endpoints;
