import { Client, Databases, Query, ID } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const METRICS_ID = import.meta.env.VITE_APPWRITE_METRICS_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)

const database = new Databases(client);

export async function updateSearchCount(searchTerm, movieAssociated){
  try{
    const result = await database.listDocuments(DATABASE_ID, METRICS_ID, [
      Query.equal('searchTerm', searchTerm),
    ]); 
    
    if(result.documents.length > 0){
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, METRICS_ID, doc.$id, {
        count: doc.count + 1
      })
    }
    else{
      await database.createDocument(DATABASE_ID, METRICS_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movieAssociated.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movieAssociated.poster_path}`
      })
    }
  }catch(err){
    console.log(err);
  }
}

export async function fetchTrendingMovies(){
  try{
    const result = await database.listDocuments(DATABASE_ID, METRICS_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ]);

    return result.documents;
  }catch(err){
  console.log(err);
  return [];
  }
}
