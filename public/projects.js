async function a() {
    const response = await fetch("http://localhost:9090/projects");
    let project_id = document.getElementById("project-id");
    let change_element = document.getElementById("change_element");
    change_element.disabled = true;
    console.log(response.status);
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        data.forEach(ids => {
            // console.log(ids)
            project_id.innerHTML += `<option value =${ids._id}>${ids._id}</option>`;
        });
    } else {
        console.error("Error in fetching!");
    }
}
a()

function projects_id() {
    let project_id = document.getElementById("project-id");
    project_id.addEventListener("change", async function () {
        // console.log(project_id.value);
        const response = await fetch(`http://localhost:9090/projects/${project_id.value}`);
        console.log(response.status);
        if (response.ok) {
            const results = await response.json();
            console.log(results);
            change_element.disabled = false;
            //-----------------------------------------------------------------------------
            change_element.addEventListener("change", async function () {
                console.log(change_element.value);
                //-------------------------------------------------------------------------
                if (change_element.value === "title") {
                    if (results.data.title) {
                        console.log(project_id.value)
                        const title = document.getElementById("title");
                        title.style.display = "flex";
                        title.value = results.data.title;
                        const update = document.getElementById("update");
                        update.style.display = "flex";
                        //----------------------------------------------------------------
                        document.getElementById("editformtitle").addEventListener("submit", async function (E) {
                            E.preventDefault();
                            loader(true);
                            let updateTitle = title.value;
                            const response = await fetch(`http://localhost:9090/editProjects/${project_id.value}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json" // Sending data as JSON
                                },
                                body: JSON.stringify({ title: updateTitle })
                            });
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                loader(false)
                                notification("successful title updated");
                                console.log(data);
                            } else {
                                console.log("error");
                            }

                        })
                    }
                }
                if (change_element.value === "githublink") {
                    if (results.data.github) {
                        const githublink = document.getElementById("githublink");
                        githublink.style.display = "flex";
                        githublink.value = results.data.github;
                        const update2 = document.getElementById("update2");
                        update2.style.display = "flex";
                        document.getElementById("editformgithublink").addEventListener("submit", async function (E) {
                            E.preventDefault();
                            loader(true);
                            let updateGithublink = githublink.value;
                            const response = await fetch(`http://localhost:9090/editProjects/${project_id.value}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ github: updateGithublink })
                            })
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                loader(false)
                                notification("successful github updated");
                                console.log(data);
                            } else {
                                console.error("error");
                            }
                        })
                    }
                }
                if (change_element.value === "weblink") {
                    if (results.data.weblink) {
                        const weblink = document.getElementById("weblink");
                        weblink.style.display = "flex";
                        weblink.value = results.data.weblink;
                        const update3 = document.getElementById("update3");
                        update3.style.display = "flex";
                        document.getElementById("editformweblink").addEventListener("submit", async function (E) {
                            E.preventDefault();
                            loader(true);
                            let updateWeblink = weblink.value;
                            const response = await fetch(`http://localhost:9090/editProjects/${project_id.value}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ weblink: updateWeblink })
                            })
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                loader(false)
                                notification("successful weblink updated");
                                console.log(data);
                            } else {
                                console.error("Error");
                            }
                        })
                    }
                }
                if (change_element.value === "technologies") {
                    if (results.data.technologies) {
                        const tech = document.getElementById("tech");
                        tech.style.display = "flex";
                        tech.value = results.data.technologies;
                        const update4 = document.getElementById("update4");
                        update4.style.display = "flex";
                        document.getElementById("editformtech").addEventListener("submit", async function (E) {
                            E.preventDefault();
                            loader(true);
                            let updateTech = tech.value;
                            const response = await fetch(`http://localhost:9090/editProjects/${project_id.value}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ technologies: updateTech })
                            })
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                loader(false)
                                notification("successful techs updated");
                                console.log(data);
                            } else {
                                console.log("ERROR")
                            }
                        })
                    }
                }
                if (change_element.value === "lastupdate") {
                    if (results.data.lastupdate) {
                        const lastupdate = document.getElementById("lastupdate");
                        lastupdate.style.display = "flex";
                        lastupdate.value = results.data.lastupdate;
                        let update5 = document.getElementById("update5");
                        update5.style.display = "flex";
                        document.getElementById("editformlastupdate").addEventListener("submit", async function (E) {
                            E.preventDefault();
                            loader(true);
                            let updateLastUpdate = lastupdate.value;
                            const response = await fetch(`http://localhost:9090/editProjects/${project_id.value}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ lastupdate: updateLastUpdate })
                            })
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                loader(false)
                                notification("successful last updated");
                                console.log(data);
                            } else {
                                console.error("error");
                            }
                        })
                    }
                }
                if (change_element.value === "description") {
                    if (results.data.description) {
                        const projectdescription = document.getElementById("projectdescription");
                        projectdescription.style.display = "flex";
                        projectdescription.value = results.data.description;
                        let update6 = document.getElementById("update6");
                        update6.style.display = "flex";
                        document.getElementById("editformprojectdescription").addEventListener("submit", async function (E) {
                            E.preventDefault();
                            loader(true);
                            let updateProjectDescription = projectdescription.value;
                            const response = await fetch(`http://localhost:9090/editProjects/${project_id.value}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ description: updateProjectDescription })
                            })
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                loader(false)
                                notification("successful descrp updated");
                                console.log(data);
                            } else {
                                console.error("error");
                            }
                        })
                    }
                }
                if (change_element.value === "images") {
                    if (results.data.files) {
                        const images_edit = document.getElementById("images_edit");
                        images_edit.style.display = "flex";
                        const images_edit2 = document.getElementById("images_edit2");
                        images_edit2.style.display = "flex";
                        images_edit2.style.flexWrap = "wrap";
                        const uploadtheImg = document.getElementById("uploadtheImg");
                        uploadtheImg.addEventListener("change", function () {
                            console.log(uploadtheImg.value);
                            //file id and button ---------------------------------------------
                            const form_image_loptop = document.getElementById("form_image_loptop");
                            const upload1 = document.getElementById("upload1");
                            if (uploadtheImg.value === "insert") {
                                images_edit2.style.display = " none";
                                form_image_loptop.style.display = "flex";
                                upload1.style.display = "flex";
                                //-----------inserting the file -------------------------------
                                form_image_loptop.addEventListener("submit", async function (E) {
                                    E.preventDefault();
                                    loader(true);
                                    const formData = new FormData();
                                    let id = results.data._id;
                                    console.log(id)
                                    appendFiles("images-loptop");
                                    appendFiles("videos-loptop");
                                    appendFiles("images-tab");

                                    const response = await fetch(`http://localhost:9090/insertIMG/${id}`, {
                                        method: "POST",
                                        body: formData,
                                    })
                                    console.log(response.status);
                                    if (response.ok) {
                                        const results = await response.json();
                                        loader(false)
                                        notification("successful img iserted");
                                        console.log(results);
                                    } else {
                                        console.error("error");
                                    }
                                    function appendFiles(fieldNames) {
                                        const files = document.getElementById(fieldNames).files;
                                        for (let i = 0; i < files.length; i++) {
                                            formData.append(fieldNames, files[i]);
                                        }
                                    }
                                })
                            } else {
                                form_image_loptop.style.display = "none";
                                upload1.style.display = "none";
                                images_edit2.style.display = " flex"
                            }
                        });

                        console.log(results.data.files)
                        Object.keys(results.data.files).forEach(img => {
                            console.log(results.data.files[img]);
                            results.data.files[img].forEach(el => {
                                console.log("ELEMENTS", el)
                                const wrapper = document.createElement("div");
                                wrapper.className = "image-wrapper";
                                const imageElement = document.createElement("img");
                                imageElement.src = `data:image/png;base64,${el.buffer}`;
                                imageElement.alt = "IMG";
                                imageElement.width = 100;
                                const checkbox = document.createElement("input");
                                checkbox.type = "checkbox";
                                checkbox.name = "check";
                                checkbox.addEventListener("change", async function () {
                                    if (checkbox.checked) {
                                        let id = results.data._id;
                                        loader(true);
                                        console.log(el.fieldname, el.originalname, results.data._id);
                                        const response = await fetch(`http://localhost:9090/deleteIMG/${id}`, {
                                            method: "DELETE",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ fieldname: el.fieldname, originalname: el.originalname })
                                        })
                                        console.log(response.status);
                                        if (response.ok) {
                                            const data = await response.json();
                                            loader(false)
                                            notification("successful img deleted");
                                            console.log(data);
                                        } else {
                                            console.error("errro");
                                        }
                                    }
                                })

                                wrapper.appendChild(imageElement);
                                wrapper.appendChild(checkbox);

                                images_edit2.appendChild(wrapper);

                            });
                        });
                    }
                }
                if (change_element.value == "delete_Project") {
                    const confirmation = confirm("deleting the project!");
                    if (confirmation) {
                        const id = project_id.value;
                        loader(true);
                        console.log(id)
                        try {
                            const response = await fetch(`http://localhost:9090/delProject/${id}`, {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                            });
                            console.log(response.status);
                            if (response.ok) {
                                const data = await response.json();
                                console.log(data);
                                loader(false);
                                setTimeout(() => {
                                    location.reload()
                                }, 500)

                            }
                        } catch (error) {
                            console.error("error");
                        }
                    } else {
                        console.log("deletation CANCELD!")
                    }
                }
            })
        } else {
            console.error("Error in fetching!");
        }
    })
}
projects_id()

function notification(message) {
    let notification = document.getElementById("notification");
    let notification_info = document.getElementById("notification_info");
    notification.style.display = "flex";
    notification.style.transition = "All";
    notification.style.transitionDuration = "0.3s";
    notification.style.transform = "translateX(0px)";
    notification.style.top = "15px";
    notification.style.left = "10px";
    notification_info.innerText = message;
    setTimeout(() => {
        notification.style.transform = "translateX(-250px)";
    }, 2000)
}

function loader(value) {
    let loader_wrapper = document.getElementById("loader_wrapper");
    let editformtitle = document.getElementById("editformtitle");
    let editformgithublink = document.getElementById("editformgithublink");
    let editformweblink = document.getElementById("editformweblink");
    let editformtech = document.getElementById("editformtech");
    let editformlastupdate = document.getElementById("editformlastupdate");
    let editformprojectdescription = document.getElementById("editformprojectdescription");
    let form_image_loptop = document.getElementById("form_image_loptop");
    if (value) {
        loader_wrapper.style.display = "flex";
        editformtitle.style.display = "none";
        editformtitle.appendChild(loader_wrapper)
        //-------------------------------------
        editformgithublink.style.display = "none";
        editformgithublink.appendChild(loader_wrapper);
        //------------------------------------------
        editformweblink.style.display = "none";
        editformweblink.appendChild(loader_wrapper);
        //-------------------------------------------------
        editformtech.style.display = "none";
        editformtech.appendChild(loader_wrapper);
        //--------------------------------------------
        editformlastupdate.style.display = "none";
        editformlastupdate.appendChild(loader_wrapper);
        //----------------------------------------------
        editformprojectdescription.style.display = "none";
        editformprojectdescription.appendChild(loader_wrapper);
    } else {
        loader_wrapper.style.display = "none";
        editformtitle.style.display = "block";
        // editformtitle.removeChild(loader_wrapper);
        //------------------------------------------------
        editformgithublink.style.display = "block";
        // editformgithublink.removeChild(loader_wrapper);
        //------------------------------------------
        editformweblink.style.display = "block";
        // editformweblink.removeChild(loader_wrapper);
        //-------------------------------------------------
        editformtech.style.display = "block";
        // editformtech.removeChild(loader_wrapper);
        //--------------------------------------------
        editformlastupdate.style.display = "block";
        // editformlastupdate.removeChild(loader_wrapper);
        //----------------------------------------------
        editformprojectdescription.style.display = "block";
        // editformprojectdescription.removeChild(loader_wrapper);
        setTimeout(() => {
            location.reload();
        }, 2100);

    }
}