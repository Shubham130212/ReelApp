const ImageKit = require("imagekit");

const imageKit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMGE_KIT_END_URL
});

async function uploadImage(file, fileName) {
    const result=await imageKit.upload({
        file: file,
        fileName: fileName
    });
    return result;
}

module.exports={
    uploadImage
};