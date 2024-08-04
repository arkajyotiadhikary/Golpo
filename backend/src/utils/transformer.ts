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

export const generateOptions = async (
      prompt: string,
      numOptions: number = 3
): Promise<string[]> => {
      console.log("Generating options...", prompt);
      const generator = await generatePipeline();
      try {
            const output = await generator(prompt, {
                  max_length: 100, // Shorter length for options
                  temperature: 0.9,
                  top_p: 0.95, // Use nucleus sampling
                  num_return_sequences: numOptions, // Number of options to generate
                  do_sample: true, // Enable sampling
            });
            console.log("Raw output:", output);
            const options = output.map((item: any) => item.generated_text.trim());
            console.log("Options generated:", options);
            return options;
      } catch (error) {
            console.error("Error generating options.", error);
            throw error;
      }
};

export const generateNextScenario = async (prompt: string): Promise<string> => {
      console.log("Generating next scenario...", prompt);
      const generator = await generatePipeline();
      try {
            const output = await generator(prompt, {
                  max_length: 200, // Longer length for the next scenario
                  temperature: 0.9,
                  no_repeat_ngram_size: 2,
                  num_return_sequences: 1,
                  do_sample: true, // Enable sampling
            });
            console.log("Raw output:", output);
            const nextScenario = output[0].generated_text.trim();
            console.log("Next scenario generated:", nextScenario);
            return nextScenario;
      } catch (error) {
            console.error("Error generating next scenario.", error);
            throw error;
      }
};
