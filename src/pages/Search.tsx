import {Box, Paper, Typography, InputLabel, OutlinedInput, FormControl, Button} from '@mui/material'
import React, {useState} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import SearchIcon from '@mui/icons-material/Search';
import GroupedModels from "../components/GroupedModels.tsx";

interface SearchResult {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: [];
}

export interface ModelProps {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

function groupByMake(cars: ModelProps[]): Record<string, ModelProps[]> {
  return cars.reduce((grouped, car) => {
    if (!grouped[car.Make_Name]) {
      grouped[car.Make_Name] = [];
    }
    grouped[car.Make_Name].push(car);
    return grouped;
  }, {} as Record<string, ModelProps[]>);
}

const fetchSearchResults = async (query: string): Promise<SearchResult> => {
  const {data} = await axios.get<SearchResult>(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${query}?format=json`);
  return data;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['search', activeQuery],
    queryFn: () => fetchSearchResults(activeQuery),
    enabled: !!activeQuery,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchTerm);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Search</Typography>
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <Paper
          sx={{padding: '16px', marginBottom: '16px'}}
          elevation={3}
        >
          <FormControl sx={{m: 1, width: '25ch', alignSelf: 'center'}} variant="outlined">
            <InputLabel htmlFor='make'>Make</InputLabel>
            <OutlinedInput
              required
              label="Make"
              type="text"
              name="make"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
          <Button
            sx={{
              padding: '16px',
              m: 1,
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
            type="submit"
            variant="outlined"
            startIcon={<SearchIcon/>}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Paper>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}

        { data != undefined ? <GroupedModels groupedModels={groupByMake(data?.Results)}/> : ''}
      </Box>
    </>
  );
}