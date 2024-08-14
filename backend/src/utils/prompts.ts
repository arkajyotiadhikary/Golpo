export const generateContinuePrompt = (scenario: string, option: string) => {
    return `Given the current scenario "${scenario}" and the user's choice "${option}", generate a short continuation of the story. Ensure the scenario ends with an open-ended question, but do not suggest any specific paths or actions. The question should naturally lead the reader to think about what might happen next. Keep the scenario concise and avoid concluding the story.`
}


export const generateOptionPrompt = (scenario: string) => {
    return `Given the scenario: "${scenario}", generate exactly three possible actions for the next step. Each option should be:

1. Dangerous and risky.
2. Moderately risky.
3. The safest approach.

Each option should be a concise, single line of no more than 5 words. The output should be a plain array containing exactly three strings, without any additional formatting, quotes, or nested arrays.`
}




