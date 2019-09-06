
let sartLogin = ()=>{
try {

    console.log('Startin Login page...');

    let showInfoMessage = (msg)=>{

    }

    let ajaxError = (msg)=>{
        errorpanel.innerHTML = 'AJAX ERROR: ' + msg.toString();
        return true;
    }

    let handleAjax = (err, data)=>{
        if (err) return  ajaxError(err);
        succespanel.innerHTML = `User "${data.name}" ${data.msg} successeful !!!`
        setTimeout(()=>{
            // window.location.href = `/users/${data.id}`;
        }, 1000)
    }

    let registration = ()=>{
        console.log('registration...');
        let obj = {name: username.value, password: userpassword.value}
        ajax.post('/registration', obj, handleAjax)
    }

    let submitForm = (event)=>{
        console.log('submitForm Login page...');
        let obj = {name: username.value, password: userpassword.value}
        ajax.post('/login', obj, handleAjax)
        return false;
    };

    // setTimeout(()=>submitForm(), 500)

     let inputError = (msg, event)=>{
         event.target.style.color = 'red';
         errorpanel.innerHTML = 'ERROR: ' + msg;
         return false;
     }

    let disableBtns = ()=>{
        let buttons = Array.from( document.getElementsByClassName('w3-button') );
        buttons.forEach( (button)=> {
            button.disabled = !username.value.length || !userpassword.value.length;
        })
    }

     let changeInput = (event)=>{
         disableBtns();
         event.target.style.color = 'black';
         errorpanel.innerHTML = '';
         let text = event.target.value;
         if(!text.match(/^[\w]{1,10}$/)) return inputError('Only simbols and numbers, max 10!', event)
         return true;
     }

    let inputs = Array.from( document.getElementsByTagName('input') );
    inputs.forEach((input)=> input.oninput = changeInput)

    loginform.onsubmit = submitForm;

    sendbtnRegister.onclick = registration;

    disableBtns()


}catch (e) {console.log(e)}

}

window.onload = sartLogin;

























