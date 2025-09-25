const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Predefined knowledge base
const knowledgeBase = {
  "what is ai": "AI (Artificial Intelligence) is the simulation of human intelligence by machines.",
  "what is html": "HTML stands for HyperText Markup Language. It is used to create webpages.",
  "what is css": "CSS stands for Cascading Style Sheets. It is used for styling webpages.",
  "what is javascript": "JavaScript is a programming language that makes websites interactive.",
  "who are you": "I am your smart chatbot, created using HTML, CSS, and JavaScript.",
  "how are you": "I am doing great! Thanks for asking.",
  "bye": "Goodbye! Have a nice day!"
};

// Get date and time dynamically
function getDateTimeResponse(input) {
  let now = new Date();

  if (input.includes("time")) {
    return "The current time is " + now.toLocaleTimeString();
  }

  if (input.includes("date")) {
    return "Today's date is " + now.toLocaleDateString();
  }

  return null;
}

// Bot response logic
function getBotResponse(input) {
  input = input.toLowerCase();

  // Check for date/time first
  let dateTimeResponse = getDateTimeResponse(input);
  if (dateTimeResponse) return dateTimeResponse;

  // Then check knowledge base
  for (let key in knowledgeBase) {
    if (input.includes(key)) {
      return knowledgeBase[key];
    }
  }

  return "Hmm... I don’t know that yet, but I’m still learning!";
}

// Voice output
function speakText(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

// Send message
function sendMessage() {
  let message = userInput.value.trim();
  if (message === "") return;

  // User message
  let userMsgDiv = document.createElement("div");
  userMsgDiv.className = "message user-message";
  userMsgDiv.textContent = message;
  chatBox.appendChild(userMsgDiv);

  // Bot response
  let botResponse = getBotResponse(message);
  let botMsgDiv = document.createElement("div");
  botMsgDiv.className = "message bot-message";
  botMsgDiv.textContent = botResponse;
  chatBox.appendChild(botMsgDiv);

  // Voice output
  speakText(botResponse);

  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key support
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});