export class MusicGridCell extends EventTarget{
    constructor(grid, column, cellNum){
        super()
        this.grid = grid
        this.column = column
        this.cellNum = cellNum
        this.div = document.createElement("div")
        this.selected = false
        this.div.classList.add("p-4", "rounded-lg", "bg-blue-300", "cursor-pointer", "hover:bg-blue-400", "w-4", "m-2")
        this.div.addEventListener("click", () => this._toggleSelected())
    }

    _toggleSelected(){
        if(this.selected){
            this.div.classList.remove("bg-blue-500")
            this.div.classList.add("bg-blue-300")
            this.selected = false;
        } else{
            this.div.classList.remove("bg-blue-300")
            this.div.classList.add("bg-blue-500")
            this.selected = true;
        }
    }

    remove(){
        this.div.remove()
    }

    play(){
        if(this.selected){
            this.dispatchEvent(new CustomEvent("playing", {
                detail : {
                    cell : this
                }
            }))

            this.grid.dispatchEvent(new CustomEvent("playing-cell", {
                detail : {
                    cell : this
                }
            }))
        }
    }
}

export class MusicGridColumn extends EventTarget{
    constructor(grid, length){
        super()
        this.grid = grid
        this.length = length
        this.element = document.createElement("div")
        this.element.classList.add("rounded", "bg-green-200", "m-2", "w-min")
        this.cells = this._createCells(length);
    }

    _createCells(length){
        const cells = []
        for(let i=0; i<length; i++){
            let cell = new MusicGridCell(this.grid, this, i);
            this.element.append(cell.div)
            cells.push(cell)
        }

        return cells
    }

    play(){
        for(let cell of this.cells) cell.play();
    }

    setPlayingUI(){
        this.element.classList.remove("bg-green-200")
        this.element.classList.add("bg-yellow-200")
    }

    removePlayingUI(){
        this.element.classList.add("bg-green-200")
        this.element.classList.remove("bg-yellow-200")
    }

    remove(){
        for(let cell of this.cells) cell.remove()
    }
}

export class MusicGrid extends EventTarget{
    constructor(element, columns, rows){
        super()
        this.element = document.querySelector(element);
        this.cells = []
        this.playing = false
        this.playingId = null
        this.playRate = "8n"
        this.playingDetails = {
            currentColumn : 0
        }

        this.setColumnsAndRows(columns, rows);
    }

    setColumnsAndRows(columns, rows){
        this.columns = columns
        this.rows = rows
        this.element.setAttribute("class", "");
        this.element.classList.add("flex", "flex-row", "p-2", "bg-red-300", "w-min", "m-2", "rounded")

        for(let column of this.cells) column.remove()

        this.cells = []
        for(let i=0; i<this.columns; i++){
            const column = new MusicGridColumn(this, this.rows);
            this.element.appendChild(column.element)
            this.cells.push(column);
        }
    }

    play(){
        this.playingId = Tone.Transport.scheduleRepeat(time => {
            let lastColumnNum = this.playingDetails.currentColumn - 1;
            if(lastColumnNum < 0) lastColumnNum = this.columns - 1;
            const lastColumn = this.cells[lastColumnNum]
            const currColumn = this.cells[this.playingDetails.currentColumn];
            currColumn.setPlayingUI()
            currColumn.play()
            lastColumn.removePlayingUI()
            this.playingDetails.currentColumn = (this.playingDetails.currentColumn + 1)%this.columns;
        }, this.playRate)
        Tone.Transport.start()
        this.playing = true;
    }

    stop(){
        Tone.Transport.clear(this.playingId)
        this.playing = false;
        this.playingId = null;
    }
}