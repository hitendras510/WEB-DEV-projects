const populate = async (value, currency) => {
  let myStr = "";

  const url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_cRZKbTzcoZYkXRxqMFDkVIaomYUMUyTKKTC4zcMY&base_currency=" +
    currency;

  const response = await fetch(url);
  let rJson = await response.json();

  console.log(rJson);

  for (let key in rJson.data) {
    const code = rJson.data[key].code;
    const rate = rJson.data[key].value;
    const converted = (rate * value).toFixed(2);

    myStr += `
            <tr>
                <td>${code}</td>
                <td>${rate}</td>
                <td>${converted}</td>
            </tr>
        `;
  }

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = myStr;
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const value = parseInt(
    document.querySelector("input[name='quantity']").value
  );
  const currency = document.querySelector("select[name='currency']").value;

  populate(value, currency);
});
