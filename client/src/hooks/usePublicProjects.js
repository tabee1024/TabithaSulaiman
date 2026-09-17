import {
     useCallback,
     useEffect,
     useState,
} from "react";


function usePublicProjects() {
     const [
          projects,
          setProjects,
     ] = useState([]);

     const [
          isLoading,
          setIsLoading,
     ] = useState(true);

     const [
          error,
          setError,
     ] = useState("");


     const loadProjects =
          useCallback(
               async (signal) => {
                    try {
                         setIsLoading(true);
                         setError("");

                         const response =
                              await fetch(
                                   "/api/projects",
                                   {
                                        method:
                                             "GET",
                                        signal,
                                   }
                              );

                         const result =
                              await response.json();

                         if (!response.ok) {
                              throw new Error(
                                   result.message ||
                                   "Unable to load projects."
                              );
                         }

                         if (
                              !Array.isArray(
                                   result.data
                              )
                         ) {
                              throw new Error(
                                   "The project response was invalid."
                              );
                         }

                         setProjects(
                              result.data
                         );
                    } catch (error) {
                         if (
                              error.name ===
                              "AbortError"
                         ) {
                              return;
                         }

                         console.error(
                              "Public project load error:",
                              error
                         );

                         setProjects([]);

                         setError(
                              "Projects could not be loaded right now."
                         );
                    } finally {
                         if (
                              !signal?.aborted
                         ) {
                              setIsLoading(
                                   false
                              );
                         }
                    }
               },
               []
          );


     useEffect(() => {
          const controller =
               new AbortController();

          loadProjects(
               controller.signal
          );

          return () => {
               controller.abort();
          };
     }, [loadProjects]);


     const reload =
          useCallback(
               async () => {
                    await loadProjects();
               },
               [loadProjects]
          );


     return {
          projects,
          isLoading,
          error,
          reload,
     };
}


export default usePublicProjects;