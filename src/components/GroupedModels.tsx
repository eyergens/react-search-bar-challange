import {Box, Typography} from "@mui/material";
import {type ModelProps} from "../pages/Search.tsx";
import Model from "../components/Model";

export default function GroupedModels({groupedModels}: { groupedModels: Record<string, ModelProps[]> }) {
  return (
    <>
      {Object.entries(groupedModels).map(([make, models]) => (
        <Box key={make}>
          <Typography  variant="h5">Results for Make: {make}</Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }} p={2}>
            {models.map((model: ModelProps) => (
              <Model key={model.Model_ID} model={model} />
            ))}
          </Box>
        </Box>
      ))}
    </>
  )
}