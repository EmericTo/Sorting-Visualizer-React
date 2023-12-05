import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';


// Modifier cette valeur pour la vitesse des animations.
const ANIMATION_SPEED_MS = 1;

// Modifier cette valeur pour le nombre de barres dans le tableau.
const NUMBER_OF_ARRAY_BARS = 310;

// Couleur principale des barres du tableau.
const PRIMARY_COLOR = 'turquoise';

// Couleur des barres du tableau lorsqu'elles sont en cours de comparaison pendant les animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray(); // Initialise le tableau au montage du composant
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730)); // Remplit le tableau avec des valeurs aléatoires pour la hauteur des barres
    }
    this.setState({ array });
  }

  mergeSort() {
    // Obtient les animations du tri par fusion pour le tableau actuel dans le state
    const animations = getMergeSortAnimations(this.state.array);
  
    // Parcourt toutes les animations une par une
    for (let i = 0; i < animations.length; i++) {
      // Récupère tous les éléments HTML représentant les barres du tableau
      const arrayBars = document.getElementsByClassName('array-bar');
  
      // Vérifie si l'animation correspond à un changement de couleur des barres
      const isColorChange = i % 3 !== 2;
  
      if (isColorChange) {
        // Si c'est un changement de couleur, récupère les index des deux barres impliquées dans l'animation
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
  
        // Détermine la couleur à appliquer en fonction de l'étape de l'animation
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
  
        // Applique la couleur aux deux barres après un délai
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS); // Gère la vitesse de l'animation
      } else {
        // Si c'est un changement de hauteur, récupère l'index de la barre et la nouvelle hauteur
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
  
          // Modifie la hauteur de la barre pour refléter la valeur en cours de tri
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS); // Gère la vitesse de l'animation
      }
    }
  }
  


  // Cette méthode ne fonctionnera que si vos algorithmes de tri renvoient réellement les tableaux triés.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {/* Affichage des barres représentant les valeurs du tableau */}
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        {/* Boutons pour générer un nouveau tableau et lancer différents algorithmes de tri */}
        <button className='button' onClick={() => this.resetArray()}>Générer un nouveau tableau</button>
        
        <button className='button' onClick={() => this.mergeSort()}>Merge Sort</button>
   
      </div>
    );
  }
}

// Fonction pour générer un entier aléatoire dans une plage donnée
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fonction pour vérifier si deux tableaux sont égaux
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
