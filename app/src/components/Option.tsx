import {Box, IconButton, Paper, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

interface OptionProps {
  id: number,
  downPayment: number,
  monthlyRate: number,
  term: number,
  interestRate: number,
}

export default function Option({option, removeQuoteOption}: {
  option: OptionProps,
  removeQuoteOption: (id: number) => void
}) {
  return (
    <Paper
      sx={{padding: '16px', margin: '16px'}}
      key={option.id}
      elevation={3}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h5">Quote Option {option.id}</Typography>
        <IconButton onClick={() => removeQuoteOption(option.id)}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <Typography>Down Payment: ${option.downPayment}</Typography>
        <Typography>Monthly Rate: ${option.monthlyRate}</Typography>
        <Typography>Term (months): {option.term}</Typography>
        <Typography>Interest Rate: {option.interestRate}%</Typography>
      </Box>
    </Paper>
  );
}