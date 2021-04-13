import MusicGridCell from "./cell.js"

export default class MusicGridRow {
    constructor(label) {
        this.label = label
        this.grid = null;
        this.pin = false;
        this.playing = false;
        this.beatRate = "4n";
        this._cells = []
        this._createUIElements()
    }

    get length() {
        return this._cells.length;
    }

    get cellsWidth() {
        return this.elements.cellsEl.getBoundingClientRect().width;
    }

    setGrid(grid) {
        this.grid = grid;
        this.grid.elements.div.appendChild(this.elements.div)
        this._setGridPopulateCells()
        this._setGridEventListener()
    }

    addEmptyCell(numCells = 1) {
        const prevSize = this.grid._maxNewRowCellsWidth;
        for (let i = 0; i < numCells; i++) {
            const cell = new MusicGridCell(this.grid);
            cell.addEventListener("selected", () => {
                this.pin = true;
                this.elements.pin.src = this.elements.pin.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADn0lEQVRIidXVXWxTZRwG8Oc9X+/pOWvZ+jEEJDqvVFZU6DYWExI1sGLEG4OI1Om6xBizqPFiW8UgGoFxgQkm3JisFRmiQJbMZMiIcrWFbJ3gLCAXRrYskG2dzKXb2p6evq8XumUza9d2DOP/8pzz/H95Ts4H8H8df+sHB/yhwNF8c+Jy0NpgY4OFyvtlSfa4d1brVzu6L+WaFZYDCxBann3So3srqnSLQt/1hwIH7wssisL43akYVEVBTZ74suBUOtXQe+MahqPROVxV6Ht1weZDKwqLTHjepllSl6//guHoGFRFwY7KKk2jlnfqgs2fZc0WivpbG60cpO3hUru6SlMRGRyCTS+C3WpD2ZoHlKHRsY3lL2xx/tzR3bVYvuDGJvCWTadckURYFBllpXZcvh7BcHQMVFbgrazUNWp5M1PzghrvOrNLpClH+3pHSbEs/b1CFkUUqTTn5gU11mKPvKRKEtWovOB4Ps0LgomA/auLrbbFzuWKk2xAbbCxQYDQIhJh3OTmxwBxCxy7JUkqfnSdSyNZ4nEjhVtjd1G9wY31rlIkUwYu9PVNzyTjX4T8Le9LmYL+E80fUVFueuYpj2ViKqb3/nqtdZVqYU6rLqpUQjYUAGRRQBGl6Z7IgFj1eDlKrFYwboIQTAJARphwkgYIp5KMstVrQCWZ9EQGRIdVy4rGjRRG/4wlYvEk4wK+Mjn7vu/mjWOMMRfjvOlE/ZHjwBK3uv7LwIeKJAe8FVs0C6W488c4eiIDeMhVAo0qC66NJRIYnZyanEkanDN+PGUIR79+u2UiY7FscC44B8fN29EZM81+N5n5ScI22H725bPppfYuCS+FExD8NhK9E6o/si6XXbOT0+vU+sbhTxWun774U5jHk0msdTjxtPsJDEUnMB6bYiCkPR80Z/hU55WtHudzL4omPX2xv286YRhY63CiesNGTCYSxASL3HP4VOeVrUxg5wiEPZ/XNu+NG8ljXeHe6YRh4EGXC1WPlRNFEPfdU3gWZYS/6tux6UcACNYd3jcft+tWcAZ7vnDGn8TJrvA2BpzjhO953Vvxw/xzVzu6L7l3VuuDoyObbo3cThum2TTwXU84H3jRp/pkV3gbZ+QbTvjuf6Pzxx8KHAQjqWD9oQP5oIvCbef7t3MB3wLwveb1dOa7MNdZ8MlsO9+/nROcAbB3JVFgXuM5lKw8CvzTeBYlAvH5ajavODoHc4IACHnFV7P5wv1A/9P5C/1li96PHePuAAAAAElFTkSuQmCC";
            });
            cell.addEventListener("unselected", () => {
                if (this._cells.every(cell => !cell.selected)) {
                    this.pin = false;
                    this.elements.pin.src = "";
                }
            });
            this.elements.cellsEl.appendChild(cell.div);
            this._cells.push(cell)
        }
        const newSize = this.grid._maxNewRowCellsWidth;

        if (newSize > prevSize) {
            this.grid.dispatchEvent(new CustomEvent("size-change"))
        }
    }

    _createUIElements() {
        const div = document.createElement("div")
        div.classList.add("p-2", "py-1", "mb-4", "bg-yellow-300", "rounded", "flex", "flex-row")

        const label = document.createElement("div")
        label.classList.add("p-2", "w-36")
        label.innerText = this.label

        const cellsEl = document.createElement("div")
        cellsEl.classList.add("flex", "flex-row")

        const pin = document.createElement("img");

        const add = document.createElement("div")
        add.classList.add("cursor-pointer", "bg-red-300", "text-center")
        add.style.width = "30px"
        add.style.margin = "5px"
        add.style.fontSize = "20px"
        add.innerText = "+"

        add.addEventListener("click", () => this.addEmptyCell(3))
        div.append(label, cellsEl, pin, add);

        this.elements = {
            div,
            label,
            cellsEl,
            pin
        }
    }

    _setGridPopulateCells() {
        const maxWid = this.grid._maxNewRowCellsWidth;
        this.addEmptyCell(Math.floor(maxWid / MusicGridCell.spaceTaken) - this.length)
    }

    /**
     * should be called when the row is being deleted
     */
    dispose() {
        this.elements.div.remove()
    }

    _setGridEventListener() {
        this.grid.addEventListener("size-change", () => this._setGridPopulateCells())
    }

}