import { Label, Tag, TagGroup, TagList } from "@/components/ui";
import { SubscriptionStatus } from "../__generated__/graphql";

type SubscriptionStatusSelectorProps = {
  selectedStatus?: SubscriptionStatus | null;
  onSelectionChange?: (selectedStatus: SubscriptionStatus | null) => void;
};

export const SubscriptionStatusSelector: React.FC<
  SubscriptionStatusSelectorProps
> = ({ selectedStatus, onSelectionChange }) => {
  return (
    <TagGroup
      className="space-y-1"
      selectionMode="single"
      selectedKeys={new Set(selectedStatus ? [selectedStatus] : [])}
      onSelectionChange={(s) => {
        onSelectionChange?.(
          (Array.from(s)[0] ?? null) as SubscriptionStatus | null
        );
      }}
    >
      <Label className="hidden">Status</Label>
      <TagList>
        {Object.keys(SubscriptionStatus).map((status) => (
          <Tag key={status} id={status}>
            {status}
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  );
};
