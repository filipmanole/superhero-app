import { Label, Tag, TagGroup, TagList } from "@/components/ui";
import { SubscriptionPlan } from "../__generated__/graphql";

type SubscriptionPlanSelectorProps = {
  selectedPlan?: SubscriptionPlan | null;
  onSelectionChange?: (selectedPlan: SubscriptionPlan | null) => void;
};

export const SubscriptionPlanSelector: React.FC<
  SubscriptionPlanSelectorProps
> = ({ selectedPlan, onSelectionChange }) => {
  return (
    <TagGroup
      className="space-y-1"
      selectionMode="single"
      selectedKeys={new Set(selectedPlan ? [selectedPlan] : [])}
      onSelectionChange={(s) => {
        onSelectionChange?.(
          (Array.from(s)[0] ?? null) as SubscriptionPlan | null
        );
      }}
    >
      <Label className="hidden">Plan</Label>
      <TagList>
        {Object.keys(SubscriptionPlan).map((plan) => (
          <Tag key={plan} id={plan}>
            {plan}
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  );
};
