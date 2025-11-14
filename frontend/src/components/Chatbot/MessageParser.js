class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
    // The command map defines all possible chatbot commands
    this.commandMap = [
      {
        keywords: ["hello", "hi", "hey"],
        action: "greet",
      },
      {
        keywords: ["help", "support", "assist"],
        action: "help",
      },
      {
        keywords: ["blood", "blood type", "blood group"],
        action: "bloodInfo",
      },
      {
        keywords: ["donor", "donors", "donate"],
        action: "donorInfo",
      },
      {
        keywords: ["patient", "patients", "recipient"],
        action: "patientInfo",
      },
      {
        keywords: ["request", "requests", "need"],
        action: "requestInfo",
      },
      {
        keywords: ["match", "ai", "predictor"],
        action: "matchingInfo",
      },
    ];
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Loop through our command map to find a match
    for (const command of this.commandMap) {
      // Check if any of the keywords for a command are in the user's message
      const keywordMatch = command.keywords.some(keyword => lowerCaseMessage.includes(keyword));

      if (keywordMatch) {
        // If a match is found, dynamically call the correct action and stop the loop
        this.actionProvider[command.action]();
        return;
      }
    }

    // If no command was matched after checking all possibilities
    this.actionProvider.unknown();
  }
}

export default MessageParser;