import styles from "./mixer.module.css";
import Track from "./track/track";
import * as Tone from "tone"

class TrackPlayer{
    constructor(){
        let tempSynth;
        if(typeof window !== 'undefined') tempSynth = new Tone.Synth().toDestination()
        this._tracks = [new Track("Guitar · A", time => tempSynth.triggerAttack("C4", time)),
                       new Track("Guitar · B"),
                       new Track("Guitar · C"),
                       new Track("Guitar · D"),
                       new Track("Piano · B#")]

        this._currentPosition = 0;
        this._playing = false
    }

    addTrack(track){
        this._tracks.push(track)
    }

    render(){
    }

    get playing(){
        return this._playing
    }

    set playing(value){
        this._playing = value;
    }

    get currentPosition(){
        return this._currentPosition
    }

    set currentPosition(value){
        this._currentPosition = value
    }

    get length(){
        let maxLen = 0;

        for(let track of this._tracks){
            if(track.length > maxLen) maxLen = track.length
        }

        return maxLen;
    }

    show(){
        const trackShows = []
        for(let track of this._tracks) trackShows.push(track.show())
        return trackShows
    }
}

let trackPlayer = new TrackPlayer()
if(typeof window !== 'undefined') window.trackPlayer = trackPlayer

function Tracks(){
    return (<div className={styles.tracks}>{trackPlayer.show()}</div>)
}


function Playbar(){
    return <div className={styles.playBar}>
        <div className={styles.timeComponents}>
            <input type="button" value="▶" className={styles.playBtn} />
            <p className={styles.timeStamp}><span className={styles.initialTime}>0</span>/<span className={styles.totalTime}>30</span></p>
        </div>
        <div className={styles.slider} style={{width: (trackPlayer.length*50 + 15) + "px"}}>
            <input type="button" className={styles.positionBtn} style={{left:"0"}}/>
        </div>
        <div className={styles.locationShower}></div>
    </div>
}

export default function Mixer(){
    return <div className={styles.mixer}>
        <Playbar/>
        <Tracks/>
        <h1>Step It</h1>
    </div>
}