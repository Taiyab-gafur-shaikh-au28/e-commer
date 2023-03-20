import dotenv from 'dotenv'
dotenv.config()
export const {
    APP_PORT,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRE,
    COOKIE_EXPIRE,
    SMPT_SERVICE,
    SMPT_MAIL,
    SMPT_PASSWORD,
    SMPT_HOST,
    SMPT_PORT,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET

} = process.env;
