class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hello! How can I assist you?");
    this.updateChatbotState(greetingMessage);
  }

  help() {
    const helpMessage = this.createChatBotMessage("Sure! You can ask me about donors, patients, requests, and AI matching.");
    this.updateChatbotState(helpMessage);
  }

  bloodInfo() {
    const message = this.createChatBotMessage(
      "You can ask about current blood needs, availability, and donation locations."
    );
    this.updateChatbotState(message);
  }

  donorInfo() {
    const message = this.createChatBotMessage(
      "I can help you find donors or register as a donor. What would you like to do?"
    );
    this.updateChatbotState(message);
  }

  patientInfo() {
    const message = this.createChatBotMessage(
      "You can request blood for patients or check patient status. How can I assist?"
    );
    this.updateChatbotState(message);
  }

  requestInfo() {
    const message = this.createChatBotMessage(
      "You can create new blood requests or check existing ones."
    );
    this.updateChatbotState(message);
  }

  aiMatchingInfo() {
    const message = this.createChatBotMessage(
      "I assist with AI-powered matching of donors and patients for optimal blood transfusion."
    );
    this.updateChatbotState(message);
  }

  unknown() {
    const message = this.createChatBotMessage(
      "I'm sorry, I didn't understand that. Please ask me about donors, patients, requests, or AI matching."
    );
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
