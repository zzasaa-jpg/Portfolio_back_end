document.getElementById("form").addEventListener("submit", sendData);
async function sendData(E) {
    E.preventDefault();
    loader(true);
    const formDta = new FormData();
    formDta.append("title", document.getElementById("title").value);
    formDta.append("weblink", document.getElementById("weblink").value);
    formDta.append("technologies", document.getElementById("tech").value);
    formDta.append("github", document.getElementById("githublink").value);
    formDta.append("lastupdate", document.getElementById("lastupdate").value);
    formDta.append("description", document.getElementById("projectdescription").value);

    appendFiles("images-loptop");
    appendFiles("videos-loptop");
    appendFiles("images-tab");

    const response = await fetch("http://localhost:9090/storedata", {
        method: "POST",
        body: formDta,
    });
    console.log("responseStatus:", response.status);
    if (response.ok) {
        const results = await response.json();
        loader(false);
        notification("successful data Stored!");
        console.log(results);
    } else {
        console.error("Failed")
    }

    function appendFiles(fieldName) {
        const files = document.getElementById(fieldName).files;
        for (let i = 0; i < files.length; i++) {
            formDta.append(fieldName, files[i]);
        }
    }
}

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
    notification.style.zIndex = "4";
    setTimeout(() => {
        notification.style.transform = "translateX(-250px)";
    }, 2000)
}

function loader(value) {
    let form = document.getElementById("form");
    let loader_wrapper = document.getElementById("loader_wrapper");
    let submit = document.getElementById("submit");
    if (value) {
        loader_wrapper.style.display = "flex";
        submit.innerText ='';
        submit.style.padding= "8px";
        submit.appendChild(loader_wrapper);
    } else {
        loader_wrapper.style.display = "none";
        submit.innerText = "Submit";
        submit.style.padding= "5px";
        setTimeout(() => {
            location.reload();
        }, 2100);
    }
}