const SIZE = 20;
const GAME_ELEM = document.getElementById('game');
const UPDATE_INTERVAL = 220;  // ms
const REPEAT_INHIBITION_TIMEOUT = 30;  // ms
let timeout_id;

class Game {
    constructor() {
        this.wyrm = new Wyrm();
        this.apples = [];
        this.tickCount = 0;
        this.gameOver = false;
        this.keysDisabled = false;
        this.previousKeyPressed = null;
    }

    update = (interval) => {
        timeout_id = setInterval(() => {
            game.tick();
            game.render();
        }, interval);
    }    

    _enableKeys = () => {
        this.keysDisabled = false;
    }

    _disabbleKeysForAMoment = () => {
        this.keysDisabled = true;
        clearInterval(timeout_id);
        setTimeout(this._enableKeys, REPEAT_INHIBITION_TIMEOUT);
        game.tick();
        game.render();
        this.update(UPDATE_INTERVAL);
    }

    _keydown = (event) => {
        if (event.key === 'ArrowUp' && this.previousKeyPressed !== 'ArrowUp' && !this.keysDisabled) {
            this.wyrm.setDirection('up');
            this._disabbleKeysForAMoment();
        } else if (event.key === 'ArrowDown' && this.previousKeyPressed !== 'ArrowDown' && !this.keysDisabled) {
            this.wyrm.setDirection('down');
            this._disabbleKeysForAMoment();
        } else if (event.key === 'ArrowLeft' && this.previousKeyPressed !== 'ArrowLeft' && !this.keysDisabled) {
            this.wyrm.setDirection('left');
            this._disabbleKeysForAMoment();
        } else if (event.key === 'ArrowRight' && this.previousKeyPressed !== 'ArrowRight' && !this.keysDisabled) {
            this.wyrm.setDirection('right');
            this._disabbleKeysForAMoment();
        }
    }

    start = () => {
        window.addEventListener('keydown', this._keydown);
        this.update(UPDATE_INTERVAL);
    }

    tick = () => {
        if (this.tickCount++ % 20 === 0) {
            this.apples.push(new Apple());
        }
        if (this.wyrm.move(this.apples)) {
            return true;
        } else {
            clearTimeout(timeout_id);
            this.gameOver = true;
            this.showGameOver();
            return false;
        }
    }

    render = () => {
        if (this.gameOver) {
            return;
        }
        this.resetBlocks(); // TODO: This is inefficient, only clear the cells that need to be cleared.
        this.apples.forEach((apple) => {
            apple.render();
        });
        this.wyrm.render();
    }

    resetBlocks = () => {
        const cells = GAME_ELEM.children;
        for (let i = 0; i < cells.length; i++) {
            cells[i].className = 'empty';
        }
    }

    newGame = () => {
        this.gameOver = false;
        this.wyrm = new Wyrm();
        this.apples = [];
        this.tickCount = 0;
        GAME_ELEM.className = 'game';
        while (GAME_ELEM.childNodes.length > 0) {
            GAME_ELEM.removeChild(GAME_ELEM.childNodes[0]);
        }
        this.populateGameDiv();
        this.start();
    }

    showGameOver = () => {
        while (GAME_ELEM.childNodes.length > 0) {
            GAME_ELEM.removeChild(GAME_ELEM.childNodes[0]);
        }
        GAME_ELEM.className = 'game-over';

        localStorage.setItem('highscore', Math.max(localStorage.getItem('highscore') || 0, this.wyrm.body.length));

        let elem = document.createElement('div');
        elem.innerHTML = `<p>Peli ohi.</p><button id="new-game-button" >Uusi peli</button><br>
        <p class="score">Madon pituus: ${this.wyrm.body.length}</p>
        <p class="score">Ennätyspituus: ${localStorage.getItem('highscore')}</p>`;
        elem.className = 'game-over';
        GAME_ELEM.appendChild(elem);
        document.getElementById('new-game-button').addEventListener('click', this.newGame);
    }

    populateGameDiv = () => {
        for (let i = 0; i < SIZE * SIZE; i++) {
            const cell = document.createElement('div');
            cell.style.width = '20px';
            cell.style.height = '20px';
            cell.style.border = '0px solid #888';
            cell.style.borderRadius = '8px';
            cell.style.boxSizing = 'border-box';
            cell.setAttribute('id', `cell-${i}`);
            GAME_ELEM.appendChild(cell);
        }
    }
}



class Apple {
    constructor() {
        this.position = Math.floor(Math.random() * SIZE * SIZE);
    }

    getPosition = () => {
        return this.position;
    }

    render = () => {
        const cell = document.getElementById(`cell-${this.position}`);
        cell.setAttribute('class', 'apple');
    }

}

class Wyrm {
    constructor() {
        const middle = {x: Math.floor([SIZE/2]), y: Math.floor([SIZE/2])};
        this.body = [this.coordinatesToIndex(middle.x, middle.y)];
        this.direction = 'right';
    }

    /**
     * Render the wyrm by specifying the class of each cell.
     * 
     * Does not clear old wyrm segments' css classes.
     */
    render = () => {
        this.body.forEach((segment) => {
            const cell = document.getElementById(`cell-${segment}`);
            cell.setAttribute('class', 'wyrm');
        });
    }

    /**
     * Set the direction the wyrm moves in.
     * 
     * @param {String} direction; One of: `'right'`, `'left'`, `'up'`, `'down'`. 
     */
    setDirection = (direction) => { 
        switch (direction) {
            case 'right':
                if (this.direction !== 'left') {
                    this.direction = direction;
                }
                break;
            case 'left':
                if (this.direction !== 'right') {
                    this.direction = direction;
                }
                break;
            case 'up':
                if (this.direction !== 'down') {
                    this.direction = direction;
                }
                break;
            case 'down':
                if (this.direction !== 'up') {
                    this.direction = direction;
                }
                break;
            default:
                throw new Error('Invalid direction');
        }
    }

    /**
     * Move the wyrm in the direction specified by this.direction.
     * Return `true` if the move was successful, `false` if the wyrm collided with its
     * tail or went off the map.
     */
    move = (apples) => {
        if (this.direction === 'right') {
            return this.right(apples);
        } else if (this.direction === 'left') {
            return this.left(apples);
        } else if (this.direction === 'up') {
            return this.up(apples);
        } else if (this.direction === 'down') {
            return this.down(apples);
        } else {
            throw new Error('Invalid direction');
        }
    }

    wyrmCollidesWithItsTail = () => {
        let head = this.body[0];
        return this.body.slice(1).some((segment) => {
            return segment === head;
        });
    }

    wyrmOnMap = () => {
        let head = this.body[0];
        return head >= 0 && head < SIZE*SIZE;
    }

    coordinatesToIndex = (x, y) => {
        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
            throw new Error('Coordinates out of bounds');
        }
        return y * 20 + x;
    }

    indexToCoordinates = (index) => {
        return {
            x: index % 20,
            y: Math.floor(index / 20)
        }
    }

    _moveHelper = (x, y, apples) => {
        let newIndex;
        try {
            newIndex = this.coordinatesToIndex(x, y);
        } catch (e) {
            return false;
        }
        if (this.wyrmOnMap() && !this.wyrmCollidesWithItsTail()) {
            this.body.unshift(newIndex);
            let grow = apples.some((apple) => { return this.body[0] === apple.position; });
            if (!grow) {
                this.body.pop();
            } else {
                apples.splice(apples.findIndex((apple) => { 
                    return apple.position === newIndex;
                }), 1);
            }
    
            return true;
        } else {
            return false;
        }
    }

    left = (apples) => {
        const head = this.body[0];
        const curCoord = this.indexToCoordinates(head);
        const newCoord = { x: curCoord.x - 1, y: curCoord.y };
        return this._moveHelper(newCoord.x, newCoord.y, apples);
    }

    right = (apples) => {
        const head = this.body[0];
        const curCoord = this.indexToCoordinates(head);
        const newCoord = { x: curCoord.x + 1, y: curCoord.y };
        return this._moveHelper(newCoord.x, newCoord.y, apples);
    }

    up = (apples) => {
        const head = this.body[0];
        const curCoord = this.indexToCoordinates(head);
        const newCoord = { x: curCoord.x, y: curCoord.y - 1 };
        return this._moveHelper(newCoord.x, newCoord.y, apples);
    }

    down = (apples) => {
        const head = this.body[0];
        const curCoord = this.indexToCoordinates(head);
        const newCoord = { x: curCoord.x, y: curCoord.y + 1 };
        return this._moveHelper(newCoord.x, newCoord.y, apples);
    }
}
let game = new Game();
game.newGame();
