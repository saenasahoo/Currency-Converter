let BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for (let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="From" && currCode==="USD" ){
            newOption.selected="selected";

        }else if(select.name==="To" && currCode==="INR"){
            newOption.selected="selected";
        }
       
}
 select.addEventListener("change",(evt)=>{
   flagUpdate(evt.target);
});
}

const flagUpdate=(element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal==="1"){
        amount.value=1;
        amtVal=1;
    }
    const url= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
     let response=await fetch(url);
     let rate= await response.json();
     
     let data=rate[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
     let finalAmt=amtVal*data;
     msg.innerText=`${amtVal}${fromCurr.value}=${finalAmt}${toCurr.value}`;


});