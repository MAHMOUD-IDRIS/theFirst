const addedValue = document.getElementById('inputMoney');
const btnAdd = document.getElementById('addBtn');
const calcBtn = document.getElementById('calcBtn')
const optionValue = document.getElementById('select');
const descriptionValue = document.getElementById('desc')
const listDisplay = document.getElementById('listDisplay');
const displayIncome = document.getElementById('totalin');
const displayExp = document.getElementById('totalExp');
const displayBalance = document.getElementById('balance');

/* help buttons and logic  */
const helpbtn = document.getElementById('helpbtn');
const clseHelp = document.getElementById('helpcloseBtn');
const helpVideo = document.getElementById('helpVideo');
clseHelp.onclick = function(){helpVideo.style.display = "all"};
//**help buttons and logic ^ */

let income = 0;
let expences = 0;
let food = 0;

let styleColor = "cyan"

function addItem (value, option, description){
  value *= 1;
  const li = document.createElement('li');
  const numberValue = document.createElement('p');
  const opt = option == "Income" ? "+" : "-" ;
    li.innerHTML = opt + "  " + value;
  const descValue = document.createElement('p');
  descValue.innerText = description;
  const btn = document.createElement('button');
  btn.innerText = "X";
  
  
    //**************  operations */

    if(option == "Income"){
      income += value
    } else if (option == "expence"){
      expences += value
    } else {
      food += value;
    }

    li.appendChild(numberValue);
    li.appendChild(descValue);
    li.appendChild(btn);
    listDisplay.appendChild(li);
    console.log(`income ${income}, expences ${expences}, food ${food}, balance = ${income - expences}`);
    displayIncome.innerText = income;
    displayExp.innerText = expences;
    displayBalance.innerText = income - expences;

}

btnAdd.onclick = function(){
    addItem(addedValue.value, optionValue.value, desc.value);
    
};

calcBtn.onclick = ()=>{
  console.log(` this is the calculation : \n income ${income}, expences ${expences}, food ${food}, balance = ${income - expences}`);
}
