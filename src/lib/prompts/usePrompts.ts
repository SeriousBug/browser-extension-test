import * as yup from "yup";
import { useStorage } from "../useStorage";

type Prompt = {
  id: string;
  name: string;
  prompt: string;
};
const PromptSchema: yup.ObjectSchema<Prompt> = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  prompt: yup.string().required(),
});
const PromptsSchema = yup.array().of(PromptSchema);

export function usePrompts() {
  return useStorage({
    key: "prompts",
    validator: PromptsSchema.validate,
  });
}
