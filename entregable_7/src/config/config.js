import dotenv from 'dotenv';

dotenv.config({
    path: './.env.dev'
});

export default {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASS,
}