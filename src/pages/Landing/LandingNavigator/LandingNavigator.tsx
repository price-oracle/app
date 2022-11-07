import Navigator from '~/components/app/Navigator';
import { useNavigatorProps } from '~/components/app/Navigator/Navigator';
import { Item } from '~/components/app/Navigator/Navigator.styles';
import { Icon, ThemeButton } from '~/components/shared';

const LandingNavigator = () => {
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
