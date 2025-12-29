import { mixed } from 'yup';

// Check file size in MB
export const size = (max = 2) => 
    mixed().required().test(
        "file-size",
        `حجم فایل نباید بیشتر از ${ max } مگابایت باشد.`,
        (value) => {
            if (!value) return false;
            return value.size <= max * 1024 * 1024;
        }
    );

// Check file type (accept only certain MIME types)
export const type = (types = ["image/jpeg", "image/png", "application/pdf"]) => 
    mixed().required().test(
        "file-type",
        "فرمت فایل پشتیبانی نمی‌شود.",
        (value) => {
            if (!value) return false;
            return types.includes(value.type);
        }
    );