import Option from '../components/Option';
import Form, {type QuoteFormProps} from '../components/Form';
import {Box, Typography} from '@mui/material';
import {useState} from 'react';

export default function Quotes() {
  const [quoteOptions, setQuoteOptions] = useState([
    {
      id: 1,
      downPayment: 3000,
      monthlyRate: 520,
      term: 60,
      interestRate: 5.8,
    },
    {
      id: 2,
      downPayment: 10000,
      monthlyRate: 380,
      term: 60,
      interestRate: 5.4,
    },
    {
      id: 3,
      downPayment: 8000,
      monthlyRate: 603,
      term: 40,
      interestRate: 5.5,
    },
  ]);

  const addQuoteOption: QuoteFormProps['addQuoteOption'] = (values) => {
    const newOption = {
      id: quoteOptions.length + 1,
      downPayment: values.downPayment,
      monthlyRate: values.monthlyRate,
      term: values.term,
      interestRate: values.interestRate,
    };
    setQuoteOptions([...quoteOptions, newOption]);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Car Quote Options
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        'justify-content': 'center'
      }} p={3}>
        {
          quoteOptions.map((quote) => (
            <Option key={quote.id} option={quote}/>
          ))
        }
      </Box>

      <Form addQuoteOption={addQuoteOption}/>
    </>
  );
}