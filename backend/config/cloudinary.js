const cloudinary = require('cloudinary').v2;

cloudinary.uploader
  .upload("my_image.jpg")
  .then(result=>console.log(result));

  