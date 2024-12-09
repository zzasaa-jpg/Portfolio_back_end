const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");

mongoose.connect('mongodb+srv://zzsdrt354:SrQzx3GgKGM9cer@cluster0.fktok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Projects', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 200 * 1024 * 1024 } });

const ProjectSchema = new mongoose.Schema({
    title: String,
    weblink: String,
    technologies: String,
    github: String,
    lastupdate: String,
    description: String,
    files: Object,
});

const Project = mongoose.model("Projects", ProjectSchema);

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.post("/storedata", upload.fields([
    { name: "images-loptop", maxCount: 10 },
    { name: "videos-loptop", maxCount: 10 },
    { name: "images-tab", maxCount: 10 },
]), async (req, res) => {
    try {
        const a = { title, weblink, technologies, github, lastupdate, description } = req.body;
        console.log(a)
        const files = req.files;

        const newProject = new Project({
            title,
            weblink,
            technologies,
            github,
            lastupdate,
            description,
            files
        });

        const savedData = await newProject.save();
        console.log("Data saved successfully!", savedData);
        res.status(200).json({ message: "Data saved successfully!", data: savedData })
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ message: "error saving data", error });
    }

})

app.get("/projects", async (req, res) => {
    try {
        const data = await Project.find();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("error", error);

    }
});

app.get("/projects/:id", async (req, res) => {
    const project_id = req.params.id;
    console.log(project_id)
    try {
        const data = await Project.findById(project_id);
        console.log("succefully data rendered", data);
        res.status(200).send({ message: "succefully data rendered", data: data });
    } catch (error) {
        console.error("error", error);
        res.status(500).send({ message: "Error for getting data", error: error });
    }
})

app.get("/editProject", (req, res) => {
    res.sendFile(path.join(__dirname, "views/project.html"))
})


app.post("/editProjects/:id", async (req, res) => {
    const project_id = req.params.id;
    console.log(project_id)
    const { title, github, weblink, technologies, lastupdate, description } = req.body;
    try {
        const data = await Project.findByIdAndUpdate(project_id, { title, github, weblink, technologies, lastupdate, description }, { new: true });
        console.log("successfully edit data", data);
        res.status(200).send({ message: "succesfully edited data", data: data });
    } catch (error) {
        console.log("error", error);
        res.stastus(500).send({ message: "not getting data", error: error });
    }
});


app.delete("/deleteIMG/:id", async (req, res) => {
    const id = req.params.id;
    const { originalname, fieldname } = req.body;
    console.log("Request body:", req.body);
    try {
        const data = await Project.findByIdAndUpdate(
            id,
            { $pull: { [`files.${fieldname}`]: { originalname: originalname } } },
            { new: true }
        );
        console.log("Successfully deleted data", data);
        res.status(200).json({ message: "Successfully deleted image!", data: data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Error deleting the image", error });
    }
});

app.post("/insertIMG/:id", upload.fields([
    { name: "images-loptop", maxCount: 10 },
    { name: "videos-loptop", maxCount: 10 },
    { name: "images-tab", maxCount: 10 }]), async (req, res) => {
        const id = req.params.id;
        const newFiles = req.files;
        try {
            const project = await Project.findById(id);
            if (!project) {
                return res.status(404).send({ message: "project not found!" });
            }

            const uploadFiles = { ...project.files };
            for (const key in newFiles) {
                if (!uploadFiles[key]) {
                    uploadFiles[key] = [];
                }
                uploadFiles[key] = uploadFiles[key].concat(newFiles[key]);
            }
            const data = await Project.findByIdAndUpdate(id, { files: uploadFiles }, { new: true });
            console.log(data);
            res.status(200).send({ message: "succesfully IMG added!", data: data });
        } catch (error) {
            console.error("error", error);
            res.status(500).send({ message: "Error in addeding the IMG", error });
        }
    })

app.delete("/delProject/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const data = await Project.findByIdAndDelete(id);
        console.log("successfully deleted data!", data);
        res.status(200).send({ message: "successfully deleted data!", data: data });
    } catch (error) {
        console.error("error", error);
        res.status(500).send({ message: "Not getting data!", error: error });
    }
})
app.listen(9090, () => {
    console.log(`APP RUNNING ON ${9090}`);
})