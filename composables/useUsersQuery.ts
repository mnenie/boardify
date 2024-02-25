import { useQuery } from "@tanstack/vue-query";
import type { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

export default function useUsersQuery() {
  const { $db } = useNuxtApp();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>{
      const response = await getDocs(collection($db as Firestore, "users"));
      return response.docs.map(doc => doc.data()) as User[]
    },
  });

  return {
    data, isLoading
  };
}
