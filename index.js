const screens = {
    INFO: "info.js",
    MENU: {
        GAME: "port-games/menu.js",
        SORTING: "port-sort/menu.js",
        GRAPHS: "port-graph/menu.js",
        MATCHING: "port-match/menu.js"
    },
    WIP: "wip.js"
}

const state = {
    currentpage: screens.INFO
}

function renderPage(){
    clearPage();
    loadScript(state.currentpage).catch(_=>{
        clearPage();
        loadScript(screens.WIP);
    });
}

function loadMenu(){
    renderPage();
    const keys = Object.keys(screens.MENU);
    keys.map(async key =>{
        await new Promise(_=>{
            const script = document.createElement('script');
            document.body.appendChild(script);
            script.src = screens.MENU[key];
            script.onload = ()=>{
                document.body.removeChild(script);
            };
            script.onerror = ()=>{
                document.body.removeChild(script);
                alert("Error on loading "+ key +" dropdown!");
            };
        });
    });
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

        loadScript(state.currentpage + 'info.js').catch(_=>{ // must chage to 'then' when compleated
            infoPage.scrollIntoView({behavior: "smooth"});
        });
    }else{
        infoPage.scrollIntoView({behavior: "smooth"});
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