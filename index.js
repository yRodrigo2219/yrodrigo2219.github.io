const screens = {
    INFO: "info/",
    MENU: {
        GAME: "port-games/menu.js",
        SORTING: "port-sort/menu.js",
        GRAPHS: "port-graph/menu.js",
        MATCHING: "port-match/menu.js"
    },
    WIP: "wip/"
}

const state = {
    currentpage: screens.WIP
}

function renderPage(){
    clearPage();
    loadScript(state.currentpage + "index.js").catch(_=>{
        state.currentpage = screens.WIP;
        renderPage();
    });
}

function loadMenu(){
    renderPage();
    const keys = Object.keys(screens.MENU);

    // Load the menu dynamically, but always in the same order
    (function loop(i){
        if(i >= keys.length)
            return;

        const script = document.createElement('script');
        document.body.appendChild(script);
        script.src = screens.MENU[keys[i]];
        script.onload = ()=>{
            document.body.removeChild(script);
            loop(++i);
        };
        script.onerror = ()=>{
            document.body.removeChild(script);
            alert("Error on loading "+ keys[i] +" dropdown!");
            loop(++i);
        };
    })(0);
}

async function loadScript( url ){
    return await new Promise((resolve, reject)=>{
        const script = document.createElement('script');
        const root = document.getElementById('root');
        root.appendChild(script);
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
    });
}

function showInfo(){
    if(!document.getElementById('infoPage')){
        const infoPage = document.createElement('div');
        infoPage.id = 'infoPage';
        document.getElementById('root').appendChild(infoPage);

        loadScript(state.currentpage + 'info.js').then(_=>{ // must chage to 'then' when compleated
            document.getElementById('floating-info').style.visibility = "hidden";
            infoPage.scrollIntoView({behavior: "smooth"});
        }).catch(_=>{
            document.getElementById('floating-info').style.visibility = "hidden";
            $('#noInfo').modal('show');
        });
    }
}

function clearPage(){
    let root = document.getElementById('root');
    while(root.firstChild){
        root.removeChild(root.firstChild);
    }
    document.body.removeChild(root);

    let newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
}

function goTo( page ){
    state.currentpage = page;
    renderPage();
}

onload = loadMenu();