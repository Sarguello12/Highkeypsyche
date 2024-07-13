import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Anchor } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type SidebarProps = {
  sidebarState: [boolean, Dispatch<SetStateAction<boolean>>]
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Sidebar = (props: SidebarProps) => {
  const [toggleDrawer, setToggleDrawer] = props.sidebarState
  const [currAnchor, setCurrAnchor] = useState<Anchor>('left')

  const anchor: Anchor = useMemo(() => {
    if (toggleDrawer !== true) return currAnchor
    const directions: Anchor[] = ['left', 'right', 'top', 'bottom'];
    const randomIndex = Math.floor(Math.random() * directions.length);
    const anchor = directions[randomIndex];
    setCurrAnchor(anchor)
    return anchor
  }, [toggleDrawer]);

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => setToggleDrawer(!toggleDrawer)}
      onKeyDown={() => setToggleDrawer(!toggleDrawer)}
    >
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/calendar">
            <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Drawer
      anchor={anchor}
      open={toggleDrawer}
      onClose={() => setToggleDrawer(!toggleDrawer)}
    >
      {list(anchor)}
    </Drawer>
  )
}

export default Sidebar