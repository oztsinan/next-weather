"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./(home)";
// import "moment/locale/tr";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
