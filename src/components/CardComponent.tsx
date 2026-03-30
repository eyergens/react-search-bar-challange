import {Card, CardContent, Typography} from '@mui/material';

export default function CardComponent({description}: { description: string }) {
  return (
    <Card sx={{margin: '2rem'}} variant="outlined">
      <CardContent>
        <Typography variant="h6">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}