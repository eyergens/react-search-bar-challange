export interface ModelSearchResult {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: [];
}

export interface ValueSearchResult {
  make: string;
  model: string;
  year: number;
  valuationPrice: number;
  currency: string;
  country: string;
  error: string;
  message: string;
}

export interface PaymentsSearchResult {
  vin: string;
  payments: [];
  loanAmount: number;
  totalPaid: number;
  totalInterest: number;
  monthlyPayment: number;
  currency: string;
  error: string;
  message: string;
}

export interface QuoteFormProps {
  addQuoteOption?: (values: {
    downPayment: number;
    term: number;
    interestRate: number;
  }) => void;
}

export interface MakeProps {
  displayName: string;
  value: string;
}

export interface ModelProps {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface OptionProps {
  id: number,
  downPayment: number,
  term: number,
  interestRate: number,
}