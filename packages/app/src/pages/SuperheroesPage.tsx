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
  const { data, error, loading, listSuperheroes } = useListSuperheroes();
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [apiKey] = useLocalStorage<string | null>("apiKey");
  const [superheroes, setSuperheroes] = useState<SuperheroDto[] | null>(null);
  const showTable = !!superheroes?.length;

  useEffect(() => {
    if (!data?.nodes) return;
    setSuperheroes(data.nodes);
  }, [data]);

  useEffect(() => {
    listSuperheroes(10);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-center">Available Superheroes</CardTitle>
        </CardHeader>

        <Separator className="mb-2" />

        <div className="flex flex-col justify-center p-4">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <WarningMessage message={error?.message} />
          ) : !apiKey ? (
            <WarningMessage message="Insert SECRET KEY to fetch superheroes..." />
          ) : showTable ? (
            <Table
              aria-label="Files"
              // selectedKeys={new Set(organizationId ? [organizationId] : [])}
              // selectionMode="single"
              // onSelectionChange={(keys) => {
              //   setOrganizationId(Array.from(keys)[0]?.toString() ?? null);
              // }}
            >
              <TableHeader>
                <Column width={40} minWidth={40}>
                  <Checkbox slot="selection" />
                </Column>
                <Column isRowHeader>Name</Column>
                <Column>Superpower</Column>
                <Column>Humility Score</Column>
                <Column className="hidden md:flex">Created On</Column>
              </TableHeader>
              <TableBody>
                {superheroes.map((sh) => (
                  <Row key={sh.superheroId} id={sh.superheroId}>
                    <Cell>
                      <Checkbox slot="selection" />
                    </Cell>
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
          <CardFooter className="flex justify-center">
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                size="icon"
                onPress={() => {
                  if (lastKeys.length > 1) {
                    setLastKeys((prev) => {
                      const updatedKeys = prev.slice(0, -1);
                      listSuperheroes(10, updatedKeys[updatedKeys.length - 1]);
                      return updatedKeys;
                    });
                  } else if (lastKeys.length === 1) {
                    setLastKeys([]);
                    listSuperheroes(10);
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

                  setLastKeys((prev) => [...prev, lastKey]);
                  listSuperheroes(10, lastKey);
                }}
              >
                <ChevronRight />
              </Button>
            </div>
          </CardFooter>
        )}
        <CreateSuperheroModal />
      </Card>
    </div>
  );
};
