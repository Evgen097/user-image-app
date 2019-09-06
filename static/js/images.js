
// <form id="imageform" name="uploadimage"  enctype="multipart/form-data">
//     <input id="fileinput" class="w3-input w3-border"
// type="file" placeholder="choose file" name="files" multiple  required>
// <button id="sendbtn" class="w3-button w3-black w3-section" type="submit">
//     <i class="fa fa-paper-plane"></i> Login
//     </button>
//     </form>


let start =()=>{
try {

    console.log('Starting images...')

    let ajaxError = (msg)=>{
        errorpanel.innerHTML = 'AJAX ERROR: ' + msg.toString();
        return true;
    }

    let createImageFromBuffer = (buffer)=>{
        let arrayBufferView = new Uint8Array( buffer );
        let blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL( blob );

        let img = document.createElement('img');
        img.src = imageUrl;
        let li = document.createElement('li');
        li.appendChild(img)
        gallery.appendChild(li)
    }
    let handleAjax = (err, data)=>{
        if (err) return  ajaxError(err);
        succespanel.innerHTML = `${data}`
    }



    let uploadFiles = ()=>{
        try {
            console.log('Starting uploading files...')
            let readFile =(file)=>{
                var reader = new FileReader();
                reader.onload = event => ajax.postFile('/images', event.target.result, handleAjax);
                reader.onerror = event=> console.error("File could not be read! Code " + event.target.error.code);;
                reader.readAsArrayBuffer(file);
            };
            let files = fileinput.files;
            for(let file of files){readFile(file)}

        }catch (e) {
            console.log(e)
        }
        return false;
    }


    imageform.onsubmit = uploadFiles;






}catch (e) {
    console.log(e)
}
}

window.onload = start;



























