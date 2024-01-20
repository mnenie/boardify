import { useQuery } from "@tanstack/vue-query";
import { DB } from "~/lib/appwrite";

export default function useUsersQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => DB.listDocuments('boardify-database', 'users')
  });

  return {
    data, isLoading
  };
}
