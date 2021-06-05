const addedValue = document.getElementById('addedValue');
const btnAdd = document.getElementById('addValue');
const optionValue = document.getElementById('select');
const listDisplay = document.getElementById('listDisplay');

let sumOfValues = [0];
let styleColor = "cyan"
function addItem (value, option){
    const li = document.createElement('li');
    const opt = option == "income" ? "+" : "-"
    li.innerHTML = opt + "  " + value;
    let valued = option == "income" ? value * 1 : value * -1;
    console.log(valued)
    sumOfValues.push(valued);

    const btn = document.createElement('button');
    btn.innerText = "X";
    li.style.backgroundColor = styleColor;
    li.style.color = opt == "+" ? "black" : "red";
    styleColor = styleColor == "cyan" ? "transparent" : "cyan";
    li.appendChild(btn);
    listDisplay.appendChild(li);
    console.log("sum " + sumOfValues)
    let sums = sumOfValues.reduce((prev, curr)=>{
      return prev+curr
    } )
    console.log(sums);
    
}

btnAdd.onclick = function(){
    addItem(addedValue.value, optionValue.value);
    addedValue.value = "";
};

async function f (){
const Dat = await fetch('./data.json');
const response = await Dat.json();
console.log(response) 
console.log(response.addedValues);
response.addedValues.push(250);
console.log(response.addedValues);

}

f();
