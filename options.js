export class OptionsList extends HTMLElement{
    constructor(){
        super()
        this.options = ["Beat selection 1", "Synth", "AMSynth", 
                        "DuoSynth", "FMSynth", 
                        "MembraneSynth", 
                        "MetalSynth", "MonoSynth", 
                        "NoiseSynth", "PluckSynth"]
        this.currSelection = null;
        this.btnOpts = []
        this._addOptionButtons()
    }

    _addOptionButtons(){
        for(let option of this.options){
            const btn = document.createElement("input")
            btn.type = "button"
            btn.value = option;
            btn.classList.add("rounded", "cursor-pointer", "py-1", "px-2", "bg-green-300", "hover:bg-green-400", "my-2", "w-full")
            btn.addEventListener("click", () => this.select(option))
            this.btnOpts.push({btn, option})
            this.append(btn)
            this.append(document.createElement("br"))
        }
    }

    select(option){
        if(!this.options.includes(option)) throw console.error(`invalid option ${option}`);
        const prevSelection = this.currSelection;
        const currSelection = this.currSelection = option;
        const detail = {prevSelection, currSelection}
        for(let btnOpt of this.btnOpts){
            const btn = btnOpt.btn;
            if(btnOpt.option == option){
                btn.classList.remove("bg-green-300", "hover:bg-green-400")
                btn.classList.add("bg-red-400")
            } else{
                btn.classList.remove("bg-red-400")
                btn.classList.add("bg-green-300", "hover:bg-green-400")
            }
        }
        this.dispatchEvent(new CustomEvent("selection-changed", {detail}))
    }
}

customElements.define("options-list", OptionsList)
