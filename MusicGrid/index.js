export {default as MusicGridRow} from "./row.js";
import TimeSlider from "./TimeSlider.js";

export class MusicGrid extends EventTarget{
    constructor(element){
        super()
        this.elements = {}
        if(element instanceof HTMLElement) this.elements.div = element;
        else this.elements.div = document.querySelector(element)

        this._minRowCellsWidth = 300
        this._rows = []

        this.time = new TimeSlider(this);
        this.elements.div.appendChild(this.time.elements.div)
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

    get length(){
        return this._rows.length;
    }

    pop(){
        const lastRow = this._rows.pop();
        lastRow.dispose()
    }

    push(row){
        this._rows.push(row)
        row.setGrid(this)
    }

    clear(){
        while(this.length) this.pop()
    }


    /**
     * gets the maximum width for a new row
     * the width of the longest row, or the minimum row width
     */
    get _maxNewRowCellsWidth(){
        let maxWidth = this._minRowCellsWidth;

        for(let row of this._rows){
            if(row.cellsWidth > maxWidth) maxWidth = row.cellsWidth;
        }

        return maxWidth;
    }
}
