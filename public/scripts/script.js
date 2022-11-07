window.onload = function() {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        const animate = document.querySelector('.animate');
        animate.classList.toggle('animate-bottom');
    }, 500);
}

