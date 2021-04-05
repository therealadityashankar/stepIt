import {MusicGrid} from "./grid.js";

const grid = new MusicGrid("#play-area", 14, 7)
const playbtn = document.getElementById("play-btn")
const synths = []

for(let i=0; i<grid.rows; i++){
    synths.push({
        synth : new Tone.AMSynth().toDestination(),
        note : "ABCDEFG"[i] + 5
    });
}

grid.addEventListener("playing-cell", ({detail}) => {
    const synthD = synths[detail.cell.cellNum]
    synthD.synth.triggerAttackRelease(synthD.note, grid.playRate);
})

playbtn.addEventListener("click", e => {
    if(grid.playing) {
        playbtn.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAABKUlEQVR4nO3ara0CQRTF8T9P4LAU8AwWFDVAgsTSBnXQAi2Q0AMdgMGh0U+8LIZJEAQYZmfuzsz5JVducveIPfsFIiIiIiIiEmQMTKyXsLQE/oEtMDTexcQSaO5zBdZA33SjxB4DcHMEZpZLpfQsADc74NdutTReBdAAf8AGGFgtGNu7ANxcgBXQs1kznk8DcHMApiabRuIbQENhtflNAEXVZkgARdRmGwFkXZttBpBlbbYdQHa1GSuAbGozdgANHa/NFAG46WRtpgzATXBt/oQc3AEjYE9AbeYeQLDcAzgBc2ABnI130UVQNUjck6/2RqjaW+GqH4aqfRyu9oVIJ2vNl16KUlit+dKHEQqrNV/6OEphteZLP0hQWK35qv4nKRERERERkWzcAEEJ/TQ0drPAAAAAAElFTkSuQmCC"
        grid.stop()
    }
    else{
        playbtn.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAAf0lEQVR4nO3QwQ2AMAwEwUD/PcObv9EqykwB9mnXAgAATnT9cPMZ/jF97+OePLYjAeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBNQHqATUB6gE1AeoBAAAAhRe0swJQQBFfAgAAAABJRU5ErkJggg=="
        grid.play()
    }
})


