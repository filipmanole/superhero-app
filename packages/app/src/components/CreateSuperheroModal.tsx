import { LoadingSpinner } from "./LoadingSpinner";
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  SliderOutput,
  SliderTrack,
  TextField,
} from "./ui";
import { ErrorMessage } from "./ErrorMessage";
import { useState } from "react";
import { useCreateSuperhero } from "@/hooks";
import { Slider, SliderFillTrack, SliderThumb } from "./ui/slider";

type CreateSuperheroModalProps = {};
export const CreateSuperheroModal: React.FC<CreateSuperheroModalProps> = () => {
  const [name, setName] = useState<string | null>(null);
  const [superpower, setSuperpower] = useState<string | null>(null);
  const [humilityScore, setHumilityScore] = useState<number | null>(null);

  const { error, loading, createSuperhero } = useCreateSuperhero();

  const createSuperheroHandler = async (close: () => void) => {
    if (!name || !superpower || !humilityScore) return;
    await createSuperhero({ name, superpower, humilityScore });

    if (!error) close();
  };

  return (
    <DialogTrigger>
      <Button>
        <div className="font-medium">Create Superhero</div>
      </Button>
      <DialogOverlay>
        <DialogContent className="sm:max-w-[450px] rounded-lg">
          {({ close }) => (
            <>
              <DialogHeader>
                <DialogTitle>Create Superhero</DialogTitle>
              </DialogHeader>

              <TextField
                name="name"
                type="name"
                isRequired
                onChange={(e) => setName(e)}
              >
                <div>
                  <Label className="w-24">Name:</Label>
                  <Input />
                </div>
              </TextField>

              <TextField
                name="superpower"
                type="superpower"
                isRequired
                onChange={(e) => setSuperpower(e)}
              >
                <div>
                  <Label className="w-24">Superpower:</Label>
                  <Input />
                </div>
              </TextField>

              <Slider
                defaultValue={5}
                maxValue={10}
                className="flex w-full flex-col items-start gap-2"
                onChange={(e) => {
                  setHumilityScore(Number(e));
                }}
              >
                <div className="flex w-full justify-between">
                  <Label>Humility Score</Label>
                  <SliderOutput />
                </div>
                <SliderTrack className="h-2 w-full">
                  <SliderFillTrack />
                  <SliderThumb />
                </SliderTrack>
              </Slider>

              {error && <ErrorMessage message={error.message} />}

              <Button
                isDisabled={!name || !superpower || !humilityScore}
                onPress={() => {
                  createSuperheroHandler(close);
                }}
              >
                {loading && <LoadingSpinner />}
                Create Superhero
              </Button>
            </>
          )}
        </DialogContent>
      </DialogOverlay>
    </DialogTrigger>
  );
};
