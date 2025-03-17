    function showContent(section) {
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = `<h1>${section}</h1><p>Informações sobre ${section.toLowerCase()}.</p> <br>`;
    }