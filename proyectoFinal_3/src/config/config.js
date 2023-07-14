import dotenv from 'dotenv';

dotenv.config({
    path: './.env.dev'
});

export default {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASS,
    jwt_secret: process.env.JWT_SECRET,
    github_id: process.env.GITHUB_ID,
    github_secret: process.env.GITHUB_SECRET,
    github_url: process.env.GITHUB_URL,
}
