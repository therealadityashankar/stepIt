const setBeatSelection = (curr) => {
    if(curr == "Beat selection 1"){
        const synths = [
            {synth : new Tone.Synth().toDestination(), note : "C4"},
            {synth : new Tone.MetalSynth().toDestination(), note : "C4"},
            {synth : new Tone.MembraneSynth({volume:10}).toDestination(), note : "C1"},
            {synth : new Tone.NoiseSynth().toDestination(), note: "C4"},
            {synth : new Tone.MonoSynth().toDestination(), note : "E4"},
            {synth : new Tone.PluckSynth({volume:10}).toDestination(), note : "C1"},
            {synth : new Tone.FMSynth().toDestination(), note : "C5"},
        ]
        
        const labels = ["Soft Beep", "Cymbal", "Drum", "Snare", "Percussion", "String", "voilenish"]

        return [synths, labels]
    }

}

export default setBeatSelection;
