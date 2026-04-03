import {Box, Paper, Typography} from '@mui/material';

interface OptionProps {
  id: number,
  downPayment: number,
  monthlyRate: number,
  term: number,
  interestRate: number,
}

export default function Option({option}: { option: OptionProps }) {
  return (
    <>
      <Paper
        key={option.id}
        elevation={3}
        style={{ padding: '16px', margin: '16px' }}
      >
        <Typography variant="h5">Quote Option {option.id}</Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <Typography>Down Payment: ${option.downPayment}</Typography>
          <Typography>Monthly Rate: ${option.monthlyRate}</Typography>
          <Typography>Term (months): {option.term}</Typography>
          <Typography>Interest Rate: {option.interestRate}%</Typography>
        </Box>
      </Paper>
    </>
  );
}