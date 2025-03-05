import { loadOS, loadCliente, loadEstoque } from './loaders.js'

const panelsElements = document.querySelectorAll("a[panel]");
const modalContainer = document.querySelector(".rowModal");
const title = document.querySelector("div > h1");
const listTitle = document.querySelector(".display h2");
const form = document.querySelector(".popup-form form");
const btn_adicionar = document.querySelector(".adicionar");
const btn_fechar = document.querySelector(".fechar");


async function insertOS() {
    console.log("Função de inserção de OS");
}

async function insertCliente() {
    console.log("Função de inserção de Cliente");
}

async function insertEstoque() {
    console.log("Função de inserção de Estoque");
}

// carrega os diferentes paineis
async function loadPanel(panel) {
    const { name, loader } = panels[panel];
    title.innerHTML = name;
    listTitle.innerHTML = `lista: ${name}`;
    const response = await fetch(`./panels/${panels[panel].form}.html`);
    const content = await response.text();
    form.innerHTML = content;
    const { modalTemplate, afterLoad } = await loader();
    modalContainer.innerHTML = modalTemplate;
    await afterLoad();
    modalContainer.style.display = "none";
}

//adiciona os evenos de click a todos os itens do menu que possuiem a propriedade panel
for (const panel of panelsElements) {
    panel.addEventListener("click", async function () {
        const panel = this.attributes[0].value;
        localStorage.setItem("panel", panel);
        await loadPanel(panel);
    });
}

const panels = {
    os: {
        name: "ordens de serviço",
        loader: loadOS,
        form: "osPanel",
    },
    cliente: {
        name: "clientes",
        loader: loadCliente,
        form: "clientePanel",
    },
    estoque: {
        name: "estoque",
        loader: loadEstoque,
        form: "estoquePanel",
    },
};

const insertPanels = {
    os: insertOS,
    cliente: insertCliente,
    estoque: insertEstoque,
};

await loadPanel("os");

//funções de tela
function closeModal (element){
    element.parentElement.style.display = "none";
}
window.closeModal = closeModal;

function openDetailModal() {
    modalContainer.style.display = "block";
}
window.openDetailModal = openDetailModal;

function removeSelf(element) {
    element.parentElement.remove();
}
window.removeSelf = removeSelf;

btn_adicionar.addEventListener("click", async () => {
    const popup = document.querySelector(".popup");
    popup.querySelector("h1").innerText = "Adicionar";
    popup.querySelector("form").reset();
    if (localStorage.getItem("panel") === "os")
        document.querySelector(".pecas-escolhidas").innerHTML = "";

    popup.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        if (popup.querySelector("h1").innerText === "Adicionar")
            insertPanels[localStorage.getItem("panel")]();
    });
    popup.showModal();
});

btn_fechar.addEventListener("click", async () => {
    const popup = document.querySelector(".popup");
    popup.close();
});

const popup = document.querySelector(".popup");
popup.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        event.preventDefault();}
});
