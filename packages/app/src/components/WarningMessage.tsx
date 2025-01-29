import { CircleSlash } from 'lucide-react';

type WarningMessageProps = {
  message?: string;
};

export const WarningMessage: React.FC<WarningMessageProps> = ({ message }) => (
  <div className="text-yellow-500 text-sm flex items-center">
    <CircleSlash className="mr-2 size-4 animate-spin" />
    {message}
  </div>
);
