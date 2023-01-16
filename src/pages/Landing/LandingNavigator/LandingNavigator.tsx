import Navigator from '~/components/app/Navigator';
import { useNavigatorProps } from '~/components/app/Navigator/Navigator';
import { ExternalLink, Icon, ThemeButton } from '~/components/shared';
import { Item } from './LandingNavigator.styles';

const LandingNavigator = () => {
  const navProps = useNavigatorProps(false);

  return (
    <Navigator differenceMixBlend {...navProps}>
      <Item>
        <ExternalLink href='https://twitter.com/price_oracle'>
          <Icon name='twitter' color='#fff' />
        </ExternalLink>
      </Item>
      <Item>
        <ExternalLink href='https://discord.gg/6RgRATKMHM'>
          <Icon name='discord' color='#fff' size='2.2rem' />
        </ExternalLink>
      </Item>
      <Item>
        <ExternalLink href='https://github.com/price-oracle'>
          <Icon name='github' color='#fff' size='1.8rem' />
        </ExternalLink>
      </Item>
      <Item>
        <ThemeButton color='#fff' />
      </Item>
    </Navigator>
  );
};

export default LandingNavigator;
