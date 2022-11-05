import Navigator from '~/components/app/Navigator';
import { THEME, THEME_TEXT_PRIMARY, Icon, ThemeButton } from '~/components/shared';
import { useNavigatorProps } from '~/components/app/Navigator/Navigator';
import { Item } from '~/components/app/Navigator/Navigator.styles';

const LandingNavigator = () => {
  const theme = THEME;
  const navProps = useNavigatorProps(false);

  return (
    <Navigator differenceMixBlend {...navProps}>
      {/* TODO: create profiles on social medias */}
      {/* <ListItem>
              <LinkWithoutDecoration to="#telegram">
                <Icon name="send" color="#fff" />
              </LinkWithoutDecoration>
            </ListItem>
            <ListItem>
              <LinkWithoutDecoration to="#github">
                <Icon name="github" color="#fff" />
              </LinkWithoutDecoration>
            </ListItem>*/}
      <Item>
        <a href='https://twitter.com/price_oracle'>
          <Icon name='twitter' color='#fff' />
        </a>
      </Item>
      <Item>
        <ThemeButton color='#fff' />
      </Item>
    </Navigator>
  );
};

export default LandingNavigator;
