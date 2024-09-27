let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const words = ['DL/Neural Networks Designer', 'PowerBI/Tableau Developer', 'DAX Query Expert', 'ML Model Designer', 'Gamer', 'Frontend Developer', 'Backend Developer'];
let wordIndex = 0;
let charIndex = 0;
let currentWord = '';
let isDeleting = false;

function typeWords() {
    currentWord = words[wordIndex];

    if (isDeleting) {
        document.getElementById('typing-text').textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        document.getElementById('typing-text').textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 1000);
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWords, typingSpeed);
}

document.addEventListener('DOMContentLoaded', function () {
    typeWords();
});

// Updated onSubmit function
const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Get form data

    if (!formData.get("email").trim()) {
        alert("Please enter your email.");
        return;
    }

    if (!formData.get("message").trim()) {
        alert("Message cannot be empty.");
        return;
    }

    const formObject = Object.fromEntries(formData);

    try {
        const response = await fetch("https://portfolio-backend-s4bm.onrender.com/submit-form", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject) // Send form data to backend
        });

        const data = await response.json();

        if (data.success) {
            event.target.reset(); // Clear the form
            alert("Your message has been sent successfully!");
        } else {
            console.error("Error:", data);
            alert("There was an error sending your message. Please try again.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("There was a problem submitting the form.");
    }
}

document.getElementById('contact-form').addEventListener('submit', onSubmit);
