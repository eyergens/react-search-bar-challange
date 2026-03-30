import List from '../components/List';
import Button from '../components/ButtonComponent.tsx';
import {Box, TextField, Stack} from '@mui/material';
import React, {useState} from 'react';

interface QuoteProps {
  quotes: string[];
  addQuote: (newQuote: string) => void;
}

export default function Quotes({quotes, addQuote}: QuoteProps) {
  const [quote, setQuote] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!quote) {
      return;
    }
    addQuote(quote);
    setQuote('');
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack sx={{ maxWidth: '50%' }} direction="row" spacing={2}>
          <TextField
            label="Quote"
            required
            value={quote}
            multiline
            fullWidth
            rows={2}
            onChange={(e) => setQuote(e.target.value)}
          />
          <Button text={'Add'}></Button>
        </Stack>
      </Box>
      {
        quotes.length === 0 ? <List list={["Add New Quotes!!"]}/> : <List list={quotes}/>
      }
    </>
  );
}