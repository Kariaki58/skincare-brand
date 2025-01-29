import cloudinary from "./cloudinary";

export const uploadImage = (buffer) => {
    return new Promise((resolve, reject) => {
        if (!(buffer instanceof Buffer) && !(buffer instanceof Uint8Array)) {
            return reject(new Error('Invalid buffer type'));
        }

        const timeout = setTimeout(() => reject(new Error('Cloudinary upload timed out')), 10000); // 10 seconds

        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            clearTimeout(timeout);
            if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
            } else if (result && result.secure_url) {
                resolve(result);
            } else {
                reject(new Error('Failed to upload image'));
            }
        }).end(buffer);
    });
};

export const deleteImage = (image) => {
    return new Promise((resolve, reject) => {
        if (typeof image !== 'string') {
            return reject(new Error('Invalid image ID'));
        }

        cloudinary.uploader.destroy(image, (error, result) => {
            if (error) {
                console.error('Cloudinary delete error:', error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};
