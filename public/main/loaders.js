const pecaTemplateHTML = `
<span><img src="../../../assets/icons/close.svg" alt="retirar peça" idPeca=">:idPeca" onclick="removeSelf(this)">:qtd - :label</span>
`;

export async function loadOS() {
    const pecaContainer = document.querySelector(".pecas-escolhidas");
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
    console.log("os");
}

export async function loadCliente() {
    console.log("cliente");
}

export async function loadEstoque() {
    console.log("estoque");
}
