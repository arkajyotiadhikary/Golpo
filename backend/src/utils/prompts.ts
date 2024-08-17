export const generateContinuePrompt = (scenario: string, option: string, outcome: string) => {
  return `Given the current scenario "${scenario}" with the user's choice "${option}" and the outcome "${outcome}", generate a continuation of the story that reflects the nature of the outcome. If the outcome is a reward (high, mid, or low), focus on the positive or beneficial consequences of the user's choice. If the outcome is a punishment (high, mid, or low), highlight the negative or challenging consequences. Ensure the scenario ends with an open-ended question that naturally leads the reader to consider what might happen next, based on the outcome. The scenario should be concise, no longer than three sentences, and avoid concluding the story.`
}

export const generateOptionPrompt = (scenario: string) => {
  return `Given the scenario: "${scenario}", generate three distinct actions for the next step, formatted as follows:

1. A dangerous and risky option.
2. A moderately risky option.
3. The safest option.

Each option should be a single, concise sentence of no more than 5 words. The output should be a plain array with exactly three separate string elements. Each string should contain only one option, with no extra formatting, brackets, or quotes.`
}



