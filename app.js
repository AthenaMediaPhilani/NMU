const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search modules.json and filter it
const searchModules = async (searchText) => {
  const res = await fetch('modules.json');
  const modules = await res.json();

  // Get matches to current text input
  let matches = modules.filter((module) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return module.moduleCode.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
    <div class="card card-body mb-1">
    <div class="card-item">
    <h4 class="card-text">Module: ${match.moduleName} <span class="card-text-secondary">(${match.moduleCode})</span></h4></div>
     </div
    `,
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchModules(search.value));
