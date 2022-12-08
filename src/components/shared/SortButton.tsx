import { Icon, Typography, FONT_SIZE_12 } from '~/components/shared';

export type SortType = 'name' | 'apy' | 'locked' | 'claimable' | 'fee' | 'seeded';

export const SortButton = ({ text, type }: { text: string; type: SortType }) => {
  // TODO: Make sort button work and it again
  // <Icon name='chevron-down' size={FONT_SIZE_12()} /* rotate={orderAsc ? 180 : 0} color={themeTextSecondary} */ />
  return (
    <div /*  onClick={() => handleClickSort()} */>
      <Typography color='primary'>{text}</Typography>
    </div>
  );
};
