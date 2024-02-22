import { useQuery } from "@tanstack/vue-query";
import {collection, getDocs } from "firebase/firestore";
import type {Firestore} from 'firebase/firestore'

export default function useUsersQuery() {
  const {$db} = useNuxtApp()

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getDocs(collection($db as Firestore, "users"))
  });

  return {
    data, isLoading
  };
}
