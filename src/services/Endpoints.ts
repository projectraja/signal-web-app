const Endpoints = {
    Timeout: 30000,
    // BaseURL: 'http://localhost:8080',
    BaseURL: 'https://d745-159-89-160-251.ngrok.io',
    // User apis
    Login: '/user/login',
    LoginOTPVerification: '/user/login-otp-verification',
    CreateUser: '/user',
    Roles: '/roles',
    Permissions: '/user/permissions',
    Sections: '/section',
    RefreshToken: '/user/refresh-token',
    // Secure apis
    Station: '/station',
    Section: '/section',
    Department: '/department',
    Designation: '/designation'
}

export default Endpoints;
