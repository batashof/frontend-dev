import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SidebarItemProps } from '../types';

const StyledListItem = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'isActive'
})<{ isActive: boolean; icon: boolean }>(({ isActive, theme, icon }) => ({
  justifyContent: 'flex-start',
  cursor: 'pointer',
  borderRadius: '10px',
  transition: 'background-color 0.3s ease',
  paddingLeft: theme.spacing(2),
  whiteSpace: 'nowrap',
  backgroundColor: isActive && icon ? '#FFD858' : 'transparent',
  '&:hover': {
    backgroundColor: isActive && icon ? '#FFD858' : 'rgba(0, 0, 0, 0.04)'
  }
}));

const StyledCircle = styled('div', {
  shouldForwardProp: prop => prop !== 'isActive'
})<{ isActive: boolean }>(({ isActive }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: isActive ? '#E7BF3A' : '#696969',
  flex: 'none',
  order: 0,
  flexGrow: 0,
  marginRight: '10px'
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 'auto',
  marginRight: 16
});

const StyledListItemText = styled(ListItemText)({
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, path, subItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.includes(path);
  const [isSubListOpen, setIsSubListOpen] = useState(false);

  const handleClick = () => {
    if (subItems && subItems.length > 0) {
      setIsSubListOpen(!isSubListOpen);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <StyledListItem
        onClick={handleClick}
        isActive={isActive}
        icon={!!icon}
      >
        {icon ? (
          <StyledListItemIcon>{icon}</StyledListItemIcon>
        ) : (
          <StyledCircle isActive={isActive} />
        )}
        <StyledListItemText primary={text} />
        {subItems && subItems.length > 0 && (
          <div
            style={{ marginBottom: '-8px' }}
            onClick={e => e.stopPropagation()}
          >
            {isSubListOpen ? (
              <ExpandLess onClick={() => setIsSubListOpen(false)} />
            ) : (
              <ExpandMore onClick={() => setIsSubListOpen(true)} />
            )}
          </div>
        )}
      </StyledListItem>
      {subItems && subItems.length > 0 && (
        <Collapse
          in={isSubListOpen}
          timeout='auto'
          unmountOnExit
        >
          {subItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              path={item.path}
              subItems={item.subItems}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
