let bilder = {}

function LoadGenres() {
    fetch("/api/games/getgenres").then(data => {
        return data.json()
    }).then(data => {
        console.log(data)
        let master = document.getElementById("inputgenre")
        data[0].data.rows.forEach(entry => {
            let opt = document.createElement("option")
            opt.innerText = entry.Bezeichnung
            master.appendChild(opt)
        });
    })
}
function LoadPlatform() {
    fetch("/api/games/getplatform").then(data => {
        return data.json()
    }).then(data => {
        console.log(data)
        let master = document.getElementById("inputplatf")
        data[0].data.rows.forEach(entry => {
            let opt = document.createElement("option")
            opt.innerText = entry.Bezeichnung
            master.appendChild(opt)
        });
    })
}

function LoadReleaser() {
    fetch("/api/games/getstudio").then(data => {
        return data.json()
    }).then(data => {
        console.log(data)
        let master = document.getElementById("inputreleaser")
        data[0].data.rows.forEach(entry => {
            let opt = document.createElement("option")
            opt.innerText = entry.Bezeichnung
            master.appendChild(opt)
        });
    })
}

function LoadFSK() {
    fetch("/api/games/getfsk").then(data => {
        return data.json()
    }).then(data => {
        console.log(data)
        let master = document.getElementById("inputfsk")
        data[0].data.rows.forEach(entry => {
            let opt = document.createElement("option")
            opt.innerText = entry.FSKText
            master.appendChild(opt)
        });
    })
}
function submitdata() {
    let data = new FormData()
    data.append('file', bilder)
    data.append('genres', getSelected("inputgenre"))
    data.append('platform', getSelected("inputplatf"))
    data.append('releaser', getSelected("inputreleaser"))
    data.append('fsk', getSelected("inputfsk"))
    console.log(data)
    fetch('/api/games/addgames', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'multipart/form-data'
          },
    })
}

function load() {
    LoadGenres()
    LoadPlatform()
    LoadReleaser()
    LoadFSK()
}
function handleFiles(files) {
    console.log(files)
    bilder = files
}

function getSelected(selector) {
    const selected = document.querySelectorAll(selector + ' option:checked');
    return Array.from(selected).map(el => el.value);
}
/*

*/