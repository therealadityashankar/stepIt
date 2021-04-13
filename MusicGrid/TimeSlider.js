export default class TimeSlider extends EventTarget{
    constructor(grid){
        super()
        this.grid = grid;
        this._createElements();
    }

    _createElements(){
        const div = document.createElement("div")
        div.classList.add("p-2", "bg-red-400", "mb-1", "rounded", "cursor-pointer")

        this.elements = {div}
    }
}
