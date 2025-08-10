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

const faq = [
  {
    keywords: ["location", "available in", "city", "coming to"],
    answer: "Hi! Thank you for showing interest. We will come to your city soon! The list of cities where products are available is publish on 1 OCTOBER 2025."
  },
  {
    keywords: ["product", "items", "sell", "range"],
    answer: "We offer a variety of products you can check out in the Products section."
  },
  {
    keywords: ["contact", "email", "support", "help"],
    answer: "You can contact us via email at clearvibesip@gmail.com. We are glad to reach you out."
  },
  {
    keywords: ["brand", "company", "about"],
    answer: "Our brand is all about quality and customer satisfaction. For further details, you can read the About section."
  },
  {
    keywords: ["launch", "launching", "release", "opening", "available from", "when you launch"],
    answer: "We are launching on 1st October in listed cities ! 🎉. The list of cities where products are available is publish on 1 OCTOBER 2025."
  }, 
  {
    keyword: ["owner","founder"],
    answer: "Aman Singh founded and design the Clear Vibe to provide taste with 0 compromise with helth."
  }
];

// Regex-based pattern matching for NLP-like responses
const patterns = [
  {
    regex: /\b(when|what)\s+(time|is)\s+(launch|available|open)\b/i,
    answer: "We are launching at 10:00 AM on 1st October! 🎉"
  },
  {
    regex: /\b(when|what)\s+is\s+(the|your)\s+(launch|product)\s+date\b/i,
    answer: "The launch date is 1st October!"
  },
  {
    regex: /\b(when|how)\s+will\s+you\s+(launch|release|be\s+available)\b/i,
    answer: "We are launching and available from 1st October!"
  }
];

// Add fuzzy logic to understand more questions
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    const userQuestion = input.value.trim();
    addMessage(userQuestion, 'user');
    input.value = '';

    addMessage("Bot is typing...", 'bot', true);

    const questionLower = userQuestion.toLowerCase();
    let answer = "Sorry, I didn't understand that. Can you try asking differently?";

    // Check for keyword matches in FAQ
    for (const item of faq) {
      if (item.keywords.some(keyword => questionLower.includes(keyword))) {
        answer = item.answer;
        break;
      }
    }

    // Check for pattern matches (NLP-style)
    for (const pattern of patterns) {
      if (pattern.regex.test(userQuestion)) {
        answer = pattern.answer;
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


