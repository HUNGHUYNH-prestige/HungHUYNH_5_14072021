// title h1 header

let h1 = document.getElementById('h1');
h1.classList.add('text-center');
h1.classList.add('bg-warning');
h1.innerHTML = 'Voici votre produit';

// le plus difficile est ici

// get the ID of the product
// query string with ?
// avec ou sans window : retour dans console identique

const queryString = window.location.search;
//console.log('voici le :' + queryString);
// queryString returns voici le :?id=5be9c8541c9d440000665243

// utiliser la classe URLSearchParams
// parametreUrl contient la partie variable de l'URL
// parametreUrl contient les parametres de l'URL

const parametreUrl = new URLSearchParams(queryString);
//console.log(parametreUrl);
// la console liste toute les methods de URLSearchParams

// use get() method of the URLSearchParams to get the first result in parameter
// get('id') can try with get('name')

const productId = parametreUrl.get('id');
//console.log('content :' + productId);
// la console affiche l'id du produit


// function fetch to get products data

function getProduct(url){
    fetch(url)
    .then(function(result){
        if (result.ok){
            return result.json();
        }
    })
    .then(function(data){
        console.log(data);
        //listConsole(data);
        // display the product features
        displayProduct(data, data.colors);
        //console.log('Voici les options : ' + data.colors);
    })
    .catch(function(error){
        error = 'attention';
        console.log('Il y a une erreur :' + error);
        console.error('Message d\'erreur : analyse URL');
        alert('ATTENTION : CHARGEMENT IMPOSSIBLE !');
    })
}

// call the function with fetch + productId with Id
// target the product alone

//getProduct('http://localhost:3000/api/teddies/5be9c8541c9d440000665243');

getProduct('http://localhost:3000/api/teddies/' + productId);
//console.log('url product id :' + productId);


// display data in the console
// control panel
// control data
/*
function listConsole(data){
    console.table(data);
    let ici = window.location;
    console.log('la page est : ' + ici);
    let search = window.location.search;
    console.log('partie variable de la page :' + search);
}
*/

// function
function displayProduct(data, colors){

    //console.log('voir : ' + data);
    // voir : [object Object]
    //console.log('voir : ' + options);
    // voir : Beige,Tan,Chocolate

    let div = document.createElement('div');
    div.classList.add('container');
    div.classList.add('bg-info');
    div.classList.add('d-flex');
    div.classList.add('justify-content-center');
    div.classList.add('align-items-center');
    div.classList.add('flex-wrap');

    
    let container = document.getElementById('products-container');
    container.appendChild(div);

    let nom = document.createElement('h2');
    nom.classList.add('h2');
    nom.classList.add('text-center');
    //console.log(data.name);
    div.appendChild(nom);
    nom.innerHTML = data.name;

    let figure = document.createElement('figure');
    figure.classList.add('d-flex');
    figure.classList.add('justify-content-center');

    div.appendChild(figure);

    let image = document.createElement('img');
    image.classList.add('card-size');
    image.classList.add('src');
    figure.appendChild(image);

    let source = data.imageUrl;
    //console.log(source);

    image.src = source;
    //console.log(image.src);

    let texte = document.createElement('p');
    texte.innerHTML = data.description;
    nom.appendChild(texte);
    //console.log(data.description);
    //console.log(texte);

    let prix = document.createElement('p');
    prix.innerHTML = data.price/100 + ' euros';
    nom.appendChild(prix);
    //console.log(prix);
    //console.log(data.price);

    let formulaire = document.createElement('form');
    
    nom.appendChild(formulaire);

    let label = document.createElement('label');
    label.innerHTML = 'Faire un choix difficile :';

    formulaire.appendChild(label);


    let select = document.createElement('select');
    formulaire.appendChild(select);

    // get all color options in array from data table
    // get the color choice in the data.colors
    
    for (color = 0 ; color < colors.length ; color++){
        //console.log('indice de couleur : ' + color);
        //console.log('table de couleur : ' + colors);
        //console.log(colors.length);

        let option = document.createElement('option');
        option.innerHTML = colors[color];
        option.value = colors[color];

        //console.log('value : ' + option.value);
        //console.log('innerHTML : ' + option.innerHTML);

        select.appendChild(option);

    }

    let acheter = document.createElement('button');
    acheter.classList.add('btn');
    acheter.classList.add('btn-warning');
    acheter.innerHTML = 'Acheter';
        
    nom.appendChild(acheter);


    acheter.addEventListener('click', function(){
        mettreDansPanier(data);

    });

}


function mettreDansPanier(data){

    //console.log(data);

    // by default nombre = 1

    let nombre = 1;
    //console.log(nombre);

    let article = {
        nom : data.name,
        image : data.imageUrl,
        texte : data.description,
        prix : data.price/100 + ' euros',
        identifiant : data._id,
        quantite : nombre
    }
    console.log(article);
    console.table(article);
    // get data of the article : ok

    // function =>
    const messageConfirmation = () => {
        if (window.confirm(`Excellent choix : produit dans le panier !
OK pour aller au panier
ANNULER pour aller sur la page principale`)){
            window.location.href = 'panier.html';
        }else{
            window.location.href = 'index.html';
        }
    }

    // parse     => transforme le json en js
    // stringify => transforme le js   en json

    // mettre en place le local storage avec le getItem 

    let marchandise = JSON.parse(localStorage.getItem('panier'));
    //console.log(marchandise);

    // si local storage non vide = rempli = non null
    if (marchandise){
        marchandise.push(article);
        localStorage.setItem('panier', JSON.stringify(marchandise));
        console.log(marchandise);
        console.log('je suis dans le if');
        messageConfirmation();

    }
    // si local storage vide = non rempli = null
    else{
        marchandise = [];
        marchandise.push(article);
        localStorage.setItem('panier', JSON.stringify(marchandise));
        console.log(marchandise);
        console.log('je suis dans le else');
        messageConfirmation();

    }
}