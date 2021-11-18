import { useState,useEffect } from "react";
import { delay,check ,spin, ActionRedirect} from "../func";

/* Variables for texts used in pop up */
const {head,mes,pack,load,pop,winTxt} = window.txt;

/* Pop up package buttons */
const PopBtn = (props)=>{

    const {click,set,stats,setClk} = props; // variables from props
    const {tech,groc,vouch,food} = click; //package values

    /* handles button click in start pop up */
    const clicked = async(val)=>{

        const {id} = val.target;
        
        /* Switch case to update which button to show */
        switch (id) {
            case "tech":  
            /* Shows only the tech button and load message */
            set({
                ...click,
                show:true,
                tech:true,
                groc:false,
                vouch:false,
                food:false
            })              
            break;
            case "groc": 
            /* Shows only the grocery button and load message */ 
            set({
                ...click,
                show:true,
                tech:false,
                groc:true,
                vouch:false,
                food:false
            })              
            break;
            case "vouch":  
            /* Shows only the vouch button and load message */
            set({
                ...click,
                show:true,
                tech:false,
                groc:false,
                vouch:true,
                food:false
            })              
            break;
            default:  
            /* Shows only the food button and load message */
            set({
                ...click,
                show:true,
                tech:false,
                groc:false,
                vouch:false,
                food:true
            })              
            break;
        }

        //delay before hiding popup
        await delay();
        // Hides popup
        setClk({
            ...stats,
            show:false,
            start:false,
            lose:true
        })
    }

    return <div className="w-100 flx h-50 m-t-5 flx-wrp flx-jc-sa flx-ai-strt fade-t strt">
        {/* Tech and Voucher Package buttons */}
        <div className="flx w-100">
            {tech&&<button className="btn btn-ylw fred w-30 m-r-2" onClick={clicked} id="tech">{pack[0]}</button>}
            {vouch&&<button className="btn btn-grn fred w-30 m-l-5" onClick={clicked} id="vouch">{pack[1]}</button>}
        </div>
        {/* Grocery and Food Package buttons */}
        <div className="flx w-100 m-t-5 m-b-5">
            {groc&&<button className="btn btn-blue fred w-30 m-r-2" onClick={clicked} id="groc">{pack[2]}</button>}
            {food&&<button className="btn btn-red fred w-30 m-l-5" onClick={clicked} id="food">{pack[3]}</button>}
        </div>
        {/* Loading Message */}
        {click.show&&<small className="fred txt-wht fade m-t-2 w-100">{load}</small>}
    </div>
}

/* Lose pop up container */
const Lose = (props)=>{

    const {stats,set} = props;
    const {bank,ctr} = stats;
    /* Lose text variables */
    const {head,stat,punc,mes,btn,grt} = pop[0].lose;

        /* handles button click in start pop up */
        const clicked = async(val)=>{

            let value =0;

            //Hides Popup button
            set({
                ...stats,
                show:false,
                lose:false,
                win:true,
                ctr:ctr-1
            })

            //Spins wheel
            await spin();
            await delay();

            //Shows Pop and decrements spins left
            set({
                ...stats,
                show:true,
                lose:false,
                win:true,
                ctr:ctr-1
            })

        }

        //Sets bank on popup load
        useEffect(() => {
            check(ctr+1,bank).then(val=>{
                set({
                    ...stats,
                    bank:val
                })
            })
        },[])

    return <div className="flx cent flx-wrp p-15 bg-blk flx-col w-40 h-50 fade-t popCont">
        <div className="flx p-50 flx-wrp flx-jc-sa w-100 h-100 bg-blk2 flx-col">
            {/* Lose Header Text */}
            <h2 className="txt-wht fred txt-al-ce">{head}<span className="txt-red">{stat}</span>{punc}</h2>
            {/* Lose Greet Secondary Head Text */}
            <h4 className="txt-wht fred txt-al-ce m-t-2">{grt}</h4>
            {/* Lose Message Text */}
            <p className="txt-wht lato m-t-2 txt-al-ce">{mes}</p>
            {/* Lose Button */}
            <button className="btn btn-red fred m-t-2" onClick={clicked}>{btn}</button>
        </div>
    </div>
}

/* Win pop up container */
const Win = (props)=>{

    const {stats,set} = props;
    const {spn,csh} = winTxt;
    const {bank,ctr} = stats;
    /* Win text variables */
    const {head,stat,punc,mes,btn,grt} = pop[1].win;

        /* handles button click in start pop up */
        const clicked = async(val)=>{

            let value =0;
            //Decrements spins left and hides pop up
            set({
                ...stats,
                show:false,
                ctr:ctr-1
            })
            //Spins wheel with delay
            await spin();
            await delay();

            // If 3 spins left
            if(ctr === 3){
                //lose pop up is shown and spin left decremented
                set({
                    ...stats,
                    show:true,
                    lose:true,
                    win:false,
                    ctr:ctr-1
                })
            }else{
                //win pop up is shown and spin left decremented
                set({
                    ...stats,
                    show:true,
                    lose:false,
                    win:true,
                    ctr:ctr-1
                })
            }

        }

    //Sets current balance value
    useEffect(() => {
        check(ctr+1,bank).then(val=>{
            set({
                ...stats,
                bank:val
            })
        })
    },[])


    return <div className="flx cent flx-wrp p-15 bg-blk flx-col w-40 h-50 fade-t popCont">
        <div className="flx p-50 flx-wrp flx-jc-sa w-100 h-100 bg-blk2 flx-col">
            <h2 className="txt-wht fred txt-al-ce">{head}<span className="txt-ylw">{stat}</span>{punc}</h2>
            <h4 className="txt-wht fred txt-al-ce m-t-2">{ctr===0?grt:ctr===3?csh.grt:spn.grt}</h4>
            <p className="txt-wht lato m-t-2 txt-al-ce">{ctr===0?mes:ctr===3?csh.mes:spn.mes}</p>
            <button className="btn btn-ylw fred m-t-2 product-button"
          data-product-id="1" onClick={ctr===0?(elem)=>ActionRedirect(elem.target.dataset.productId):clicked}>{ctr===0?btn:winTxt.btn}</button>
        </div>
    </div>
}

/* Start pop up container */
const Start = (props)=>{
    
    const {stats,set} = props;
    // Package button state
    const [click, setClick] = useState({
        show:false,
        tech:true,
        groc:true,
        vouch:true,
        food:true
    })

    return <div className="flx p-15 cent flx-wrp w-40 h-50 bg-blk fade-t popCont">
        <div className="flx p-50 flx-wrp w-100 h-100 bg-blk2">
            <h2 className="txt-wht fred">{head}</h2>
            <p className="txt-wht lato m-t-2">{mes}</p>
            <PopBtn click={click} set={setClick} stats={stats} setClk={set}/>
        </div>
    </div>
}

/* This is the component for the main pop up background */
const Pop = (props)=>{

    const {stat,set} = props;
    const {win,lose,start} = stat;

    return <div className="flx cent bg-pop w-100 h-100 pos-abs z-top flx-wrp fade">
        {start&&<Start stats={stat} set={set}/>}
        {lose&&<Lose stats={stat} set={set}/>}
        {win&&<Win stats={stat} set={set}/>}
    </div>
}

export {Pop}