import { useQuery } from "@tanstack/vue-query";
import { collection, getDocs } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

export default function useUsersQuery() {
  const { $db } = useNuxtApp();

  const fetcher = async () =>{
    const response = await getDocs(collection($db as Firestore, "users"));
    return response.docs.map(doc => doc.data())
  }

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetcher,
  });

  return {
    data
  };
}
