import { useMediaQuery } from "react-responsive";
import { check,spin,delay } from "../func";
import { Svg } from "./svg";

const {head,how,det,stat,cur,terms} = window.txt.greet;

/* Renders the left component beside spinner containing user stats, and tutorial*/
const Left = (props)=>{

    //Checks if mobile
    const mobile = useMediaQuery({
        query: '(max-width:1000px)'
    })

    const {bal,spn,btn} = stat; 
    const {stats,set} = props;

    /* Handle first click */
    const click = async()=>{
        const {bank,ctr} = stats;

        //Wait for spin to finish
        await spin();

        //shows popup
        set({
            ...stats,
            show:true,
            ctr:ctr-1
        })

        //Checks how much is added or subtracted to bank
        check(ctr,bank).then((val) => {
            set({
                ...stats,
                show:true,
                ctr:ctr-1,
                bank:val
            })          
        })

    }

    return(
        <section className="w-50 h-100 flx flx-wrp cent fade"> 
            <div className="w-80 h-80 flx flx-col flx-jc-sa bg-pop2 flx-ai-strt p-50 fade-t">
            {/* Logo */}
            {mobile&&<img src="./img/logo.png" alt="logo" className="w-30"/>}
            {/* Head text */}
            <h2 className="txt-wht fred w-100 flx-al-l">{head}</h2>    
            
            {/* How to Play */}
            <div className="flx flx-col flx-wrp w-100 hideMe">
                <p className="txt-wht fred">{how.head}</p>
                <p className="txt-wht lato">{how.mes}</p>
            </div>

            {/* What you can win */}
            {!mobile&&
                        <div className="flx flx-col flx-wrp w-100 hideMe">
                        <p className="txt-wht fred">{det.head}</p>
                        <p className="txt-wht lato">{det.mes}</p>
                    </div>}

            {/* User Stats */}
            <div className="flx flx-jc-ce w-100">
                {/* Balance */}
                <div className="flx flx-col flx-jc-strt flx-ai-strt w-50">
                    <p className="fred txt-wht">{bal.label}</p>
                    <h4 className="lato txt-wht m-l-auto">{cur}{stats.bank}</h4>
                </div>
                {/* Spins Left */}
                <div className="flx flx-col flx-jc-strt flx-ai-strt w-50 m-l-5">
                    <p className="fred txt-wht">{spn.label}</p>
                    <h4 className="lato txt-wht m-l-auto">{stats.ctr}</h4>
                </div>
                
            </div>
            
            {/* Initial spin button  */}
            {
                //Button only appears if ctr === 5 
                (stats.ctr === 5)&&<button className="pulse btn btn-grd txt-wht fred w-50" onClick={(stats.ctr === 5 && stats.lose)?click:undefined}>{btn}</button>
            }
            </div>

            {
            // only appears when not in mobile 
            !mobile&& 
                <div className=" terms w-80 flx flx-col flx-ai-strt txt-wht m-t-2 fade-l">
                <p className="fred txt-wht">{terms.label}</p>
                <small className="lato txt-wht w-50">{terms.mes}</small>
            </div>}
        </section>
    )
}

/* Renders SVG */
const SvgCont = ()=>{
    return(
        <section className="w-50 h-100 flx flx-wrp cent ovr-hide pos-rel">
            <Svg/>
        </section>
    )
}

/* Main Component renders the spinner, user stats, and tutorial */
const Main = (props)=>{

    const mobile = useMediaQuery({
        query: '(max-width:1000px)'
    })
    
    const {stat,set} = props;

    return(
        <main className="flx cent flx-wrp w-100 h-100">
             {/*  Loads Terms and Conditions when on mobile */}
             {mobile&&<div className=" terms w-80 flx flx-col flx-ai-strt txt-wht m-t-2">
                <p className="fred txt-wht">{terms.label}</p>
                <small className="lato txt-wht w-50">{terms.mes}</small>
            </div>}           
            {/* Loads component containing Stats of user */}
            <Left stats={stat} set={set}/>
            
            {/* Loads SVG */}
            <SvgCont/>

        </main>
    )
}

export {Main}