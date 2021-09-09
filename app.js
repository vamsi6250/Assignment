let name = "";
let last = "";
let pass = "";
let user = "";
let mail = "test@gmail.com";

let userData = "";

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const profile = document.getElementById("Profiles");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cancel = document.getElementById("cancel");
const add = document.getElementById("add");

const userDetails = document.getElementById("userDetails");

const getData = async() => {
    const response = await fetch("http://3.6.93.159:7883/machstatz/get_all_users");
    const data = await response.json()
    console.log(data);
    data.map((eachItem) => {
        UpdateData(eachItem.fist_name, eachItem.last_name);
    })

}

getData();

firstName.addEventListener("blur", (e) => {
    name = e.target.value
    console.log(name)
})

lastName.addEventListener("blur", (e) => {
    last = e.target.value
})

userName.addEventListener("blur", (e) => {
    user = e.target.value
})

password.addEventListener("blur", (e) => {
    pass = e.target.value
})

email.addEventListener("blur", (e) => {
    mail = e.target.value
})


const uploadData = async() => {
    const payload = {
        "email": mail,
        "fist_name": name,
        "last_name": last,
        "pwd": pass,
        "username": user
    }

    const response = await fetch('http://3.6.93.159:7883/machstatz/add_new_user', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    getData();

}


const deleteUser = async() => {
    const payloads = {
        email: "vamsikrishh@gmail.com"
    }

    const response = await fetch("http://3.6.93.159:7883/machstatz/delete_existing_user", {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloads),
    })
    const result = await response.json()
    console.log(result);

    getData();
}

add.addEventListener("click", () => {
    uploadData()
})

cancel.addEventListener("click", () => {
    console.log("clicked");
    deleteUser();
})






function UpdateData(f, l) {
    const holder = document.createElement("div")
    const container = document.createElement("div");
    const card = document.createElement("div");

    const editButton = document.createElement("p");
    editButton.textContent = "edit"
    const delButton = document.createElement("p");
    delButton.classList.add("m-1");
    delButton.textContent = "del"
    card.appendChild(editButton);
    card.appendChild(delButton);
    holder.classList.add("usercard")
    container.classList.add("col-3")
    const name = document.createElement("h1");

    name.classList.add("cad-heading");
    name.textContent = `${f} ${l}`;
    card.classList.add("d-flex", "flex-row");
    userDetails.appendChild(container);
    holder.appendChild(card);
    holder.appendChild(name);

    container.appendChild(holder)

};