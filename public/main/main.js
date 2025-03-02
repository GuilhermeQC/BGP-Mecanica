import { loadOS, loadCliente, loadEstoque } from './loaders.js'

const panelsElements = document.querySelectorAll("a[panel]");
const title = document.querySelector("div > h1");
const listTitle = document.querySelector(".display h2");
const form = document.querySelector("form");

async function loadPanel(panel) {
    const { name, loader } = panels[panel];
    title.innerHTML = name;
    listTitle.innerHTML = `lista ${name}`;
    const response = await fetch(`./panels/${panels[panel].form}.html`);
    const content = await response.text();
    form.innerHTML = content;
    await loader();
}

for (const panel of panelsElements) {
    panel.addEventListener("click", async function () {
        const panel = this.attributes[0].value;
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

await loadPanel("os");
