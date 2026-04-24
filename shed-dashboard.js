document.addEventListener("DOMContentLoaded", function () {

const district = localStorage.getItem("selectedDistrict");
const shed = localStorage.getItem("selectedShed");

document.getElementById("shedTitle").innerText = "FarmSync - " + shed;

let farmDB = getFarmDB();

if (!farmDB[district]) {
    farmDB[district] = {};
}

if (!farmDB[district][shed]) {
    farmDB[district][shed] = {};
}

let shedData = farmDB[district][shed];

shedData.birds = shedData.birds ?? CONFIG.SHED_CAPACITY;
shedData.feed = shedData.feed ?? 400;
shedData.temp = shedData.temp ?? 28;

shedData.income = shedData.income ?? 0;
shedData.expense = shedData.expense ?? 0;
shedData.profit = shedData.profit ?? 0;
shedData.soldBirds = shedData.soldBirds ?? 0;

function saveData(){
    saveFarmDB(farmDB);
}

/* PROFIT */

function calculateProfit(){
    shedData.profit = shedData.income - shedData.expense;
}

function updateProfitDisplay(){

    calculateProfit();

    const profitBox = document.getElementById("profitDisplay");

    profitBox.innerText = "₹" + shedData.profit;

    profitBox.style.color = shedData.profit >= 0 ? "green" : "red";
}

/* FEED ALERT */

function checkFeedAlert(){

    const alertBox = document.getElementById("feedAlert");

    if (shedData.feed < CONFIG.FEED_ALERT_LEVEL){

        alertBox.innerText = "⚠ Low Feed Alert";
        alertBox.style.color = "red";

    } else {

        alertBox.innerText = "";

    }
}

/* INITIAL DISPLAY */

document.getElementById("birdCount").innerText = shedData.birds;
document.getElementById("feedStock").innerText = shedData.feed;
document.getElementById("tempValue").innerText = shedData.temp + "°C";

updateProfitDisplay();
checkFeedAlert();

/* THERMOMETER INITIALIZATION */

const fill = document.getElementById("tempFill");

if(fill){

let percent = ((shedData.temp - 20) / 20) * 100;

if(percent < 5){
percent = 5;
}

fill.style.height = percent + "%";

}

/* SLIDER VALUE DISPLAY */

const birdSlider = document.getElementById("addBirds");
const birdValue = document.getElementById("addBirdsValue");

birdValue.innerText = birdSlider.value + " hens";

birdSlider.addEventListener("input", function(){
    birdValue.innerText = this.value + " hens";
});


const tempSlider = document.getElementById("tempInput");
const tempSliderValue = document.getElementById("tempSliderValue");

tempSliderValue.innerText = tempSlider.value + "°C";

tempSlider.addEventListener("input", function(){
    tempSliderValue.innerText = this.value + "°C";
});


const feedSlider = document.getElementById("addFeed");
const feedValue = document.getElementById("addFeedValue");

feedValue.innerText = feedSlider.value + " tons";

feedSlider.addEventListener("input", function(){
    feedValue.innerText = this.value + " tons";
});


const feedConsumeSlider = document.getElementById("feedHensAmount");
const feedConsumeValue = document.getElementById("feedConsumeValue");

feedConsumeValue.innerText = feedConsumeSlider.value + " tons";

feedConsumeSlider.addEventListener("input", function(){
    feedConsumeValue.innerText = this.value + " tons";
});

/* ADD HENS */

window.addBirds = function(){

    const value = parseInt(document.getElementById("addBirds").value);

    if(value > 0){

        if(shedData.birds + value > CONFIG.SHED_CAPACITY){
            alert("Maximum shed capacity is 60,000 hens");
            return;
        }

        const chickCost = 35;
        const totalCost = value * chickCost;

        shedData.expense += totalCost;
        shedData.birds += value;

        document.getElementById("birdCount").innerText = shedData.birds;

        updateProfitDisplay();
        saveData();
    }
};

/* SELL HENS */

window.sellBirds = function(){

    const qty = parseInt(document.getElementById("sellBirds").value);
    const price = parseInt(document.getElementById("pricePerHen").value);

    if(qty > 0 && qty <= shedData.birds && price > 0){

        shedData.birds -= qty;
        shedData.soldBirds += qty;

        const totalSale = qty * price;

        shedData.income += totalSale;

        document.getElementById("birdCount").innerText = shedData.birds;

        updateProfitDisplay();
        saveData();
    }
};

/* TEMPERATURE */

window.updateTemp = function(){
    const temp = parseInt(document.getElementById("tempInput").value);
    if(!isNaN(temp)){
        shedData.temp = temp;
        document.getElementById("tempValue").innerText = temp + "°C";
        const fill = document.getElementById("tempFill");
        let percent = ((temp - 20) / 20) * 100;
        /* prevent 0% height */
        if(percent < 5){
            percent = 5;
        }
        fill.style.height = percent + "%";
        fill.style.height = percent + "%";
        let status = document.getElementById("tempStatus");
        if(temp < 24){
            status.innerText = "Low Temperature";
        }
        else if(temp <= 30){
            status.innerText = "Optimal Temperature";
        }
        else{
            status.innerText = "High Temperature";
        }
    saveData();
}};

/* ADD FEED */

window.addFeed = function(){

    const value = parseFloat(document.getElementById("addFeed").value);

    if(value > 0){

        if(shedData.feed + value > 400){
            alert("Feed cannot exceed 400 tons");
            return;
        }

        shedData.feed += value;

        const feedCost = value * CONFIG.FEED_COST_PER_TON;

        shedData.expense += feedCost;

        document.getElementById("feedStock").innerText = shedData.feed;

        updateProfitDisplay();
        checkFeedAlert();

        saveData();
    }
};

/* FEED HENS */

window.feedHens = function(){

    const consume = parseFloat(document.getElementById("feedHensAmount").value);

    if(consume > 0){

        if(consume <= shedData.feed){

            shedData.feed -= consume;

            document.getElementById("feedStock").innerText = shedData.feed;

            checkFeedAlert();
            saveData();

        }else{

            alert("Not enough feed stock");

        }
    }
};

});