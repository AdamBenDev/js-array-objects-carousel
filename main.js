console.log('JS OK');

/* Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
 Creare un carosello.
*/

// Creo un array di oggetti letterali per popolare dinamicamente il carosello
const source = [
  {
    image: 'assets/img/01.webp',
    title: 'Marvel\'s Spiderman Miles Morale',
    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',    
  }, {
    image: 'assets/img/02.webp',
    title: 'Ratchet & Clank: Rift Apart',
    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
    image: 'assets/img/03.webp',
    title: 'Fortnite',
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
    image: 'assets/img/04.webp',
    title: 'Stray',
    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
    image: 'assets/img/05.webp',
    title: "Marvel's Avengers",
    text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];



// ! FUNZIONI
// Funzione cambio immagine
const changePic = target => {
  
    // Rimuovo la classe active all'immagine corrente
    images[currentActiveIndex].classList.remove('active');
    thumbs[currentActiveIndex].classList.remove('active');

    if (target === 'next'){
      // Incremento l'indice
      currentActiveIndex++; 
      // Controllo per ripartire dall'inizio
      if(currentActiveIndex === images.length){
      currentActiveIndex = 0;
      }
    } else if (target === 'prev'){
      // Decremento l'indice
      currentActiveIndex--; 
      // Controllo per ripartire dalla fine
      if(currentActiveIndex < 0){
      currentActiveIndex = images.length - 1;
      }
    } else {
      // Metto il current index sul thumb corrente
      currentActiveIndex = target;
    }

    // Assegno la classe active al nuovo indice
    images[currentActiveIndex].classList.add('active');
    thumbs[currentActiveIndex].classList.add('active');
}


// Funzione start autoplay
const startAutoplay = (direction) => {
    autoplay = setInterval(()=>{
      changePic(direction);
    }, 3000);
  };
  
  // Funzione stop autoplay
  const stopAutoplay = (changeButton = true) => {
    isPlaying = false;
    clearInterval(autoplay);
    
    if(changeButton) {
      autoplayButton.innerText = 'RESUME AUTOPLAY';
    }
  };

  
// ! OPERAZIONI PRELIMINARI
// Recupero la galleria
const gallery = document.querySelector('.gallery');
const thumbGallery = document.getElementById('thumbnails');

let galleryElements = '';
let thumbsElements = '';
for (let i = 0; i < source.length; i++){
  const img = `<img src="${source[i].image}" alt="image_${source[i]}">`;
  thumbsElements += img;
  galleryElements += `
    <figure>
    <img src="${source[i].image}" alt="${source[i].title}">
    <figcaption>
      <h2>${source[i].title}</h2>
      <h4>${source[i].text}</h4>
    </figcaption>
  </figure>
  `
}
// Stampo in pagina
gallery.innerHTML = galleryElements;
thumbGallery.innerHTML = thumbsElements;


 // Recupero le immagini 
 const images = document.querySelectorAll('.gallery figure');

 // Recupero i thumbnails
 const thumbs = document.querySelectorAll('#thumbnails img');

 // Metto la prima immagine come active
 let currentActiveIndex = 0;
 images[currentActiveIndex].classList.add('active');

 // Metto il primo thumbs come active
 thumbs[currentActiveIndex].classList.add('active');

 // Recupero i bottoni
 const prevButton = document.getElementById('prev');
 const nextButton = document.getElementById('next');
 const autoplayButton = document.getElementById('autoplay-button');
 const reverseAutoplay = document.getElementById('reverse-autoplay');

 // ! OPERAZIONI DI AVVIO PAGINA
 // Avvio l'autoplay
 let autoplay;
 let direction = 'next';
 startAutoplay(direction);

 let isPlaying = true;
 // ! EVENTI DINAMICI
 // Aggancio un evento al reverse autoplay
 reverseAutoplay.addEventListener('click', () => {
   // Stop autoplay
   stopAutoplay(changeButton = false);
   // Inverto la direzione
   direction = direction === 'next' ? 'prev' : 'next';
   // Faccio ripartire l'autoplay
   startAutoplay(direction);
 });
 // Aggancio un evento al bottone autoplay
 autoplayButton.addEventListener('click', () => {
   isPlaying = !isPlaying;
   if(!isPlaying){
     autoplayButton.innerText = 'RESUME AUTOPLAY';
     clearInterval(autoplay);
   } else {
     autoplayButton.innerText = 'STOP AUTOPLAY';
     startAutoplay(direction);
   }
 });
 // Aggancio l'evento all'arrow next
 nextButton.addEventListener('click', () => {
  stopAutoplay();
  changePic('next');
 });
 // Aggancio l'evento all'arrow prev
 prevButton.addEventListener('click', () => {
   stopAutoplay();
   changePic('prev');
 });
 // Rendo cliccabili i thumbnails 
 for (let i = 0; i < thumbs.length; i++){
   const thumb = thumbs[i];
   // Aggiungo il click al singolo thumbnails
   thumb.addEventListener('click', () => {
     stopAutoplay();
     changePic(i);
   })
 };

