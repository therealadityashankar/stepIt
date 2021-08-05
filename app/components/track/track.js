import styles from "./track.module.css"
import {useRef, useState} from "react"
import * as Tone from "tone"

function MusicThingyOptions(props){
    let left = "0px";
    let top = "0px";
    let display = "none";

    if(props.parent.current){
        const parentPos = props.parent.current.getBoundingClientRect()
        left = parentPos.left + "px";
        top = (parentPos.top + 20) + "px";
    }

    if(props.show) {
        display = "block";
    }
    
    return <div 
            className={styles.musicThingyOptions} 
            style={{left, top, display}}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}>
                <input type="button" value="add note before" /><br/>
                <input type="button" value="add note after" /><br/>
                <input type="button" value="add space before" /><br/>
                <input type="button" value="add space after" />
            </div>
}

function MusicNote(props){

    let width = props.time*50;
    let widthPx = width + "px"
    const el = useRef(null)

    const [inEl, setInEl] = useState({
        musicNote : false,
        optionsContainer : false
    })

    let [showOptions, setShowOptions] = useState(false);

    const showThemOptions = opts => {
        if(opts.musicNote != undefined) inEl.musicNote = opts.musicNote
        if(opts.optionsContainer != undefined) inEl.optionsContainer = opts.optionsContainer
        setInEl(inEl)
        setShowOptions(inEl.musicNote || inEl.optionsContainer)
    }


    return <div className={styles.musicNote} ref={el}>
        <div 
         className={styles.noteShower} style={{width:widthPx}} 
         onMouseEnter={e => showThemOptions({musicNote:true})}
         onMouseLeave={e => showThemOptions({musicNote:false})}></div>
         {showThemOptions && <MusicThingyOptions 
                              parent={el} 
                              show={showOptions}
                              onMouseEnter={e => showThemOptions({optionsContainer:true})}
                              onMouseLeave={e => showThemOptions({optionsContainer:false})}
                              />}
    </div>
}

function MusicSpace(props){
    let width = props.time*50;
    let widthPx = width + "px"
    const el = useRef(null)

    const [inEl, setInEl] = useState({
        musicNote : false,
        optionsContainer : false
    })

    let [showOptions, setShowOptions] = useState(false);

    const showThemOptions = opts => {
        if(opts.musicNote != undefined) inEl.musicNote = opts.musicNote
        if(opts.optionsContainer != undefined) inEl.optionsContainer = opts.optionsContainer
        setInEl(inEl)
        setShowOptions(inEl.musicNote || inEl.optionsContainer)
    }


    return <div className={styles.musicSpace} ref={el}>
        <div 
         className={styles.noteShower} style={{width:widthPx}} 
         onMouseEnter={e => showThemOptions({musicNote:true})}
         onMouseLeave={e => showThemOptions({musicNote:false})}></div>
         {showThemOptions && <MusicThingyOptions 
                              parent={el} 
                              show={showOptions}
                              onMouseEnter={e => showThemOptions({optionsContainer:true})}
                              onMouseLeave={e => showThemOptions({optionsContainer:false})}
                              />}
    </div>
}

let randomNums = [0.7262818945639565,0.6245376677328859,0.04256342277450975,0.6505867710338481,0.47728373378845323,0.47543469591101717,0.8969118797481043,0.6225923155065071,0.8037380414298724,0.05365328141885706,0.10654950707705668,0.9036251974524372,0.8763728939654715,0.6542258568178331,0.04900220492241514,0.15630815991527547,0.3616710521381018,0.0881740766256438,0.42537707700787375,0.5899772342388354,0.47187023126337446,0.1314141969025706,0.29867831490538455,0.35026327404571933,0.3656860989427988,0.33388875183586786,0.38440793785508176,0.9490853084604877,0.06166670585202716,0.5168697190616902,0.6607621143889026,0.7406687992600095,0.9452859194616133,0.479317504389981,0.5094818386932413,0.31106726769440096,0.23464449052358305,0.5483917380249897,0.4683906272935632,0.5303174897231024,0.7018942278048881,0.631608747878116,0.4013795941501932,0.6992020169502977,0.23784536117403665,0.8948544956775449,0.14793727777049315,0.7272865185296145,0.39679238581022924,0.16122890275203294,0.10469059823728777,0.1284384959454994,0.8767971282781641,0.8020938414365077,0.2776113991054232,0.29288039318575465,0.19731787756815988,0.9757540492691774,0.3986274777687736,0.7125347678062575,0.9573798134904675,0.03373350704966471,0.30764784477050144,0.7312743354774655,0.09298884492297022,0.6187720445849416,0.5657133451747698,0.07087315627445445,0.010013893651484307,0.8185088251728821,0.18415237619705616,0.05639182106590512,0.763844744884216,0.7832099240997471,0.31924527857838436,0.38155727695040964,0.5672772049638795,0.6349166506396177,0.20653948311518355,0.4865695478635126,0.49344235116123136,0.7660931190787451,0.7307926137675541,0.5769237131216645,0.6104594070859849,0.9098350532590167,0.32563850634951885,0.5744444697510169,0.008619216458116807,0.9625578907323917,0.716832982140119,0.8620776147499539,0.9168814569883185,0.002792325618634739,0.9648257731310591,0.6639058756799193,0.9061267426762268,0.35517811431194823,0.5794420192022399,0.19587240967515762]
let currRandomNum = 0;
let getRandomNum = () => {
    const num = randomNums[currRandomNum%randomNums.length];
    currRandomNum++;
    return num
}

export default class Track{
    constructor(name, playFn){
        this.name = name
        this.notes = this._generateRandomNotes()
        this.playFn = playFn
    }

    play(){
        for(let note of this.notes){
            console.log(note)
            //this.playFn(Tone.Time(note.props.time))
        }
    }

    get length(){
        return this.notes.length;
    }

    _generateRandomNotes(){
        const notes = [];
        const numNotes = Math.floor(getRandomNum()*25);

        for(let i=0; i<numNotes; i++){
            if(getRandomNum() < 0.5) notes.push(<MusicNote time={1} key={i}/>)
            else notes.push(<MusicSpace time={1} key={i}/>)
        }

        return notes;
    }

    show() {
        return <div className={styles.track} key={this.name}>
            <h2>{this.name}</h2>
            <div className={styles.musicNotes}>{this.notes}</div>
        </div>
    }
}