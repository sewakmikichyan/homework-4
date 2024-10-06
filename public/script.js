
const form = document.getElementById("form");
const inputs = {
    name: document.getElementById("name__input"),
    lastname: document.getElementById("lastname__input"),
    age: document.getElementById("age__input")
};
const usersPromise = fetch("/users");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        name: inputs.name.value,
        lastname: inputs.lastname.value,
        age: inputs.age.value
    };

    const id = `${data.name}_${data.lastname}_${data.age}`;

    for (let key in data) {
        if (!data[key]) {
            const description = "You cannot enter information because it is empty!";
            alert(description);
            throw new Error(description);
        }
    }

    usersPromise.then(res => res.json()).then(users => {
        if (users.find(user => user.id == id)) {
            const description = "You cannot enter information because such data already exists!";
            alert(description);
            throw new Error(description);
        } else {
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }
    }).finally(() => {
        window.location.reload();
    });
});

function getUserData(id) {
    return fetch("/users")
        .then(res => res.json())
        .then(users => {
            return users.find(user => user.id == id);
        });
}

getUserData("Sevak_Mikichyan_17").then(user => {
    console.log(user);
});
