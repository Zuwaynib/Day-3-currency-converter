const dropList = document.querySelectorAll(".dropbox select");
getButton = document.querySelector("#get-button");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");

for(let i = 0; i < dropList.length; i++) {
    for(currency_code in country_list) {
        let selected;
        if(i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }else if (i == 1) {
            selected = currency_code == "NGN" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for(list in country_list) {
        if(list == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[list]}/flat/64.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
})
getButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})


function getExchangeRate() {
    let amount = document.querySelector(".amount input");
    let exchangeRateText = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateText.innerHTML = "Getting exchange rate...";

    let url = `https://v6.exchangerate-api.com/v6/483504f5b8974c28dce0dad7/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateText.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateText.textContent = "Something went wrong...";
    })
}
