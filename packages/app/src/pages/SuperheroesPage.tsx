import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Cell,
  Checkbox,
  Column,
  Row,
  Separator,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { WarningMessage } from "@/components/WarningMessage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CreateSuperheroModal } from "@/components";
import { SuperheroDto } from "@/hooks/type";
import { useListSuperheroes } from "@/hooks";
import { format } from "date-fns";

export const SuperheroesPage: React.FC = () => {
  const PAGE_ITEMS = 10;
  const { data, error, loading, listSuperheroes } = useListSuperheroes();
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [apiKey] = useLocalStorage<string | null>("apiKey");
  const [superheroes, setSuperheroes] = useState<SuperheroDto[] | null>(null);
  const showTable = !!superheroes?.length;

  useEffect(() => {
    if (!data?.nodes.length) return;
    setSuperheroes(data.nodes);
  }, [data]);

  useEffect(() => {
    listSuperheroes(PAGE_ITEMS);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <div className="flex justify-between items-center p-6 w-[450px]">
          <CardTitle className="text-center">Available Superheroes</CardTitle>
          <CreateSuperheroModal />
        </div>

        <Separator className="mb-2" />

        <div className="flex flex-col justify-center p-4">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <WarningMessage message={error?.message} />
          ) : !apiKey ? (
            <WarningMessage message="Insert SECRET KEY to fetch superheroes..." />
          ) : showTable ? (
            <Table aria-label="Files">
              <TableHeader>
                <Column isRowHeader>Name</Column>
                <Column>Superpower</Column>
                <Column>Humility Score</Column>
                <Column className="hidden md:flex">Created On</Column>
              </TableHeader>
              <TableBody>
                {superheroes.map((sh) => (
                  <Row key={sh.superheroId} id={sh.superheroId}>
                    <Cell>{sh.name}</Cell>
                    <Cell>{sh.superpower}</Cell>
                    <Cell>{sh.humilityScore}</Cell>
                    <Cell className="hidden md:flex">
                      {format(new Date(sh.createdAt), "MM/dd/yyyy")}
                    </Cell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="p-4 flex justify-center">Nothing to display</p>
          )}
        </div>

        {showTable && (
          <>
            <Separator className="mb-4" />
            <CardFooter className="flex justify-center">
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onPress={() => {
                    if (lastKeys.length > 1) {
                      setLastKeys((prev) => {
                        const updatedKeys = prev.slice(0, -1);
                        listSuperheroes(
                          PAGE_ITEMS,
                          updatedKeys[updatedKeys.length - 1]
                        );
                        return updatedKeys;
                      });
                    } else if (lastKeys.length === 1) {
                      setLastKeys([]);
                      listSuperheroes(PAGE_ITEMS);
                    }
                  }}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onPress={() => {
                    const lastKey = data?.lastKey;
                    if (!lastKey) return;

                    console.log(lastKey);
                    setLastKeys((prev) => [...prev, lastKey]);
                    listSuperheroes(PAGE_ITEMS, lastKey);
                  }}
                >
                  <ChevronRight />
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};
