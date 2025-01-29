import cloudinary from "./cloudinary";


export const uploadImage = (buffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(buffer);
    });
};


export const deleteImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(image, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};
