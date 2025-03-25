import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SearchProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchContainer = styled('div')({
  position: 'relative',
  width: '379px',
  height: '40px'
});

const SearchInput = styled(InputBase)({
  width: '100%',
  height: '100%',
  paddingLeft: '24px',
  paddingRight: '50px',
  background: '#E5E5E5',
  borderRadius: '46px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '16px',
  letterSpacing: '0.4px',
  color: '#838990',
  '&::placeholder': {
    color: '#838990'
  }
});

const StyledSearchIcon = styled(SearchIcon)({
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '24px',
  height: '24px',
  color: '#1C1B1F'
});

const Search: React.FC<SearchProps> = ({ placeholder = 'Search by car number', onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <StyledSearchIcon />
    </SearchContainer>
  );
};

export default Search;
