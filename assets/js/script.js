function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}

init();

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 27%",
        end: "top -50",
        scrub: 0.1,
    },
});

tl.to(
    ".page1 h1",
    {
        x: -50,
        duration: 0.5,
    },
    "same-time-animation"
);

tl.to(
    ".page1 h2",
    {
        duration: 0.5,
        x: 50,
    },
    "same-time-animation"
);

const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        markers: true,
        start: "top -70%",
        end: "top -180",
        scrub: 10,
    },
});

tl2.to(".main", {
    backgroundColor: "#18181b",
});

document.addEventListener("click", function (e) {
    const dropdown = document.querySelector(".profile-dropdown");
    const isClickInside = dropdown.contains(e.target);

    if (!isClickInside) {
        const dropdownContent = document.querySelector(".dropdown-content");
        dropdownContent.style.display = "none";
    }
});

const profileDropdown = document.querySelector(".profile-dropdown");
profileDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

document.getElementById("send-button").addEventListener("click", function () {
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value;

    if (message.trim() !== "") {
        const chatMessages = document.getElementById("chat-messages");

        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "right");
        newMessage.innerHTML = `<p>${message}</p>`;

        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

        chatInput.value = "";
    }
});

document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("send-button").click();
    }
});

function removeConnection(link) {
    const connection = link.closest(".connection");
    connection.remove();
}
