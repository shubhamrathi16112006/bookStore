const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const isAuthenticated = require("../middleware/authMiddleware"); 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


const upload = multer({ storage });

router.use(isAuthenticated);

router.get("/", bookController.getBook);
router.get("/add", bookController.addBook);
router.post("/add",upload.single("image"), bookController.createBook);
router.get("/edit/:id", bookController.editBook);
router.post("/update/:id",upload.single("image"), bookController.updateBook);
router.get("/delete/:id", bookController.deleteBook);

module.exports = router;