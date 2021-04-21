import MusicGridCell from "./cell.js"

export default class MusicGridRow extends EventTarget{
    constructor(label){
        super()
        this.label = label
        this.grid = null;
        this.playing = false;
        this.beatRate = "4n";
        this.gridData = {}
        this._cells = []
        this._createUIElements()
    }

    get length(){
        return this._cells.length;
    }

    get cellsWidth(){
        return this.elements.cellsEl.getBoundingClientRect().width;
    }

    setGrid(grid){
        this.grid = grid;
        this.grid.elements.div.appendChild(this.elements.div)
        this._setGridPopulateCells()
        this._setGridEventListener()
    }

    addEmptyCell(numCells=1){
        const prevSize = this.grid._maxNewRowCellsWidth;
        for(let i=0; i<numCells; i++){ 
            const cell = new MusicGridCell(this.grid);
            this.elements.cellsEl.appendChild(cell.div);
            this._cells.push(cell)
        }
        const newSize = this.grid._maxNewRowCellsWidth;

        if(newSize > prevSize) {
            this.grid.dispatchEvent(new CustomEvent("size-change"))
        }
    }

    _createUIElements(){
        const div = document.createElement("div")
        div.classList.add("p-2", "py-1", "mb-4", "bg-yellow-300", "rounded", "flex", "flex-row") 

        const label = document.createElement("div")
        label.classList.add("p-2", "w-36")
        label.innerText = this.label

        const cellsEl = document.createElement("div")
        cellsEl.classList.add("flex", "flex-row")

        const add = document.createElement("div")
        add.classList.add("cursor-pointer", "bg-red-300", "text-center")
        add.style.width = "30px"
        add.style.margin = "5px"
        add.style.fontSize = "20px"
        add.innerText = "+"

        add.addEventListener("click", () => this.addEmptyCell(3))
        div.append(label, cellsEl, add);

        this.elements = {div, label, cellsEl} 
    }

    _setGridPopulateCells(){
        const maxWid = this.grid._maxNewRowCellsWidth;
        this.addEmptyCell(Math.floor(maxWid/MusicGridCell.spaceTaken) - this.length)
    }

    /**
     * should be called when the row is being deleted
     */
    dispose(){
        this.elements.div.remove()
        this.dispatchEvent(new CustomEvent("dispose"))
    }

    _setGridEventListener(){
        this.grid.addEventListener("size-change", () => this._setGridPopulateCells())
    }

    async _rowRecordThingy(){
        this.dispatchEvent(new CustomEvent("record-mode"))
        let currentCell = 0;

        await new Promise(resolve => {
            Tone.Transport.scheduleRepeat(time => {
                let cell = this.cells[currentCell];
                if(!cell) resolve();                
                if(cell.selected){
                    this.dispatchEvent(new CustomEvent("play"))
                }
                currentCell += 1;
            }, this.beatRate)
        })
    }
}
