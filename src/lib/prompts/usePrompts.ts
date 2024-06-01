import * as yup from "yup";
import { useStorage } from "../useStorage";
import { useCallback } from "react";
import { ulid } from "ulidx";

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
  const { data, setData, ...rest } = useStorage({
    key: "prompts",
    validator: PromptsSchema.validate,
  });

  const addPrompt = useCallback(
    (prompt: Omit<Prompt, "id">) => {
      setData([...(data ?? []), { id: ulid(), ...prompt }]);
    },
    [data, setData],
  );

  const removePrompt = useCallback(
    (promptToRemove: Pick<Prompt, "id">) => {
      setData((data ?? []).filter(({ id }) => id !== promptToRemove.id));
    },
    [data, setData],
  );

  return {
    addPrompt,
    removePrompt,
    data,
    ...rest,
  };
}
