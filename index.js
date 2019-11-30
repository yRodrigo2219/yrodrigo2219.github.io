const screens = {
    INFO: 'info',
    GAME: {
        TICTACTOE: "https://yrodrigo2219.github.io/tictactoe/index.js",
        SUDOKU: 'sud',
        SNAKE: 'sna',
        MINESWEEPER: 'min',
        PACMAN: 'pac'
    },
    SORTING: {
        HEAPSORT: 'heap',
        MERGESORT: 'mer',
        QUICKSORT: 'quic',
        BUBBLESORT: 'bubbl',
        INSERTSELECT: 'ins/sel'
    },
    GRAPHS: {
        DFS: 'dfs',
        BFS: 'bfs',
        PRIM: 'prim',
        KRUSKAL: 'krus',
        DIJKSTRA: 'dijk'
    },
    MATCHING: {
        BRUTEFORCE: 'brufo',
        KMS: 'kms'
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

onload = renderPage();