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

const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1",
        scroller: ".main",
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
    sendMessage("chat-input", "chat-messages");
});

document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage("chat-input", "chat-messages");
    }
});

function sendMessage(inputId, messagesId) {
    const chatInput = document.getElementById(inputId);
    const message = chatInput.value;

    if (message.trim() !== "") {
        const chatMessages = document.getElementById(messagesId);

        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "right");
        newMessage.innerHTML = `<p>${message}</p>`;

        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        chatInput.value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const leftPersons = document.querySelectorAll(".person");
    const messagesRightFixed = document.getElementById("messages-right-fixed");

    leftPersons.forEach((person) => {
        person.addEventListener("click", function () {
            messagesRightFixed.classList.toggle("full-width");
        });
    });
});
