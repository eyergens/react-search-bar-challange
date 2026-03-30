import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ButtonComponent({text}: { text: string }) {
  return (
    <Button
      type="submit"
      variant="outlined"
      startIcon={<AddIcon/>}
      disabled={!text.trim()}
      sx={{
        py: 1.5,
        fontWeight: 'bold'
      }}
    >
      {text}
    </Button>
  );
}