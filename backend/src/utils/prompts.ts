export const generateContinuePrompt = (scenario: string, option: string) => {
    return `Given the current scenario "${scenario}" and the user's choice "${option}", generate a short continuation of the story. Ensure the scenario ends with an open-ended question, but do not suggest any specific paths or actions. The question should naturally lead the reader to think about what might happen next. Keep the scenario concise and avoid concluding the story.`
}

export const generateOptionPrompt = (scenario: string) => {
    return `Given the scenario: "${scenario}", generate three distinct actions for the next step, formatted as follows:

1. A dangerous and risky option.
2. A moderately risky option.
3. The safest option.

Each option should be a single, concise sentence of no more than 5 words. The output should be a plain array with exactly three separate string elements. Each string should contain only one option, with no extra formatting, brackets, or quotes.`
}



