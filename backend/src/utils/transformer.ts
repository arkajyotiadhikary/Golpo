import { pipeline, TextGenerationPipeline, QuestionAnsweringPipeline } from "@xenova/transformers";

const generatePipeline = async (): Promise<TextGenerationPipeline> => {
      return pipeline("text-generation", "Xenova/llama2.c-stories15M");
};

const QAPipeline = async (): Promise<QuestionAnsweringPipeline> => {
      return pipeline("question-answering", "distilbert-base-cased-distilled-squad");
};

export const answerQuestion = async (question: string, context: string): Promise<string> => {
      console.log("Answering question...", question);
      const qaPipeline = await QAPipeline();
      try {
            const output = await qaPipeline(question, context);
            console.log("Raw output:", output);
            const answer = output.answer;
            console.log("Answer generated:", answer);
            return answer;
      } catch (error) {
            console.error("Error answering question.", error);
            throw error;
      }
};

interface Scenario {
      description: string;
      options: string[];
}

export const generateOptions = async (
      currentScenario: string,
      numOptions: number = 3
): Promise<Scenario> => {
      console.log("Generating options...", currentScenario);
      const generator = await generatePipeline();
      try {
            const prompt = `${currentScenario}\n\nPlease provide ${numOptions} distinct options for the user to choose from and separete them with $$`;
            const output = await generator(prompt, {
                  max_length: 150, // Adjusted length for options generation
                  temperature: 0.9,
                  top_p: 0.95, // Use nucleus sampling
                  num_return_sequences: 2, // Number of options to generate
                  do_sample: true, // Enable sampling
            });
            console.log("Raw output:", output);
            const options = output[0].generated_text.trim().replace(prompt, "");
            console.log("Options generated:", options);

            const scenario: Scenario = {
                  description: currentScenario,
                  options: options,
            };

            return scenario;
      } catch (error) {
            console.error("Error generating options.", error);
            throw error;
      }
};

export const generateNextScenario = async (
      currentScenario: string,
      chosenOption: string
): Promise<Scenario> => {
      console.log("Generating next scenario...", currentScenario, chosenOption);
      const generator = await generatePipeline();
      try {
            const prompt = `${currentScenario}\n\nThe user chose the following option: "${chosenOption}". Please generate the next scenario based on this choice.`;
            const output = await generator(prompt, {
                  max_length: 250, // Adjusted length for the next scenario
                  temperature: 0.9,
                  no_repeat_ngram_size: 2,
                  num_return_sequences: 1,
                  do_sample: true, // Enable sampling
            });
            console.log("Raw output:", output);
            const nextScenarioDescription = output[0].generated_text.trim().replace(prompt, "");
            console.log("Next scenario description generated:", nextScenarioDescription);

            // Generate options for the new scenario
            const nextScenario = await generateOptions(nextScenarioDescription);

            return nextScenario;
      } catch (error) {
            console.error("Error generating next scenario.", error);
            throw error;
      }
};
