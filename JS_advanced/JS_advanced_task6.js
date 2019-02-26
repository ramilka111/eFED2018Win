//6. setInterval

function alertMessages() {
    let i = 1;
    let timerId = setInterval(function() {
        console.log("Opa opa opa");
        if (i == 5) clearInterval(timerId);
        i++;

    }, 2000);
}

alertMessages();