import Option from '../components/Option'
import Form from '../components/Form'
import {Box, Typography} from '@mui/material'
import {useState} from 'react'
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import type {QuoteFormProps, PaymentsSearchResult} from "../lib/types.ts";

const fetchMonthlyPaymentsResults = async (price: number, downPayment: number, loanTerm: number, interestRate: number): Promise<PaymentsSearchResult> => {
  return axios.get<PaymentsSearchResult>("/api/payments", {
    params: {price, downPayment, loanTerm, interestRate}
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    return error.response.data;
  });
};

export default function Quotes({price}: {
  price: number;
}) {
  const [quoteOptions, setQuoteOptions] = useState([
    {
      id: 1,
      downPayment: 3000,
      term: 60,
      interestRate: 5.8,
    },
    {
      id: 2,
      downPayment: 10000,
      term: 60,
      interestRate: 5.4,
    },
    {
      id: 3,
      downPayment: 8000,
      term: 40,
      interestRate: 5.5,
    },
  ]);
  const [selectedQuote, setSelectedQuote] = useState(quoteOptions[0]);

  const addQuoteOption: QuoteFormProps['addQuoteOption'] = (values) => {
    const newOption = {
      id: (quoteOptions.at(-1)?.id ?? 1) + 1,
      downPayment: values.downPayment,
      term: values.term,
      interestRate: values.interestRate,
    };
    setQuoteOptions([...quoteOptions, newOption]);
  };

  const removeQuoteOption = (id: number) => {
    setQuoteOptions(quoteOptions.filter(option => option.id !== id));
    if (selectedQuote.id === id) {
      setSelectedQuote(quoteOptions[0])
    }
  };

  const setSelectedQuoteOption = (id: number) => {
    setSelectedQuote(quoteOptions.find(option => option.id == id) ?? quoteOptions[0]);
  };

  const paymentsQuery = useQuery({
    queryKey: ['search', selectedQuote],
    queryFn: () => fetchMonthlyPaymentsResults(price, selectedQuote.downPayment,
      selectedQuote.term, selectedQuote.interestRate),
    retry: false
  })

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Car Quote Options
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }} p={2}>
        {
          quoteOptions.map((quote) => (
            <Option key={quote.id} option={quote} removeQuoteOption={removeQuoteOption} selectedId={selectedQuote.id}
                    setSelected={setSelectedQuoteOption}/>
          ))
        }
      </Box>

      <Form addQuoteOption={addQuoteOption}/>

      {paymentsQuery.isLoading && <p>Loading...</p>}
      {
        paymentsQuery.data?.error &&
        <>
          <Typography variant={"h5"}>{paymentsQuery.data?.message}</Typography>
        </>
      }
      {
        (paymentsQuery.isSuccess && !paymentsQuery.data?.error) &&
        <Typography variant={"h4"}>Estimated Monthly Payment: ${paymentsQuery.data?.monthlyPayment}</Typography>
      }
    </>
  );
}