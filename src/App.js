import { useState ,useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import { Main } from './components/main.js';
import {Pop} from './components/pop.js';

function App() {
  
  //Checks if mobile
  const mobile = useMediaQuery({
    query: '(max-width:1000px)'
  })
  const {bal,spn} =window.txt.greet.stat;

  //Current component rendered state
  const [stat, setStat] = useState({
    show:false,
    start:true,
    lose:false,
    win:false,
    ctr:spn.val,
    bank:bal.val,
  })
  
  useEffect(()=>{
    //renders first pop up
    setTimeout(()=>{
      setStat({
        ...stat,
        show:true
      })
    },1500 )
  },[])

  return (
    <div className="App w-100 h-100 pos-rel flx flx-col flx-ai-ce flx-jc-ce"> 
      {/* Logo */}
      {!mobile&&<img src="./img/logo.png" alt="logo" className="w-10"/>}
      {stat.show&&<Pop stat={stat} set={setStat}/>}
      <Main stat={stat} set={setStat}/>
    </div>
  );
}

export default App;
