function nextStep(step){
  document.querySelectorAll('[id^="step"]').forEach(el=>el.classList.add("hidden"));
  document.getElementById("step"+step).classList.remove("hidden");
}

function processLoan(){
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("loading").classList.remove("hidden");

  setTimeout(()=>{
    document.getElementById("loading").classList.add("hidden");
    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;

    document.getElementById("result").innerHTML =
      "✅ "+name+", your loan of "+amount+" BDT is Approved (Demo)";
  },2000);
}
