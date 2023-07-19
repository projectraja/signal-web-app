const Endpoints = {
    Timeout: 30000,
    // BaseURL: 'http://localhost:8080',
    BaseURL: 'https://7da1-2401-4900-1cd4-18a7-8471-e055-be0d-a4ab.ngrok-free.app',
    // User apis
    Registration: '/user/registration',
    Login: '/user/login',
    AdminUser: '/user',
    ResetPassword: '/user/reset-password',
    RefreshToken: '/user/refresh-token',
    // Secure apis
    Station: '/station',
    Platform: '/platform',
    Flyover: '/flyover',
    Train: '/train',
    AssignPlatform: '/assign-platform',
    Advertisement: '/advertisement',
    Display: '/device',
    Language: '/language'
}

export default Endpoints;
