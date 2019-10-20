getLocalStorageItem();

function getLocalStorageItem() {
    if (localStorage.getItem("video")) { //Check for local storage if there any video saved
        let video = JSON.parse(localStorage.getItem("video"))
        document.getElementById("title").innerText = video["title"];
        document.getElementById("duration").innerText = "Duration: " + video["duration"];
        let div = document.getElementById("downloads");
        video.formats.forEach(element => { //Show different video formats
            if (element.acodec !== "none") {
                var btn = document.createElement("a");
                btn.setAttribute("class", "btn btn-success btn-block");
                btn.setAttribute("target", "_blank");
                btn.setAttribute("href", element.url);

                var text = document.createTextNode("Download " + element.width + "p");

                btn.appendChild(text);

                div.appendChild(btn)
            }
        });
    }else{
        let div = document.getElementById("downloads");

        var text = document.createTextNode("There is No Video Detected");

        div.appendChild(text);
    }
}
