function loadScripts() {
  var directory = "scripts/";
  var extension = ".js";
  var files = ["udit_sen", "script2", "3", "5", "4"];
  for (var file of files) {
    var path = directory + file + extension;
    var script = document.createElement("script");
    script.src = path;
    script.defer = true;
    document.head.appendChild(script);
  }
}

loadScripts();

var audience = [];

function generateTemplate(info) {
  let audienceCardTemplate = `
        <div class="audience-image">
          <img src="${
            info.picture
          }" alt="" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'" />
        </div>
        <div class="audience-info">
          <span class="audience-name">${info.name}</span>
          <span class="audience-about">
            ${info.about}
          </span>
          <div class="audience-links">
            ${
              info.linkedin
                ? `<a href="${info.linkedin}" target="_blank" rel="noopener noreferrer" onclick="linkhandler(event)">
              <img src="images/iconmonstr-linkedin-3.svg" alt="" srcset="" />
            </a>`
                : ""
            }

            ${
              info.website
                ? `<a href="${info.website}" target="_blank" rel="noopener noreferrer" onclick="linkhandler(event)">
              <img src="images/iconmonstr-globe-7.svg" alt="" srcset="" />
            </a>`
                : ""
            }
            
          </div>
        </div>
      `;

  return audienceCardTemplate;
}

const container = document.getElementById("audience-container");

const helloWorld = (a) => {
  audience.push({ ...a, uuid: Math.random().toString(16).slice(2) });
  generateDivs();
};

const generateDivs = (txt) => {
  container.innerHTML = "";

  audience.sort((a, b) => a.name.localeCompare(b.name));

  const filteredAudience = txt
    ? audience?.filter((a) => a?.name?.toLowerCase()?.includes(txt))
    : audience;

  filteredAudience.forEach((a) => {
    let div = document.createElement("div");
    div.classList.add("audience-card");
    div.setAttribute("data-uuid", a.uuid);
    div.id = a.uuid;
    div.innerHTML = generateTemplate(a);
    container.appendChild(div);
  });

  document.querySelector("a").addEventListener("click", (e) => {
    e.stopPropagation();
  });
};

document.querySelector("#search").addEventListener("input", (e) => {
  const txt = e.target.value;
  generateDivs(txt.toLowerCase());
});

function linkhandler(evt) {
  evt.stopPropagation();
}
