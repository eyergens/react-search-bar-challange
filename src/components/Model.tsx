import {Paper, Typography} from "@mui/material";
import {type ModelProps} from "../pages/Search.tsx";

export default function Model({model}: {model: ModelProps}) {
  return (
    <>
      <Paper
        sx={{
          width: '200px',
          height: '200px',
          padding: '16px',
          margin: '16px',
          alignContent: 'center',
        }}
        elevation={3}
      >
        <Typography variant="h5">{model.Model_Name}</Typography>
      </Paper>
    </>
  )
}