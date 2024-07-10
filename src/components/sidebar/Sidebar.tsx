import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Anchor } from '@mui/icons-material';

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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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