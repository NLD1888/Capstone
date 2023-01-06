// Module Code: IT8906
// Module Name: Web and Mobile Development Using Frameworks
// Acad Year/Semester: 2022/2023 Sem 2
// Assignment Title: CA1 - React Core Concepts
// Student Name: Ong Wei Chuan
// Student No: P7461072

// Filename: DisplayMovies.jsx

// This component is to display in table format the list of movies
// after being filtered by genre and/or hide past movies buttons.
// Deletion of single movie or multiple movies are also coded here
// by sending movie id(s) to the root components.

// --- Added MASTER CHECKBOX feature ----

export default function DisplayMovies(props) {
  // For deletion of multiple movies
  // Note: Don't use a regular array as it doesn't persist between renders.
  // When checkbox is clicked (onChange):
  // If id is in the array, remove it
  // else add the id in the array
  const [delArray, setDelArray] = React.useState([]);

  // ------- MASTER CHECKBOX -------
  // Get array of all isChecked status of movieList
  const isCheckedArr = props.movieList.map((movie) => movie.isChecked);
  console.log("isChecked Array:", isCheckedArr);

  // Set masterChkBox to false if any
  // isChecked status of movies is false
  // or array is empty (No movie)
  let masterChkBox = false;
  if (isCheckedArr.length !== 0) {
    masterChkBox = !isCheckedArr.includes(false);
    console.log("masterChkBox:", masterChkBox);
  }
  // ----- MASTER CHECKBOX -----

  return (
    <div>
      <table>
        <thead>
          <tr className="tableHeading">
            <th>
              {/* --- MASTER CHECKBOX --- */}
              {/* Add all ids of movieList to delArray if checked */}
              <input
                type="checkbox"
                checked={masterChkBox}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDelArray(props.movieList.map((movie) => movie.id));
                  } else {
                    setDelArray([]);
                  }
                  // If Master Checkbox is checked,
                  // then MovieMgmt will set
                  // isChecked of all movies to true.
                  // Else set isChecked to false.
                  props.onMasterChkBox(e.target.checked);
                }}
              />
              {console.log("Master delArray:", delArray)}
              {/* --- MASTER CHECKBOX --- */}
            </th>
            <th>Movie ID</th>
            <th>Movie Name</th>
            <th>Genre</th>
            <th>Past Movie</th>
            <th>Delete</th>
          </tr>
        </thead>
        {props.movies.map((movie) => (
          <tr>
            <th>
              <input
                type="checkbox"
                checked={movie.isChecked}
                onChange={() => {
                  // Add the ids in array if checkbox is checked
                  // Remove id in array if checkbox is unchecked
                  if (delArray.includes(movie.id)) {
                    const index = delArray.indexOf(movie.id);
                    delArray.splice(index, 1);
                  } else {
                    delArray.push(movie.id);
                  }
                  console.log("Display delArray:", delArray);

                  // Send id of checkbox to update
                  // respective movie's isChecked
                  props.onChkBoxChange(movie.id);
                }}
              />
            </th>
            <td>{movie.id}</td>
            <td>{movie.name}</td>
            <td>{movie.genre}</td>
            <td>{movie.past ? "YES" : "NO"}</td>
            {/* Deletion of single movie */}
            <td
              onClick={() => {
                // Remove id in array if it's already
                // being selected by the group delete
                // To make sure correct display of 'No.
                // of movies for deletion' is correct.
                if (delArray.includes(movie.id)) {
                  const index = delArray.indexOf(movie.id);
                  delArray.splice(index, 1);
                }
                console.log("delArray:", delArray);
                // Delete 1 movie by clicking the respective movie name
                console.log("deleteMovie:", movie.id);
                props.onDel(movie.id);
              }}
            >
              <img src="./images/deleteIcon.png" alt="TrashIcon" />
            </td>
          </tr>
        ))}
      </table>
      <button
        onClick={() => {
          props.onGrpDel(delArray);
          setDelArray([]);
        }}
      >
        Delete
      </button>

      <label>
        {delArray.length == 0
          ? "Select Movie(s) for deletion"
          : `${delArray.length} movie(s) selected`}
      </label>
    </div>
  );
}
