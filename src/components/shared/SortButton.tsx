import { Typography } from '~/components/shared';

export const SortButton = ({ text }: { text: string }) => {
  return (
    <div>
      <Typography color='primary' weight='semibold'>
        {text}
      </Typography>
    </div>
  );
};
