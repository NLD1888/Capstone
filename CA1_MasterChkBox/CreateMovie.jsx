// Module Code: IT8906
// Module Name: Web and Mobile Development Using Frameworks
// Acad Year/Semester: 2022/2023 Sem 2
// Assignment Title: CA1 - React Core Concepts
// Student Name: Ong Wei Chuan
// Student No: P7461072

// Filename: CreateMovie.jsx

// This component is to allow admin to create a new movie
// by entering movie name, movie genre and selecting if the
// entered movie is a past or current movie.

export default function CreateMovie(props) {
  // Set movieGenre & pastMovie states to match default states
  const [movieName, setMovieName] = React.useState("");
  const [movieGenre, setMovieGenre] = React.useState("Action");
  const [pastMovie, setPastMovie] = React.useState(false);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onAdd(movieName, movieGenre, pastMovie);
          setMovieName(""); //Clear the input field after submission
          setPastMovie(false); //Set back to default state
          setMovieGenre("Action"); //Reset back to 'Action' genre
        }}
      >
        <label>Movie Name: </label>
        <input
          className="movieNameInput"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        {/* {console.log("CreateName:", movieName)} */}
        <br />
        {/* <br /> */}
        <label>Movie Genre: </label>
        <select
          value={movieGenre}
          onChange={(e) => {
            setMovieGenre(e.target.value);
            // console.log("event:", e.target.value);
          }}
        >
          {console.log("movieGenre:", movieGenre)}
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
        </select>
        <br />
        {/* <br /> */}
        <input
          type="checkbox"
          checked={pastMovie}
          onChange={(e) => setPastMovie(e.target.checked)}
        />
        <label>Past Movie: {pastMovie ? "YES" : "NO"}</label>
        {console.log("pastMovie:", pastMovie)}
        <br />
        <button
          // disable button when Movie Name field is empty
          disabled={movieName == ""}
        >
          Add New Movie
        </button>
      </form>
    </div>
  );
}
