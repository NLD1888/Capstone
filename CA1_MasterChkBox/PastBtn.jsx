// Module Code: IT8906
// Module Name: Web and Mobile Development Using Frameworks
// Acad Year/Semester: 2022/2023 Sem 2
// Assignment Title: CA1 - React Core Concepts
// Student Name: Ong Wei Chuan
// Student No: P7461072

// Filename: PastBtn.jsx

// Toggle button to hide or show past movies

export default function PastBtn(props) {
  return (
    <button className="pastBtn" onClick={() => props.onClick()}>
      {props.title}
    </button>
  );
}
