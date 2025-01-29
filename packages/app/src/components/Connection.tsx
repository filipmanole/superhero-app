import { Input, Label, TextField } from "@/components/ui";
import { Form } from "react-aria-components";
import { useLocalStorage } from "@uidotdev/usehooks";

export const Connection: React.FC = () => {
  const [apiKey, setApiKey] = useLocalStorage<string | null>("apiKey", null);

  return (
    <div className="flex justify-center">
      <Form className="flex flex-col gap-2 max-w-[350px] justify-center">
        <TextField
          defaultValue={apiKey ?? undefined}
          name="token"
          type="token"
          isRequired
          onChange={(e) => setApiKey(e)}
        >
          <div className="flex justify-center items-center">
            <Label className="w-24">API KEY:</Label>
            <Input />
          </div>
        </TextField>
      </Form>
    </div>
  );
};
