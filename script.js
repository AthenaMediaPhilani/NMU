const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  modulesEl = document.getElementById('modules'),
  resultHeading = document.getElementById('result-heading'),
  single_moduleEl = document.getElementById('single-module');

// Search meal and fetch from API
function searchModule(e) {
  e.preventDefault();

  // Clear Single Meal
  single_moduleEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`modules.json`)
      .then((res) => res.json())
      .then((data) => {
        const resultsArray = data;

        // Get matches to current text input
        let matches = resultsArray.filter((module) => {
          const regex = new RegExp(`^${term}`, 'gi');
          return module.moduleCode.match(regex);
        });

        console.log(matches);
        resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`;

        if (data.modules === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          modulesEl.innerHTML = matches
            .map(
              (module) => `
<div class="module">
<img src="img/nmu-logo.jpg" alt"nmu-logo" />
<div class="module-info" data-moduleID="${module.moduleCode}">
<h3>${module.moduleName} <span><small>(${module.moduleCode})</small></span> </h3>

</div>

</div>
              `,
            )
            .join('');
        }
      });
    //   Clear Searc Text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch Module By ID Function
function getModuleById(moduleID) {
  fetch(`modules.json`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const moduleArr = data.filter((module) => {
        const regex = new RegExp(`^${moduleID}`, 'gi');

        return module.moduleCode.match(regex);
      });
      const module = moduleArr[0];

      addModuletoDOM(module);
    });
}

// Add Module to DOM
function addModuletoDOM(module) {
  single_moduleEl.innerHTML = `
    <div class="single-module">
    <h1>${module.moduleName}</h1>
    <h2>Course Code: ${module.moduleCode}</h2>
    <img src="img/nmu-logo.jpg" alt="logo" />
    <div class="single-module-info">
    <p>Prescribed Textbook</p>
    <h3>${module.textbook}</h3>
    <small> isbn: ${module.isbn}</small>
    </div>
    </div>
    `;
}

// Event Listeners
submit.addEventListener('submit', searchModule);
modulesEl.addEventListener('click', (e) => {
  const moduleInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('module-info');
    } else {
      return false;
    }
  });

  if (moduleInfo) {
    const moduleID = moduleInfo.getAttribute('data-moduleid');
    getModuleById(moduleID);
  }
});
