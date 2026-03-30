import Card from "./CardComponent.tsx";
import {Stack} from '@mui/material';

export default function List({list}: { list: string[] }) {
  return (
    <>
      <Stack
        sx={{
          marginTop: '2rem',
          justifyContent: "center",
          alignItems: "stretch"
        }} spacing={2}>
        {
          list.map((item: string, index: number) => (
            <Card key={index} description={item}/>
          ))
        }
      </Stack>
    </>
  );
}