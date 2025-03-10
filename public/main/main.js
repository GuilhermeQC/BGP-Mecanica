import { loadOS, loadCliente, loadEstoque } from './loaders.js'
import { get_all_clientes, create_cliente, get_cliente } from '../clienteHandlers.js';
import { get_all_estoque, create_estoque, get_estoque, update_quantidade } from '../estoqueHandlers.js';
import { create_os } from '../OSHandlers.js';
import { makeNotificationDiv } from "../utils.js";

const panelsElements = document.querySelectorAll("a[panel]");
const modalContainer = document.querySelector(".rowModal");
const title = document.querySelector("div > h1");
const listTitle = document.querySelector(".display h2");
const form = document.querySelector(".popup-form form");
const btn_adicionar = document.querySelector(".adicionar");
const btn_fechar = document.querySelector(".fechar");

let showEditButton;
let modalTemplateDetails;

async function insertOS() {
    console.log("Função de inserção de OS");
    const valor = document.querySelector("input#valor").value;
    const descricao = document.querySelector("textarea#descricao").value;
    const cliente = document.querySelector("select#clientes").value;
    const pecasSpan = document.querySelector(".pecas-escolhidas").querySelectorAll("span");
    let pecas = [];
    for (const span of pecasSpan) {
        const id = span.attributes[0].value;
        const qtd = span.innerText.split(" - ")[0];
        pecas.push({ id, qtd });
    }
    const response = await create_os(valor, descricao, cliente, pecas);
    if (response.err) {
        console.log(response.err)
        makeNotificationDiv(response.err);
        return;
    }
    await loadCliente();
}

async function insertCliente() {
    console.log("Função de inserção de Cliente");
    const nome = document.querySelector("input#nome").value;
    const telefone = document.querySelector("input#telefone").value;
    const cpf = document.querySelector("input#cpf").value;
    const response = await create_cliente(nome, telefone, cpf);
    if (response.err) {
        console.log(response.err)
        makeNotificationDiv(response.err);
        return;
    }
    await loadCliente();
}

async function insertEstoque() {
    console.log("Função de inserção de Estoque");
    const nome = document.querySelector("input#nome").value;
    const dataAquisicao = document.querySelector("input#dataAquisicao").value;
    const valorUnitario = document.querySelector("input#valorUnitario").value;
    const qtdPeca = document.querySelector("input#qtdPeca").value;
    const response = await create_estoque(nome, dataAquisicao, valorUnitario, qtdPeca);
    if (response.err) {
        console.log(response.err)
        makeNotificationDiv(response.err);
        return;
    }
    await loadEstoque();
}

async function estoqueButtons(element) {
    const id = element.parentElement.parentElement.querySelector("input#idEstoque").value;
    const action = element.attributes[0].value;
    const qtd = element.parentElement.querySelector("input#qtdPecaModal").value;
    const result = await update_quantidade(id, action, qtd);
    element.parentElement.querySelector("h3 strong").innerText = result;
}

window.estoqueButtons = estoqueButtons;

// carrega os diferentes paineis
async function loadPanel(panel) {
    const { name, loader } = panels[panel];
    title.innerHTML = name;
    listTitle.innerHTML = `lista: ${name}`;
    const response = await fetch(`./panels/${panels[panel].form}.html`);
    const content = await response.text();
    form.innerHTML = content;
    const { modalTemplate, afterLoad } = await loader();
    modalTemplateDetails = modalTemplate;
    showEditButton = afterLoad;
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

async function openDetailModal(element) {
    const id = element.parentElement.querySelector("input").value;
    switch (localStorage.getItem("panel")) {
        case "cliente":
            const cliente = await get_cliente(id);
            const modalContentCliente = modalTemplateDetails
                .replace(":id", id)
                .replace(":Nome", cliente.nome)
                .replace(":CPF", cliente.cpf)
                .replace(":Telefone", cliente.telefone);
            modalContainer.innerHTML = modalContentCliente;
            await showEditButton();
            break;
        case "estoque":
            const estoque = await get_estoque(id);
            const modalContentEstoque = modalTemplateDetails
                .replace(":id", id)
                .replace(":Aquisicao", new Date(estoque.data_aquisicao).toLocaleDateString("pt-BR"))
                .replace(":Peca", estoque.nome)
                .replace(":qtd", estoque.quantidade)
                .replace(":Valor", estoque.valor_unitario.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }))
                .replace(":valorTotal", (estoque.valor_unitario * estoque.quantidade).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }));
            modalContainer.innerHTML = modalContentEstoque;
            await showEditButton();
            break;
        case "os":

            break;
    }

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

    const clienteSelect = document.querySelector("form select#clientes");
    const clientesOptions = await get_all_clientes().then((values) => values.map(value => `<option value="${value.id}">${value.nome}</option>`));
    clienteSelect.innerHTML += clientesOptions;

    const pecaSelect = document.querySelector("form select#pecas");
    const pecaOptions = await get_all_estoque().then((values) => values.map(value => `<option value="${value.id}">${value.nome}</option>`));
    pecaSelect.innerHTML += pecaOptions;

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
