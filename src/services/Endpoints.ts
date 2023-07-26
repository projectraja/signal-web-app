const Endpoints = {
    Timeout: 30000,
    // BaseURL: 'http://localhost:8080',
    BaseURL: 'http://159.89.160.251/app2',
    // BaseURL: 'https://62b0-159-89-160-251.ngrok.io',
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
    Designation: '/designation',
    GearType: '/gear-type',
    Gear: '/gear',
    LevelCrossing: '/lc'
}

export default Endpoints;
