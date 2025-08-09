let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 4000); // 4 seconds per slide
}

window.onload = showSlides;

document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("explore-btn");
  const dropdown = document.getElementById("explore-dropdown");

  exploreBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!exploreBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
});


input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    const userQuestion = input.value.trim();
    addMessage(userQuestion, 'user');
    input.value = '';

    addMessage("Bot is typing...", 'bot', true); // true = isTyping flag

    const questionLower = userQuestion.toLowerCase();
    let answer = "Sorry, I didn't understand that. Can you try asking differently?";

    for (const keyword in faq) {
      if (questionLower.includes(keyword)) {
        answer = faq[keyword];
        break;
      }
    }

    // Remove typing message before answer
    setTimeout(() => {
      const typingMsg = [...messages.querySelectorAll('.chatbot-message.bot')].find(m => m.textContent === "Bot is typing...");
      if (typingMsg) typingMsg.remove();
      addMessage(answer, 'bot');
    }, 1000);
  }
});

