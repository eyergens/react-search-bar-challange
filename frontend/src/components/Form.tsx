import {Box, OutlinedInput, Button, Paper, Typography, InputAdornment, InputLabel, FormControl} from '@mui/material'
import React, {useState} from 'react'
import AddIcon from "@mui/icons-material/Add"

export interface QuoteFormProps {
  addQuoteOption?: (values: {
    downPayment: number;
    monthlyRate: number;
    term: number;
    interestRate: number;
  }) => void;
}

export default function Form({addQuoteOption}: QuoteFormProps) {
  const [newQuote, setNewQuotes] = useState({
    downPayment: 0,
    monthlyRate: 0,
    term: 0,
    interestRate: 0
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewQuotes((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addQuoteOption?.(newQuote);
    setNewQuotes({
      downPayment: 0,
      monthlyRate: 0,
      term: 0,
      interestRate: 0.0
    })
  };

  return (
    <>
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <Paper
          sx={{padding: '16px', marginBottom: '16px'}}
          elevation={3}
        >
          <Typography variant="h6">New Quote Option</Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <FormControl sx={{m: 1, width: '25ch', alignSelf: 'center'}} variant="outlined">
              <InputLabel htmlFor='downPayment'>Down Payment</InputLabel>
              <OutlinedInput
                required
                label="Down Payment"
                type="number"
                name="downPayment"
                value={newQuote.downPayment}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                inputProps={{
                  min: 0
                }}
              />
            </FormControl>
            <FormControl sx={{m: 1, width: '25ch', alignSelf: 'center'}} variant="outlined">
              <InputLabel htmlFor='monthlyRate'>Monthly Rate</InputLabel>
              <OutlinedInput
                required
                label="Monthly Rate"
                type="number"
                name="monthlyRate"
                value={newQuote.monthlyRate}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                inputProps={{
                  min: 0
                }}
              />
            </FormControl>
            <FormControl sx={{m: 1, width: '25ch', alignSelf: 'center'}} variant="outlined">
              <InputLabel htmlFor='term'>Term (months)</InputLabel>
              <OutlinedInput
                required
                label="Term (months)"
                type="number"
                name="term"
                value={newQuote.term}
                onChange={handleChange}
                inputProps={{
                  min: 0
                }}
              />
            </FormControl>
            <FormControl sx={{m: 1, width: '25ch', alignSelf: 'center'}} variant="outlined">
              <InputLabel htmlFor='interestRate'>Interest Rate</InputLabel>
              <OutlinedInput
                required
                label="Interest Rate"
                type="number"
                name="interestRate"
                value={newQuote.interestRate}
                onChange={handleChange}
                endAdornment={<InputAdornment position="start">%</InputAdornment>}
                inputProps={{
                  step: "0.01",
                  min: 0
                }}
              />
            </FormControl>
          </Box>
          <Button
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              marginTop: '0.5rem'
            }}
            type="submit"
            variant="outlined"
            startIcon={<AddIcon/>}
            onClick={handleSubmit}
          >
            Add Quote
          </Button>
        </Paper>
      </Box>
    </>
  );
}