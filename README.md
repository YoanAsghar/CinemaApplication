 CinemaApplication
A modern movie discovery web application built with React and powered by the TMDB API. Search for any movie, explore the most popular titles, and track trending searches in real time.
Live Demo: Click here to view the app

 Features

Movie Search — Search for any movie by title with a debounced input, so the app only fetches results once you stop typing, reducing unnecessary API calls.
Popular Movies — On load, the app automatically fetches and displays the most popular movies at the moment using the TMDB Discover endpoint.
Trending Searches — Every search is tracked via Appwrite. The app keeps count of how many times each movie has been searched and displays the most searched movies in a dedicated trending section.
Loading State — A smooth animated loader is displayed while the app is fetching data, giving the user clear feedback.
Error Handling — If something goes wrong with the API request, a clear error message is shown to the user instead of a blank screen.
Responsive Design — Built with Tailwind CSS, the app is fully responsive and works across desktop and mobile screen sizes.


 Tech Stack
TechnologyUsageReactUI frameworkTailwind CSSStylingTMDB APIMovie dataAppwriteTrending searches databaseViteBuild toolVercelDeployment

 Getting Started
Prerequisites

Node.js installed
A TMDB API key
An Appwrite project with a database and collection set up

Installation
bash# Clone the repository
git clone https://github.com/yourusername/cinemaapplication.git

# Navigate to the project folder
cd cinemaapplication

# Install dependencies
npm install

# Create your environment variables file
cp .env.example .env
Fill in your .env file with your credentials:
bashVITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_METRICS_ID=your_collection_id
bash# Start the development server
npm run dev

 Project Structure
public
src/
├── components/
│   ├── search.jsx       # Search input component
│   ├── movieCard.jsx    # Individual movie card
│   └── loader.jsx       # Loading animation
├── config/
│   └── appwrite.js      # Appwrite client and functions
└── App.jsx              # Main application component

 Deployment
This application is deployed on Vercel. Every push to the main branch triggers an automatic redeployment.
View live app
https://cinema-application-gfvn2kxc3-yoanasghars-projects.vercel.app/
