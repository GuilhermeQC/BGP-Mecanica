import { loadOS, loadCliente, loadEstoque } from './loaders.js'

const panelsElements = document.querySelectorAll("a[panel]");
const title = document.querySelector("div > h1");
const listTitle = document.querySelector(".display h2");
const form = document.querySelector("form");
const btn_adicionar = document.querySelector(".adicionar");
const btn_fechar = document.querySelector(".fechar");

async function loadPanel(panel) {
    const { name, loader } = panels[panel];
    title.innerHTML = name;
    listTitle.innerHTML = `lista ${name}`;

    await loader();
}


for (const panel of panelsElements) {
    panel.addEventListener("click", async function () {
        const panel = this.attributes[0].value;
        localStorage.setItem("panel", panel);
        await loadPanel(panel);
    });
}


btn_adicionar.addEventListener("click", async () => {
    const popup = document.querySelector(".popup");
    popup.showModal();
    
});

btn_fechar.addEventListener("click", async () => {
    const popup = document.querySelector(".popup");
    popup.close();
});

const popup = document.querySelector(".popup");
popup.addEventListener("keydown", () => {
    if (event.key === "Escape") {
        event.preventDefault();}
});

/*
button.addEventListener("click", async () => {
    const popup = document.querrySelector(".popup");
    // abrir o popup
    const formContainer = popup.querrySelector("#formContainer");
    const response = await fetch(`./panels/${panels[localStorage.getItem("panel")].form}.html`);
    const content = await response.text();
    formContainer.innerHTML = content;
});
*/

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

await loadPanel("os");
