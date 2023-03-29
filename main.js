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
    image: 'img/01.webp',
    title: 'Marvel\'s Spiderman Miles Morale',
    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',    
  }, {
    image: 'img/02.webp',
    title: 'Ratchet & Clank: Rift Apart',
    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
    image: 'img/03.webp',
    title: 'Fortnite',
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
    image: 'img/04.webp',
    title: 'Stray',
    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
    image: 'img/05.webp',
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