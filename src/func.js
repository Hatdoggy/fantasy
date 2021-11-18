/* Get's url parameters */
function getURLParameter(name) {
    return decodeURI(
      (RegExp(name + "=" + "(.+?)(&|$)").exec(window.location.search) || [
        ,
        null,
      ])[1] || ""
    );
  }
  
  /* Parameter variables */
  let subid = getURLParameter("subid");
  let subid2 = getURLParameter("subid2");
  let firstname = getURLParameter("firstname");
  let surname = getURLParameter("surname");
  let city = getURLParameter("city");
  let zipcode = getURLParameter("zipcode");
  let address = getURLParameter("address");
  let phone = getURLParameter("phone");
  let mobile = getURLParameter("mobile");
  let pid = getURLParameter("pid");
  let nrp = getURLParameter("nrp");
  
  let ffdomain = "https://" + getURLParameter("ffdomain");
  let session = getURLParameter("session");
  let fluxf = getURLParameter("fluxf");
  let fluxffn = getURLParameter("fluxffn");
  
  /* Redirection function */
  function ActionRedirect(action) {
    window.location.replace(
      ffdomain +
        "/?flux_action=" +
        action +
        "&flux_f=" +
        fluxf +
        "&flux_ffn=" +
        fluxffn +
        "&flux_sess=" +
        session
    );
  }
  
  /* Spin control variable handles which spin is used */
  let count = 1;
  
  /* This function is responsible for spinning the wheel */
  function spin() {
    /* Selects the spinner */
    let wheel = document.querySelector("#spinner");
    let ret = undefined;
    switch (count) {
      case 1:
          /* First Spin */
        wheel.classList.add("spinAround");
        ret = new Promise((res) => {
          setTimeout(res, 7000);
        });
        break;
      case 2:
          /* Second Spin */
        wheel.classList.add("spinAround2");
        ret = new Promise((res) => {
          setTimeout(res, 7000);
        });
        break;
      case 3:
          /* Third Spin */
        wheel.classList.add("spinAround3");
        ret = new Promise((res) => {
          setTimeout(res, 7000);
        });
        break;
      case 4:
          /* Fourth Spin */
        wheel.classList.add("spinAround4");
        ret = new Promise((res) => {
          setTimeout(res, 7000);
        });
        break;
    default:
        /* Final Spin */
        wheel.classList.add("spinAround5");
        ret = new Promise((res) => {
          setTimeout(res, 7000);
        });
        break;
    }
    count++;
    return ret;
  }

  /* Checks how much is added or subtracted to bank */
const check = (ctr,bal)=>{
    let ret = 0;

    switch (ctr) {
        case 5:
            ret = bal-50;
        break;
        case 4:
            ret = bal+50
        break;
        case 3:
            ret = 0;
        break;
        case 2:
            ret = bal
        break; 
        default:
            ret = 200
        break;
    }

    return new Promise(res=>{
        setTimeout(()=>{
            res(ret)
        },100)
    })
}

/* Delay for functions */
const delay = ()=>{
    //Delays for 1500 ms
    return new Promise(res=>{
        setTimeout(()=>{
            res();
        },1500)
    })
}

export {check,delay,spin,ActionRedirect}