import {Box, TextField, Stack} from '@mui/material';
import React, {useState} from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchTerm && searchTerm.trimStart().length > 0) {
      setIsFormInvalid(true)
    } else {
      setIsFormInvalid(false);
    }
  }


  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack sx={{maxWidth: '50%'}} direction="row" spacing={2}>
          <TextField
            error={isFormInvalid}
            label="Search"
            required
            value={searchTerm}
            fullWidth
            helperText={isFormInvalid && 'Must enter at least one non-whitespace character'}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Stack>
      </Box>
    </>
  );
}