class Player{
    #image;
    #state;
    #container;


    constructor(path, startState) {
        this.#img = new Image(30);
        this.#img.src = path;
        this.#path = path
        this.#startState = initState;
        this.#container = document.getElementById("maze");
      }
    









}



class Player {
    #img;
    #state;
    #container;
    #path
  
    /**
     *
     * @param {String} path
     * @param {Cell} initState
     */
    constructor(path, initState) {
      this.#img = new Image(30);
      this.#img.src = path;
      this.#path = path
      this.#state = initState;
      this.#container = document.getElementById("maze");
    }
  
    generate() {
      this.#img.className = "player-img";
      this.#img.style.width = "30px";
  
      this.#img.style.left = ${this.#state.column * 35}px;
      this.#img.style.top = ${this.#state.row * 35}px;
  
      this.#container.appendChild(this.#img)
    }
  
    get img() {
      return this.#img;
    }
  
    get state() {
      return this.#state;
    }
  
    set state(state) {
      this.#state = state;
    }
  
    /**
     * 
     * @param {Array} direction 
     * @param {Cell} cell 
     */
    makeMove(cell){
      this.#state = cell
      this.#img.style.left = ${this.#state.column * 35}px
      this.#img.style.top = ${this.#state.row * 35}px;
    }
  
    toJSON() {
      return{
        path: this.#path,
        state: this.#state
      }
    }
  }
  
  export default Player;