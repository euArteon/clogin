let v1 = document.querySelector('#v1');
let clear = document.querySelector('#clearv1');
let v2 = document.querySelector('#v2');
v1.addEventListener('keyup', formatv1);
function formatv1(){
    v1.value = v1.value.replace(/\D/g,'');
    v1.value = v1.value.replace(/(\d{3})(\d)/,'$1.$2');
    v1.value = v1.value.replace(/(\d{3})(\d)/,'$1.$2');
    v1.value = v1.value.replace(/(\d{3})(\d{1,2})/,'$1-$2');
    v1.value = v1.value.replace(/(-\d{2})\d+?$/,'$1');
    if(v1.value.length == 14){
        getv1 =  v1.value;
        dots = getv1.replace(/\./g,'');
        dash = dots.replace(/\-/g,'');
        document.querySelector('#clearv1').value = dash;
    }
}

let loginBtn = document.querySelector('#loginBtn');
loginBtn.onclick = () => {
    loginBtn.style.backgroundColor = 'rgb(129, 129, 129)'
    validarId()
}

function validarId(){
    if(clear.value.length == 11 && v2.value.length != ''){
        clear = document.querySelector('#clearv1').value;
        ajax1 = new XMLHttpRequest
        ajax1.open('GET',`../clevel/source/clevel.php?v1=${clear}&v2=${v2.value}`)
        ajax1.onloadend = () => {
            resposta = ajax1.responseText
            validarUser(resposta)
            loginBtn.style.backgroundColor = 'black'
        }
        ajax1.send()
    }else{
        loginBtn.style.backgroundColor = 'black'
        alert('Informe sua identificação completa.')
    }
}

function validarUser(data){
    if(data == 'true'){
        document.querySelector('.logo').style.display = 'block';
        document.querySelector('.logo').style.opacity = '1';
        sessionStorage.setItem('01sMRSn','RTHvN7fdW3eN1IV6QI4DUgoynDLesYiIaDAEZRElRYcQG5sP0h')
        limparSessao(300000)
        window.location = 'https://deatly.com/clevel/'
    }else{
        alert('Identificação inválida');
    }
}

function limparSessao(tempo){
    setTimeout(() => {
        sessionStorage.clear()
        alert('Sessão limpa com sucesso')
    }, tempo);
}


document.addEventListener('keyup', function(e){
    var key = e.which || e.keyCode;
    if (key == 13) {
        loginBtn.style.backgroundColor = 'rgb(129, 129, 129)'
        validarId()
      }
})