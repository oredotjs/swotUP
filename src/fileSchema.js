const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
});

// Creating a Model from that Schema
const File = mongoose.model("File", fileSchema);

// Exporting the Model to use it in app.js File.
module.exports = File;

/*
/*
// Upload File Base64
app.post('/upload', (req, res) => {
 let filePath = `./helpers/${Date.now()}_${req.body.name.replace(new RegExp(' ','g'),'_')}`;
 //let fila = './helpers'
 let buffer = Buffer.from(req.body.base64.split(',')[1], "base64");

 fs.writeFileSync(path.join(__dirname, filePath), buffer);

 res.json(filePath);
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
const uploadImage = async (req, res, next) => {
// to declare some path to store your converted image
const matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
response = {};
 
if (matches.length !== 3) {
return new Error('Invalid input string');
}
 
response.type = matches[1];
response.data = new Buffer(matches[2], 'base64');
let decodedImg = response;
let imageBuffer = decodedImg.data;
let type = decodedImg.type;
let extension = mime.extension(type);
let fileName = "image." + extension;
try {
fs.writeFileSync("./helpers/" + fileName, imageBuffer, 'utf8');
return res.send({"status":"success"});
} catch (e) {
 console.log(e)
}
}
 
app.post('/upload/image', uploadImage)



app.use(express.static('./helpers'))

app.post('/upload', (req, res) => {
 const { image } = req.body;
 base64Img.img(image, './helpers', Date.now(), function(err, filepath) {
   const pathArr = filepath.split('/')
   const fileName = pathArr[pathArr.length - 1];

   res.status(200).json({
     success: true,
     url: `http://127.0.0.1:${port}/${fileName}`
   })
 });
});
*/

//app.use(express.static(__dirname, './helpers'));
//app.set("views",path.join(__dirname,"./helpers/views"))
/*

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, "src/helpers/images")
  },
  filename: function (req, file, cb) {
   cb(null, file.fieldname + "-" + Date.now()+".jpg")
  }
 })
 
 //const maxSize = 1 * 1000 * 1000; // MaxSize: 1mb
 //let file; //const files = ("files", number)
 
 const fileFilter = (req, file, cb) => {
   const filetypes = /jpeg|jpg|png/;
   const mimetype = filetypes.test(file.mimetype);
  
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   
   if (mimetype && extname) {
     return cb(null, true);
   }
  
   cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
 }
  
 
 const upload = multer({ 
  storage: storage,
  //limits: { fileSize: maxSize },
  fileFilter: fileFilter,
 }).any();       
 
 /*
 const upload = multer({ 
   storage: storage,
   //limits: { fileSize: maxSize },
   fileFilter: fileFilter,
 });
 
 app.post("/upload",function (req, res, next) {
  upload(req,res,function(err) {
   if(err) {
    console.log(err);
   } else { res.send("Success, Image uploaded!")}
  })
 })
 
 app.post("/upload", upload);
*/