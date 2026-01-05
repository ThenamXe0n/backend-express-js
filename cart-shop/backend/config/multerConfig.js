import multer from "multer";

const mystorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/img");
  },
  filename: function (req, file, callback) {
    console.log("file is ==>", file);
    // console.log("req is ==>",req)

  
    callback(null, file.fieldname + "-" + Date.now()+".png");
  },
});

const upload = multer({ storage: mystorage });

export default upload;
