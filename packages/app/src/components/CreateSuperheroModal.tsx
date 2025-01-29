import { gql } from "@/__generated__/gql";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

type CreateSuperheroModalProps = {
  // isOpen: boolean;
  // setIsOpen?: (b: boolean) => void;
};

export const CreateSuperheroModal: React.FC<CreateSuperheroModalProps> = () => {
  const [name, setName] = useState<string | null>(null);
  const [superpower, setSuperpower] = useState<string | null>(null);
  const [humilityScore, setHumilityScore] = useState<number | null>(null);

  const { data, error, loading, createSuperhero } = useCreateSuperhero();

  const updateSubscriptionHandler = async () => {
    if (!name || !superpower || !humilityScore) return;

    createSuperhero({ name, superpower, humilityScore });
  };

  return (
    <DialogTrigger>
      <Button>
        <div className="font-medium">Create Superhero</div>
      </Button>
      <DialogOverlay>
        <DialogContent className="sm:max-w-[450px] rounded-lg">
          {() =>
            error ? (
              <ErrorMessage message={error.message} />
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Create Superhero</DialogTitle>
                </DialogHeader>

                <DialogContent></DialogContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                      defaultValue={30}
                      className="flex w-3/5 flex-col items-start gap-2"
                    >
                      <div className="flex w-full justify-between">
                        <Label>Opacity</Label>
                        <SliderOutput />
                      </div>
                      <SliderTrack>
                        <SliderFillTrack />
                        <SliderThumb />
                      </SliderTrack>
                    </Slider>
                  </CardContent>
                </Card>

                <Button>Create Superhero</Button>
              </>
            )
          }
        </DialogContent>
      </DialogOverlay>
    </DialogTrigger>
  );
};
