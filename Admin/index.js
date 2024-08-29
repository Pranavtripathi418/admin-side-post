const form = document.querySelector("#form");
const amount = document.querySelector("#sprice");
const descrip = document.querySelector("#description");
const productList = document.querySelector("#Produts"); 

form.addEventListener('submit', onsubmit);

function onsubmit(e) {
    e.preventDefault(); 
    
    let myoj = {
        amount: amount.value,
        descrip: descrip.value,
    };

    // Sending a POST request to crudcrud to add a new product
    axios.post('https://crudcrud.com/api/497abcfdeb5e42d3af79f8baed230e08/products', myoj)
        .then((res) => showonscreen(res.data))
        .catch(err => console.log(err));

    // Clear the input fields after submission
    amount.value = "";
    descrip.value = "";
}

function deletefn(userid) {
    console.log(userid);
    
    // Sending a DELETE request to remove a product by its ID
    axios.delete(`https://crudcrud.com/api/497abcfdeb5e42d3af79f8baed230e08/products/${userid}`)
        .then(() => {
            removeuserfromscreen(userid);
        })
        .catch(err => console.log(err));
}

function removeuserfromscreen(userid) {
    const childnodedelt = document.getElementById(userid);
    if (childnodedelt) {
        productList.removeChild(childnodedelt); 
    }
}

function showonscreen(obj) {
    let amt = obj.amount;
    let des = obj.descrip;
    let userid = obj._id;
    
    const childHTML = `<li class="list-group-item" id=${userid}>${amt} ${des} 
    <button onclick="deletefn('${userid}')" class="delete btn btn-danger mx-2">Delete</button></li>`;
    
    productList.innerHTML += childHTML; 
}

window.addEventListener("DOMContentLoaded", () => {
    // Fetch existing products from crudcrud on page load
    axios.get("https://crudcrud.com/api/497abcfdeb5e42d3af79f8baed230e08/products")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showonscreen(res.data[i]);
            }
        })
        .catch(err => console.log(err));
});
