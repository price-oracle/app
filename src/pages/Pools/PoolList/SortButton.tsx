import { Icon, Typography, FONT_SIZE_12 } from '~/components/shared';

export type SortType = 'name' | 'apy' | 'locked' | 'claimable' | 'fee';

const SortButton = ({ text, type }: { text: string; type: SortType }) => {
  return (
    <div /*  onClick={() => handleClickSort()} */>
      <Typography color='secondary'>{text}</Typography>
      <Icon name='chevron-down' size={FONT_SIZE_12()} /* rotate={orderAsc ? 180 : 0} color={themeTextSecondary} */ />
    </div>
  );
};

export default SortButton;
