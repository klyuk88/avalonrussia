window.onload = function() {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        const animate = document.querySelector('.animate');
        animate.classList.toggle('animate-bottom');
    }, 500);
}


const accordion = document.querySelectorAll('.abaut-acrd');

accordion.forEach((item, idx) => {
    if (idx === 0) {
        item.classList.add("active")
    }
})

accordion.forEach((item, idx) => {
    item.addEventListener("click", function() {
        accordion.forEach(elem => {
            elem.classList.remove("active")
        })
        this.classList.add('active')
    })
});

const forms = document.querySelectorAll('form')

forms.forEach(item => {
    item.addEventListener("submit", async (event) => {
        event.preventDefault()
        try {
            let res = await fetch('/mail.php', {
                method: "post",
                body: new FormData(item)
            })
            window.location.replace("http://localhost:3000/thanks");
        } catch (error) {
            console.log(error);
        }

    })
})