let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 4000);
}

window.onload = showSlides;

document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("explore-btn");
  const dropdown = document.getElementById("explore-dropdown");

  exploreBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!exploreBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // Chatbot
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotBox = document.getElementById('chatbot-box');
  const chatbotClose = document.getElementById('chatbot-close');
  const messages = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');

  const faq = {
    location: "Hi! Thank you for showing interest. We will come to your city soon!",
    products: "We offer a variety of products you can check out in the Products section.",
    contact: "You can contact us via email at clearvibesip@gmail.com.",
    brand: "Our brand is all about quality and customer satisfaction. For further details, you can read the About section.",
    launching: "Thank you for your patience! We will be live in your city soon."
  };

  function addMessage(text, sender, isTyping = false) {
    const msg = document.createElement('div');
    msg.classList.add('chatbot-message', sender);
    msg.textContent = text;
    if (isTyping) {
      msg.style.fontStyle = 'italic';
      msg.style.opacity = '0.7';
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  chatbotIcon.addEventListener('click', () => {
    chatbotBox.style.display = 'flex';
    input.focus();
  });

  chatbotClose.addEventListener('click', () => {
    chatbotBox.style.display = 'none';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      const userQuestion = input.value.trim();
      addMessage(userQuestion, 'user');
      input.value = '';

      addMessage("Bot is typing...", 'bot', true);

      const questionLower = userQuestion.toLowerCase();
      let answer = "Sorry, I didn't understand that. Can you try asking differently?";

      for (const keyword in faq) {
        if (questionLower.includes(keyword)) {
          answer = faq[keyword];
          break;
        }
      }

      setTimeout(() => {
        const typingMsg = [...messages.querySelectorAll('.chatbot-message.bot')]
          .find(m => m.textContent === "Bot is typing...");
        if (typingMsg) typingMsg.remove();

        addMessage(answer, 'bot');
      }, 800);
    }
  });
});
