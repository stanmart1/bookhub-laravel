import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Search, LibraryBooks, ShoppingCart, Person } from '@mui/icons-material';
import { Link } from '@inertiajs/react';

const MobileMenu = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        component={Link}
        href="/"
      />
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        href="/books/search"
      />
      <BottomNavigationAction
        label="Library"
        icon={<LibraryBooks />}
        component={Link}
        href="/account/library"
      />
      <BottomNavigationAction
        label="Cart"
        icon={<ShoppingCart />}
        component={Link}
        href="/cart"
      />
      <BottomNavigationAction
        label="Profile"
        icon={<Person />}
        component={Link}
        href="/account/dashboard"
      />
    </BottomNavigation>
  );
};

export default MobileMenu;
