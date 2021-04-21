export default class MusicGridCell extends EventTarget{
    static spaceTaken = 40; // width + margin (left and right)

    constructor(grid){
        super()
        this.grid = grid
        this.div = document.createElement("div")
        this.selected = false
        this.div.classList.add("bg-blue-300", "cursor-pointer", "hover:bg-blue-400")
        this.div.style.width = "30px";
        this.div.style.height = "30px";
        this.div.style.margin = "5px";
        this.div.addEventListener("click", () => this._toggleSelected())
    }



    select(){
        this.div.classList.remove("bg-blue-300", "hover:bg-blue-400")
        this.div.classList.add("bg-blue-500")
        this.selected = true;
        this.dispatchEvent(new CustomEvent("selected"));
    }

    unselect(){
        this.div.classList.remove("bg-blue-500")
        this.div.classList.add("bg-blue-300", "hover:bg-blue-400")
        this.selected = false;
        this.dispatchEvent(new CustomEvent("unselected"));
    }

    _toggleSelected(){
        if(this.selected) this.unselect()
        else this.select()
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
