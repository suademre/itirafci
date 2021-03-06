import React, { useState } from "react";
import { Menu, Icon, Input, Image, Header, Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice";
import AddConfessionForm from "../../../features/confession/AddConfessionForm";

const HeaderPanel = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const trigger = (
    <span>
      <Image avatar src={currentUser.photoURL} />
    </span>
  );

  return (
    <React.Fragment>
      <Menu fluid secondary pointing fixed="top">
        <Menu.Item as="a" header color="pink">
          İtirafçı
        </Menu.Item>

        <Menu.Item name="search" position="right">
          <Input
            icon="search"
            placeholder="İtirafları ara.."
            size="large"
            style={{ width: 600 }}
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="make_confession" onClick={handleOpen}>
            <Icon name="pencil" size="big" /> İtiraf et
          </Menu.Item>

          <Menu.Item name="user">
            <Dropdown trigger={trigger} pointing="top right" icon={null}>
              <Dropdown.Menu>
                <Dropdown.Item key="user" icon="user" text="Profil" />
                <Dropdown.Item key="settings" icon="settings" text="Ayarlar" />
                <Dropdown.Item
                  key="signout"
                  icon="sign out"
                  text="Çıkış Yap"
                  onClick={() => handleSignOut()}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <AddConfessionForm open={open} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default HeaderPanel;
