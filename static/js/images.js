
// <form id="imageform" name="uploadimage"  enctype="multipart/form-data">
//     <input id="fileinput" class="w3-input w3-border"
// type="file" placeholder="choose file" name="files" multiple  required>
// <button id="sendbtn" class="w3-button w3-black w3-section" type="submit">
//     <i class="fa fa-paper-plane"></i> Login
//     </button>
//     </form>


let start =()=>{
try {
    let base = 'http://localhost:8080';
    console.log('Starting images...');
    let getImages;

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

    let handleAjax = (err, data) =>{
        errorpanel.innerHTML = '';
        succespanel.innerHTML = '';
        try {
            if((err.type && err.type ==='info') || err.msg) succespanel.innerHTML = err.msg
        }catch (e) {
            if (err) return  ajaxError(err);
            succespanel.innerHTML = `${data}`
        }
        getImages();
    }



    let uploadFiles = ()=>{
        try {
            console.log('Starting uploading files...');
            let name = localStorage.getItem('name');
            let token = localStorage.getItem('token');

            if(!name || !token) return errorpanel.innerHTML = 'Please Login!';

            let readFile =(file)=>{
                var reader = new FileReader();
                reader.onload = event => ajax.postFile('/images', `?name=${name}&token=${token}`, event.target.result, handleAjax);
                reader.onerror = event=> console.error("File could not be read! Code " + event.target.error.code);;
                reader.readAsArrayBuffer(file);
            };
            let files = fileinput.files;
            for(let file of files){
                console.log(file.type)
                if (file.type !== 'image/jpeg')  errorpanel.innerHTML = 'Only "jpeg" !!!';
                else readFile(file);
            }
            fileinput.value = '';

        }catch (e) {
            console.log(e)
        }
        return false;
    };

    let deleteImg = (event)=>{
        console.log(event.target.dataset.image)
        let image = event.target.dataset.image;
        let name = localStorage.getItem('name');
        let token = localStorage.getItem('token');

        if(!name || !token) {
            errorpanel.innerHTML = 'Please Login!';
            return false
        };

        ajax.delete('images/'+image, `?name=${name}&token=${token}`, handleAjax);
        return false;

    }

    let addImagesToGallery = (user)=>{
        console.log('add to galleyr....')
        try {
            let imagesArr = Array.from(document.getElementsByTagName('li'));
            imagesArr.forEach(img=> img.parentElement.removeChild(img))

            user = JSON.parse(user)[0]
            if(!user.images || !user.images.length) return errorpanel.innerHTML = 'No images found!';
            console.log(user)
            user.images.forEach(image=>{
                let li = document.createElement('li');
                let img = document.createElement('img');
                let btn = document.createElement('button');
                btn.classList = "w3-btn w3-white w3-border w3-border-red w3-text-red w3-round";
                btn.innerHTML = 'delete';
                btn.style.margin = '40px';
                btn.onclick = deleteImg;
                btn.dataset.image = image;

                img.src = `${base}/images/${image}`;
                img.style.width = '200px';
                li.appendChild(img);
                li.appendChild(btn)
                gallery.appendChild(li);
            })
        }catch (e) {
            console.log(e)
        }
    }

    getImages = ()=>{
        let name = localStorage.getItem('name');
        let token = localStorage.getItem('token');

        if(!name || !token) {
            errorpanel.innerHTML = 'Please Login!'
            return false
        };

        ajax.get('users', `?name=${name}&token=${token}`, addImagesToGallery)
        return false
    }

    let showUserName = ()=>{
        let name = localStorage.getItem('name', '');
        console.log('name,  ',name)
        if(name && name.length) {
            username.innerHTML = "Welcome " + name + ' !  ';
        }else {
            username.innerHTML = '';
        }
        return false
    }
    showUserName()

    let logout = ()=>{
        localStorage.setItem('name', '');
        localStorage.setItem('token', '');
        showUserName();
        document.location.reload(true);
        return false;
    }
    logoutbtn.onclick = logout;





    imageform.onsubmit = uploadFiles;
    refreshImg.onclick = getImages;
    getImages()





}catch (e) {
    console.log(e)
}
}

window.onload = start;



























