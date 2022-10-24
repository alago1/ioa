import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileList from "./Components/ProfileList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileList />
    </QueryClientProvider>
  );
}
