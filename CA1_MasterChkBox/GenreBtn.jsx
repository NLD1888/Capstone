// Module Code: IT8906
// Module Name: Web and Mobile Development Using Frameworks
// Acad Year/Semester: 2022/2023 Sem 2
// Assignment Title: CA1 - React Core Concepts
// Student Name: Ong Wei Chuan
// Student No: P7461072

// Filename: GenreBtn.jsx

// Drop-down button to filter movie list by genre

export default function GenreBtn(props) {
  return (
    <div className="genreBtn">
      <label>Filter by Genre: </label>
      <select
        onChange={(evt) => {
          props.onChange(evt.target.value);
          console.log("event:", evt);
        }}
      >
        <option value="All" selected>
          All
        </option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Thriller">Thriller</option>
      </select>
    </div>
  );
}
