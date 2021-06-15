const addedValue = document.getElementById('inputMoney');
const btnAdd = document.getElementById('addBtn');
const calcBtn = document.getElementById('calcBtn')
const optionValue = document.getElementById('select');
const descriptionValue = document.getElementById('desc')
const listDisplay = document.getElementById('listDisplay');
const displayIncome = document.getElementById('totalin');
const displayExp = document.getElementById('totalExp');
const displayBalance = document.getElementById('balance');
const startBtn = document.getElementById('start');
const numberOfPeopleInCarInput = document.getElementById('numberOfPeople');
/* help buttons and logic  */
const helpbtn = document.getElementById('helpBtn');

const closepopup = document.querySelectorAll('.closepopup');
const popup = document.querySelectorAll('.popup');
const helpPopup = document.getElementById('helpPop');
const lang = document.getElementById('lang');
console.log(lang)
lang.onchange = ()=>{
  console.log(lang.value)
  if(lang.value == "E" ) {
    document.location.reload();
  }
  if (lang.value == "A"){
    numberOfPeopleInCarInput.placeholder = 'عدد الأفراد في السيارة';
    document.getElementById('timeStarted').placeholder = "وقت بدء العمل";
    document.getElementById('start').innerText = "إبدأ";
    addedValue.placeholder = " ريال"
    descriptionValue.placeholder = "الوصف"
    btnAdd.innerText = "إضافة";
    document.querySelector('.income').innerText = "دخل";
    document.querySelector('.expence').innerText = "منصرف";
    document.querySelector('.food').innerText = "منصرف أكل";
    document.getElementById('timeback').placeholder = "وقت العودة";
    calcBtn.innerText = "أحسب";
    document.getElementById('areYouSureMsg').innerText = "هل أنت متأكد من أنك تريد مسح جميع البيانات المدخلة؟";
   document.getElementById('income-word').innerText = "الدخل "
   document.getElementById('expence-word').innerText = "المنصرف "
   document.getElementById('balance-word').innerText = "الصافي "
   document.getElementById('car-food').innerText = "الأكل" 
   document.getElementById('car-over').innerText = "أوفر تايم" 

  }

}

closepopup.forEach(el=>{
  el.onclick = function()
{ 
  el.parentElement.classList.add("hide")
  }
})
helpbtn.onclick = function(){
  helpPopup.classList.remove("hide");
}
//**help buttons and logic ^ */
let numberOfPeopleInCar = 0;
let timeStarted = 0;
let timeBack = 0;
let income = 0;
let carOverTime = 0;
let carFood = 0;
let giveEachone = 0;
let food = 0;
let expences = 0;

/**** test the equations */
startBtn.onclick = function(){
  timeStarted = document.getElementById('timeStarted').value;
  if(numberOfPeopleInCarInput.value == ""){return}
  numberOfPeopleInCar = numberOfPeopleInCarInput.value;
  console.log(numberOfPeopleInCar)
  carFood = 15 * numberOfPeopleInCar
  displayFoodNdOvertime()
  numberOfPeopleInCarInput.value = ""
  document.getElementById('starts').setAttribute("class","hide");
  
}





function addItem (value, option, description){
  value *= 1;
  const li = document.createElement('li');
  const numberValue = document.createElement('p');
  numberValue.setAttribute('class', "money")
  const opt = option == "Income" ? "+" : "-" ;
    li.innerHTML = opt + "  " + value;
    option == "food" ? li.classList.add('food'): li.classList.add('cashFlow');
    li.value = opt == "+" ? value : value*-1;
    console.log(li.value + " this is the value of the item")
  const descValue = document.createElement('p');
  descValue.innerText = description || option;
  const btn = document.createElement('button');
  btn.innerText = "X";
  
  btn.setAttribute("class", 'removeBtn');
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
     displaySubSummary ();

    

    const removeBtns = document.querySelectorAll('.removeBtn');
    removeBtns.forEach((el)=>{
el.onclick = function (fd){
  let deletedValue = fd.target.parentElement.value
console.log( deletedValue+ " deleted Value");
console.log(`list class deleted ${fd.target.parentElement.classList.value}`)
if(fd.target.parentElement.classList.value == "food") {food += deletedValue} else {
  deletedValue < 0 ? expences += deletedValue : income -= deletedValue;
}


listDisplay.removeChild(fd.target.parentElement)
displaySubSummary();
}
    })
}

function displaySubSummary (){
  displayIncome.innerText = income;
  displayExp.innerText = expences + carFood + carOverTime;
  displayBalance.innerText = income - expences - carOverTime - carFood;
}

btnAdd.onclick = function(){
  if(addedValue.value == "") {return}
    addItem(addedValue.value, optionValue.value, desc.value);
    addedValue.value = "";
    desc.value = ""
};

calcBtn.onclick = ()=>{
  timeBack = document.getElementById('timeback').value || 0;
   if (timeStarted == 0){
     timeStarted = 9
   };
   const tBack = timeBack < 6 ? timeBack*1 + 24 : timeBack;
   console.log(`Tback is ${tBack}`)
   const overTIme = tBack - timeStarted;
   let mea = overTIme < 10 ? 0 : overTIme - 10
   console.log("working Hours: " + mea)
/**** */
carOverTime = mea * 5 * numberOfPeopleInCar;
carFood = carOverTime ? numberOfPeopleInCar * 25 : numberOfPeopleInCar * 15 ;
const balanceOfDay =  income - expences - carOverTime - carFood;

/*** displaying Values on Popup*/
giveEach();
  console.log(`income = ${income} \n food = ${carFood} \n over Time = ${carOverTime} \n balance = ${balanceOfDay} time back is ${timeBack} give Each one ${giveEachone}`);

  
  document.getElementById('displayCarFood').innerText ="- " + carFood;
  
  document.getElementById('displayCarOT').innerText ="- " + carOverTime;
  displaySumaryPopup(balanceOfDay);
  //
  document.getElementById('summrayPop').classList.remove('hide');
  consoleLog ();
  displaySubSummary ();
}

/**dealing with popups */
function displayFoodNdOvertime (){
  document.getElementById('displayCarFood').innerText = "- " + carFood;
document.getElementById('displayCarOT').innerText = "- " + carOverTime;
}

function giveEach (){
  let give = (carFood + carOverTime - food)/numberOfPeopleInCar
  document.getElementById('giveeach').innerText = give;
  giveEachone = give;
}



function displaySumaryPopup (balanceOfDay){
  document.getElementById('totalCash').innerText = income;
  document.getElementById('carfood').innerText = carFood;
  document.getElementById('overtimeOnPop').innerText = carOverTime;
  document.getElementById('exp').innerText = expences;
  document.getElementById('balanceOnpop').innerText = balanceOfDay + " SR";
}

function consoleLog (){
  console.log(`summary: \n 
numberOfPeopleInCar : ${numberOfPeopleInCar} \n
 timeStarted : ${timeStarted} \n
 timeBack : ${timeBack} \n
 income: ${income} \n
 expences : ${expences} \n
 carOverTime : ${carOverTime} \n
 carFood : ${carFood} \n
 giveEachone : ${giveEachone} \n
 
`)
}

const deletePopUp = document.getElementById('deletePop');
const reloadBTN = document.getElementById('reload');
reloadBTN.onclick = ()=>{

console.log('reloading!')
deletePop.classList.remove('hide');
}

document.getElementById('deleteNo').onclick = returnNoDelete;
document.getElementById('deleteYes').onclick =
deleteAll;
function deleteAll (targeted){
  //hidePopup(targeted);
  document.location.reload();
}

function returnNoDelete (targeted){
  hidePopup(targeted)
}

function hidePopup (ele){
  console.log(ele.target.parentElement.parentElement.classList.add('hide'))
}