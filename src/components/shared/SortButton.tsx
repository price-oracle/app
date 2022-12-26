import { Typography } from '~/components/shared';

export const SortButton = ({ text }: { text: string }) => {
  // TODO: Make sort button work and it again
  // <Icon name='chevron-down' size={FONT_SIZE_12()} /* rotate={orderAsc ? 180 : 0} color={themeTextSecondary} */ />
  return (
    <div /*  onClick={() => handleClickSort()} */>
      <Typography color='primary' weight='semibold'>
        {text}
      </Typography>
    </div>
  );
};
