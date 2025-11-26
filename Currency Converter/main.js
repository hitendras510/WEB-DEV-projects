
const populate = (base, value) =>{
    url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_cRZKbTzcoZYkXRxqMFDkVIaomYUMUyTKKTC4zcMY&base_currency=";
}



const btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("button is clicked");
    const value = document.querySelector("input[name='quantity']").value;
    populate();
})

const tableBody = document.getElementsByTagName("tbody");
tableBody.innerHtml = `
<tr>
    <td>INR</td>
    <td>USD</td>
    <td>EUR</td>
</tr>
`;
