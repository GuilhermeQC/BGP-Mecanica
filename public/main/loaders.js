import Inputmask from "/node_modules/inputmask/dist/inputmask.es6.js";

const pecaTemplateHTML = `
<span><img src="../../../assets/icons/close.svg" alt="retirar peça" idPeca=">:idPeca" onclick="removeSelf(this)">:qtd - :label</span>
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
                    <div class="buttons">
                        <button id="editar">editar</button>
                    </div>
`;
const modalTemplateEstoque = `
<div class="close" onclick="closeModal(this)"><img src="../../assets/icons/close.svg" alt="fechar modal"></div>
                    <span>Aquisição: 12/12/2024 - 01/01/2025</span>
                    <h2>:Peca</h2>

                    <div class="buttons">
                        <h3><strong>5</strong> unidades do item</h3>
                        <div class="input-wrapper" id="qtdPecaModal">
                            <input type="number" step=".2" value="5" id="qtdPecaModal">
                        </div>
                        <button id="atualizar">atualizar</button>
                        <button id="somar">somar</button>
                        <button id="subtrair">subtrair</button>
                    </div>

                    <p>Valor da Peça: <strong>R$ 500,00</strong></p>
                    <p>Valor total de todas as peças em estoque: <strong>R$ 1500,00</strong></p>
                    <div class="left buttons">
                        <button id="editar">editar informações da peça</button>
                    </div>
                    </div>
`;

async function editOS() {
    console.log("Função de edição de OS");
}

async function editCliente() {
    console.log("Função de edição de Cliente");
}

async function editEstoque() {
    console.log("Função de edição de Estoque");
}

const editPanels = {
    os: editOS,
    cliente: editCliente,
    estoque: editEstoque,
};

async function showEditModal() {
    const editarButton = document.querySelector("button#editar");
    editarButton.addEventListener("click", () => {
        const popup = document.querySelector(".popup");
        popup.querySelector("h1").innerText = "Editar";
        popup.querySelector("form").reset();
        document.querySelector(".pecas-escolhidas").innerHTML = "";
        popup.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault();
            if (popup.querySelector("h1").innerText === "Editar")
                editPanels[localStorage.getItem("panel")]();
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
    const telefone = document.querySelector("input#telefone");
    const cpf = document.querySelector("input#cpf");
    Inputmask({"mask": "(99) 9 9999-9999"}).mask(telefone);
    Inputmask({"mask": "999.999.999-99"}).mask(cpf);
    console.log("cliente");
    const afterLoad = showEditModal;
    return { modalTemplate: modalTemplateCliente, afterLoad };
}

export async function loadEstoque() {
    const data_nasc = document.querySelector("input#dataAquisicao");
    Inputmask({"mask": "99/99/9999"}).mask(data_nasc);
    console.log("estoque");
    const afterLoad = showEditModal;
    return { modalTemplate: modalTemplateEstoque, afterLoad };
}
