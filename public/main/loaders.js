import Inputmask from "/node_modules/inputmask/dist/inputmask.es6.js";
import { get_all_clientes, update_cliente, get_cliente } from '../clienteHandlers.js';
import { get_all_estoque, get_estoque, update_estoque } from '../estoqueHandlers.js';
import { makeNotificationDiv } from "../utils.js";

const pecaTemplateHTML = `
<span><img src="../../../assets/icons/close.svg" alt="retirar peça" idPeca=">:idPeca" onclick="removeSelf(this)">:qtd - :label</span>
`;
const rowTemplateHTML = `
    <div class="row">
        <span>:id</span>
        <span>:descricao</span>
        <span>
            <input type="hidden" name=":id-type" value=":id-value">
            <button onclick="openDetailModal(this)"><img src="../../assets/icons/details.svg" alt="abrir menu do item"></button>
        </span>
    </div>
`;
const modalTemplateOS = `
<div class="close" onclick="closeModal(this)"><img src="../../assets/icons/close.svg" alt="fechar modal"></div>
                    <span>Periodo: 12/12/2024 - 01/01/2025</span><span>Status: aberta</span>
                    <h2>Titulo</h2>
                    <h3>Cliente</h3>
                    <div class="buttons">
                        <button id="editar">editar</button>
                        <button id="finalizar">finalizar</button>
                        <button id="cancelar">cancelar</button>
                    </div>
                    <p>Total do serviço: <strong>R$ 1500,00</strong></p>
                    <div class="valor">
                        <div class="pecas">
                            <h3>Peças usadas: </h3>
                            <span>porca - <strong>R$ 10,00</strong></span>
                            <span>pneu - <strong>R$ 200,00</strong></span>
                            <span>porca - <strong>R$ 10,00</strong></span>
                            <span>pneu - <strong>R$ 200,00</strong></span>
                            <span>porca - <strong>R$ 10,00</strong></span>
                            <span>pneu - <strong>R$ 200,00</strong></span>
                            <span>porca - <strong>R$ 10,00</strong></span>
                            <span>pneu - <strong>R$ 200,00</strong></span>
                            <span>porca - <strong>R$ 10,00</strong></span>
                            <span>pneu - <strong>R$ 200,00</strong></span>
                            <span>porca - <strong>R$ 10,00</strong></span>
                            <span>pneu - <strong>R$ 200,00</strong></span>
                        </div>
                        <strong>Total das peças: R$ 1000,00</strong>
                    </div>
                    <h2>Descrição:</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum esse alias minus sunt voluptate nesciunt commodi ipsa consectetur dolorem labore nihil repellendus ipsam, dolorum quam vitae quas asperiores voluptatem laborum unde numquam amet! Odit officiis consequatur delectus nisi, voluptate architecto perspiciatis, sapiente magnam, necessitatibus quos accusantium modi! Soluta minus, aliquid officiis libero quo laborum a similique voluptatem qui hic iure, rem dicta est! Fugiat, iure rem! Recusandae quidem ullam nemo laboriosam sapiente suscipit ex deserunt dolorum fugit distinctio exercitationem rem aut, veniam voluptatibus voluptas! Fugit reiciendis </p>
`;
const modalTemplateCliente = `
<div class="close" onclick="closeModal(this)"><img src="../../assets/icons/close.svg" alt="fechar modal"></div>
                    <h2>:Nome</h2>
                    <h2>:CPF</h2>
                    <h2>:Telefone</h2>
                    <input type="hidden" id="idCliente" value=":id" >
                    <div class="buttons">
                        <button id="editar">editar</button>
                    </div>
`;
const modalTemplateEstoque = `
<div class="close" onclick="closeModal(this)"><img src="../../assets/icons/close.svg" alt="fechar modal"></div>
                    <span>Aquisição: :Aquisicao </span>
                    <h2>:Peca</h2>

                    <div class="buttons">
                        <h3><strong>:qtd</strong> unidades do item</h3>
                        <div class="input-wrapper" id="qtdPecaModal">
                            <input type="number" step=".2" value="" id="qtdPecaModal">
                        </div>
                        <button id="atualizar" onClick="estoqueButtons(this)">atualizar</button>
                        <button id="somar" onClick="estoqueButtons(this)">somar</button>
                        <button id="subtrair" onClick="estoqueButtons(this)">subtrair</button>
                    </div>

                    <p>Valor da Peça: <strong>R$ :Valor</strong></p>
                    <p>Valor total de todas as peças em estoque: <strong>R$ :valorTotal</strong></p>
                    <div class="left buttons">
                        <input type="hidden" id="idEstoque" value=":id">
                        <button id="editar">editar informações da peça</button>
                    </div>
                    </div>
`;

async function editOS() {
    console.log("Função de edição de OS");
}

async function loadClienteData() {
    const id = document.querySelector(".display input#idCliente").value;
    const cliente = await get_cliente(id);
    document.querySelector("input#nome").value = cliente.nome;
    document.querySelector("input#telefone").value = cliente.telefone;
    document.querySelector("input#cpf").value = cliente.cpf;
}
async function editCliente() {
    console.log("Função de edição de Cliente");
    const nome = document.querySelector("input#nome").value;
    const telefone = document.querySelector("input#telefone").value;
    const cpf = document.querySelector("input#cpf").value;
    const id = document.querySelector(".display input#idCliente").value;
    const response = await update_cliente(id, nome, telefone, cpf);
    if (response.err) {
        console.log(response.err)
        makeNotificationDiv(response.err);
        return;
    }
    document.querySelector(".rowModal").style.display = "none";
    await loadCliente();
}
async function loadEstoqueData() {
    const id = document.querySelector(".display input#idEstoque").value;
    const estoque = await get_estoque(id);
    document.querySelector("input#nome").value = estoque.nome;
    document.querySelector("input#dataAquisicao").value = new Date(estoque.data_aquisicao).toLocaleDateString("pt-br");
    document.querySelector("input#valorUnitario").value = estoque.valor_unitario;
    document.querySelector("input#qtdPeca").value = estoque.quantidade;
}
async function editEstoque() {
    console.log("Função de edição de Estoque");
    const nome = document.querySelector("input#nome").value;
    const dataAquisicao = document.querySelector("input#dataAquisicao").value;
    const valorUnitario = document.querySelector("input#valorUnitario").value;
    const qtdPeca = document.querySelector("input#qtdPeca").value;
    const id = document.querySelector(".display input#idEstoque").value;
    const response = await update_estoque(id, nome, dataAquisicao, valorUnitario, qtdPeca);
    if (response.err) {
        console.log(response.err)
        makeNotificationDiv(response.err);
        return;
    }
    document.querySelector(".rowModal").style.display = "none";
    await loadCliente();
}

const editPanels = {
    os: editOS,
    cliente: {
        event: editCliente,
        loadData: loadClienteData,
    },
    estoque: {
        event: editEstoque,
        loadData: loadEstoqueData,
    },
};

async function showEditModal() {
    const editarButton = document.querySelector("button#editar");
    editarButton.addEventListener("click", () => {
        const popup = document.querySelector(".popup");
        popup.querySelector("h1").innerText = "Editar";
        popup.querySelector("form").reset();
        if (localStorage.getItem("panel") === "os")
            document.querySelector(".pecas-escolhidas").innerHTML = "";

        editPanels[localStorage.getItem("panel")].loadData();
        popup.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault();
            if (popup.querySelector("h1").innerText === "Editar")
                editPanels[localStorage.getItem("panel")].event();
        });
        popup.showModal();
    });
}

export async function loadOS() {
    const pecaContainer = document.querySelector(".pecas-escolhidas");
    // adicionar peça
    document.getElementById("addPeca").addEventListener("click", (event) => {
        event.preventDefault();
        const button = event.target;
        const select = button.parentElement.querySelector("select");
        const qtd = button.parentElement.querySelector("input#qtdPeca").value || 1;
        const { label, value } = select.selectedOptions[0];
        if (label === "Selecione uma peça")
            return;
        const pecaItem = pecaTemplateHTML
            .replace(":idPeca", value)
            .replace(":label", label)
            .replace(":qtd", qtd < .1 ? 1 : qtd);
        pecaContainer.innerHTML += pecaItem;
    });

    const afterLoad = showEditModal;
    return { modalTemplate: modalTemplateOS, afterLoad };
}

export async function loadCliente() {
    const tableRowContainer = document.querySelector("div.display .body");
    const telefone = document.querySelector("input#telefone");
    const cpf = document.querySelector("input#cpf");
    Inputmask({"mask": "(99) 9 9999-9999"}).mask(telefone);
    Inputmask({"mask": "999.999.999-99"}).mask(cpf);
    console.log("cliente");

    const clientes = await get_all_clientes();
    tableRowContainer.innerHTML = "";
    if (clientes.err) {
        console.log(clientes.err)
        makeNotificationDiv(clientes.err);
        return;
    }

    for (const cliente of clientes) {
        const row = rowTemplateHTML
            .replace(":id", cliente.id)
            .replace(":id-type", "idCliente")
            .replace(":id-value", cliente.id)
            .replace(":descricao", cliente.nome);
        tableRowContainer.innerHTML += row;
    }

    const afterLoad = showEditModal;
    return { modalTemplate: modalTemplateCliente, afterLoad };
}

export async function loadEstoque() {
    const tableRowContainer = document.querySelector("div.display .body");
    const data_nasc = document.querySelector("input#dataAquisicao");
    Inputmask({"mask": "99/99/9999"}).mask(data_nasc);
    console.log("estoque");

    const estoque_itens = await get_all_estoque();
    tableRowContainer.innerHTML = "";
    if (estoque_itens.err) {
        console.log(estoque_itens.err)
        makeNotificationDiv(estoque_itens.err);
        return;
    }
    /**
        .replace(":id", item.id)
        .replace(":Aquisicao", item.data_aquisicao)
        .replace(":Peca", item.nome)
        .replace(":qtd", item.quantidade)
        .replace(":Valor", item.valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }))
        .replace(":valorTotal", (item.valor * item.quantidade).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }));
    */
    for (const item of estoque_itens) {
        const row = rowTemplateHTML
            .replace(":id", item.id)
            .replace(":id-type", "idEstoque")
            .replace(":id-value", item.id)
            .replace(":descricao", item.nome);
        tableRowContainer.innerHTML += row;
    }

    const afterLoad = showEditModal;
    return { modalTemplate: modalTemplateEstoque, afterLoad };
}
