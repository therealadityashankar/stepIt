import {MusicGrid, MusicGridRow} from "./MusicGrid/index.js";
import setBeatSelection from "./customBeatSelections.js";
import "./options.js"

const gridRows = 7;
const playbtn = document.getElementById("play-btn")
const optionsList = document.querySelector("options-list")
const synthList = ["Synth", "AMSynth", "DuoSynth", "FMSynth", "MembraneSynth", 
                   "MetalSynth", "MonoSynth", "NoiseSynth", "PluckSynth"]
const customBeatList = ["Beat selection 1"]
const grid = new MusicGrid("#play-area")
window.grid = grid;
let synths = []

optionsList.addEventListener("selection-changed", ({detail}) => {
    while(synths.length){
        const synthD = synths.pop()
        synthD.synth.dispose()
    }

    let labels = [];
    if(synthList.includes(detail.currSelection)){
        for(let i=0; i<gridRows; i++){
            const note = "ABCDEFG"[i] + 5;
            const synth = new Tone[detail.currSelection]().toDestination(); 
            synths.push({synth, note});
            labels.push(note)
        }
    } else if(customBeatList.includes(detail.currSelection)){
        [synths, labels] = setBeatSelection(detail.currSelection) 
    } else{
        throw console.error(`invalid option ${detail.currSelection}, contact the developer`)
    }

    grid.clear()

    for(let label of labels){
        grid.push(new MusicGridRow(label))
    }
})

grid.addEventListener("playing-cell", ({detail}) => {
    const synthD = synths[detail.cell.cellNum]
    if(synthD.synth instanceof Tone.NoiseSynth)  synthD.synth.triggerAttackRelease(grid.playRate, detail.attime)
    else synthD.synth.triggerAttackRelease(synthD.note, grid.playRate, detail.attime);
})

playbtn.addEventListener("click", () => {
    if(grid.playing) {
        playbtn.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAABKUlEQVR4nO3ara0CQRTF8T9P4LAU8AwWFDVAgsTSBnXQAi2Q0AMdgMGh0U+8LIZJEAQYZmfuzsz5JVducveIPfsFIiIiIiIiEmQMTKyXsLQE/oEtMDTexcQSaO5zBdZA33SjxB4DcHMEZpZLpfQsADc74NdutTReBdAAf8AGGFgtGNu7ANxcgBXQs1kznk8DcHMApiabRuIbQENhtflNAEXVZkgARdRmGwFkXZttBpBlbbYdQHa1GSuAbGozdgANHa/NFAG46WRtpgzATXBt/oQc3AEjYE9AbeYeQLDcAzgBc2ABnI130UVQNUjck6/2RqjaW+GqH4aqfRyu9oVIJ2vNl16KUlit+dKHEQqrNV/6OEphteZLP0hQWK35qv4nKRERERERkWzcAEEJ/TQ0drPAAAAAAElFTkSuQmCC"
        grid.stop()
    }
    else{
        playbtn.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAAf0lEQVR4nO3QwQ2AMAwEwUD/PcObv9EqykwB9mnXAgAATnT9cPMZ/jF97+OePLYjAeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBAAAAhRe0swJQQBFfAgAAAABJRU5ErkJggg=="
        grid.play()
    }
})

optionsList.select("Beat selection 1")
