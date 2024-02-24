let filteredStudents = [];

function studentTable(data) {
    const studentTablesDiv = document.getElementById('studentTables');
    studentTablesDiv.innerHTML = ''; 
    
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    const headings = ['ID', 'Name', 'Gender', 'Class', 'Marks', 'Passing', 'Email'];
    const trHead = document.createElement('tr');
    headings.forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);
  
    data.forEach(student => {
      const tr = document.createElement('tr');
      const fullName = `${student.first_name} ${student.last_name}`;
      const passingStatus = student.passing ? 'Passing' : 'Failed';
      
      tr.innerHTML = `
        <td>${student.id}</td>
        <td><img src="${student.img_src}" alt="${fullName}" style="vertical-align: bottom;width:30px;height:30px; border-radius:50%;border:1px solid black;"> ${fullName}</td>
        <td>${student.gender}</td>
        <td>${student.class}</td>
        <td>${student.marks}</td>
        <td>${passingStatus}</td>
        <td>${student.email}</td>
      `;
      
      tbody.appendChild(tr);
    });
  
    table.appendChild(tbody);
    studentTablesDiv.appendChild(table);
  }

function filterStudents(searchText) {
  const lowerSearchText = searchText.toLowerCase();
  filteredStudents = students.filter(student => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const email = student.email.toLowerCase();
    return fullName.includes(lowerSearchText) || email.includes(lowerSearchText);
  });
  studentTable(filteredStudents);
}

function sortByNameAZ() {
  filteredStudents.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
  studentTable(filteredStudents);
}

function sortByNameZA() {
  filteredStudents.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
  studentTable(filteredStudents);
}

function sortByMarks() {
  filteredStudents.sort((a, b) => a.marks - b.marks);
  studentTable(filteredStudents);
}

function sortByPassing() {
    filteredStudents.sort((a, b) => {
      if (a.passing && !b.passing) {
        return -1;
      } else if (!a.passing && b.passing) {
        return 1;
      } else {
        return 0;
      }
    });
    studentTable(filteredStudents);
  }

  function sortByClass() {
    filteredStudents.sort((a, b) => {
      return parseInt(a.class) - parseInt(b.class);
    });
    studentTable(filteredStudents);
  }
  

function sortByGender() {
    filteredStudents.sort((a, b) => a.gender.localeCompare(b.gender));
    studentTable(filteredStudents);
  }

document.getElementById('searchButton').addEventListener('click', () => {
  const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
  filterStudents(searchText);
});


fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
  .then(response => response.json())
  .then(data => {
    filteredStudents = data; 
    studentTable(filteredStudents); 
  })
 
