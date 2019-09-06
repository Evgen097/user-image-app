
try {

    console.log('ajax loadin...')

let base = 'localhost:8080/';
var ajax = {};

ajax.get = (path='/', params='?')=>{
    console.log('ajax.get...');

    var req = new XMLHttpRequest();
    req.open('GET', 'base'+params, false);
    req.send(null);

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        console.log( xhr.responseText );
    }
};

ajax.post = (path='/', data='Message from client', callback)=>{
    console.log('ajax.post...');
    console.log('path: ', path);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', path, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(data))
    xhr.send( JSON.stringify( data ));

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
    } else {
        console.log( xhr.responseText );
        callback( null, JSON.parse(xhr.responseText));
    }
};

    ajax.postFile = (path='/', data, callback)=>{
        if(!data) return callback(new Error(''))
        console.log('ajax.postFile...');
        console.log('path: ', path);

        var longInt8View = new Uint8Array(data);
        var xhr = new XMLHttpRequest;
        xhr.open("POST", path, false);
        xhr.send(longInt8View);

        if (xhr.status != 200) {
            console.log( xhr.status + ': ' + xhr.statusText );
            callback(new Error("Error on server while saving image!!!"))
        } else {
            console.log('Responce from server...');
            console.log( xhr.responseText );
            callback(null, xhr.responseText)
        }
    };



}catch (e) {
    console.error(e)
}










