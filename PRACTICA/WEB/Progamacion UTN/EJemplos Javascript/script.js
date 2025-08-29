const numero = num => 
    `el numero es: ${num}`;

//console.log(numero(15));


const web = {
    nombre: 'Mi pagina web',
    links: {
        enlace: 'www.mipagina.com',
        social: {
            facebook: 'fb.com/mipagina',
            twitter: 'twitter.com/mipagina',
        }
    },
    redesVideo:{
        youtube: 'youtube.com/mipagina',
        vimeo: 'vimeo.com/mipagina'
    }
}

const {redesVideo: {youtube, vimeo}, nombre} = web;
console.log(nombre);
console.log(youtube);
console.log(vimeo);