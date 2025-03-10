export async function get_all_estoque() {
    try {
        const estoque = await fetch("http://localhost:3000/api/estoque", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resultado = await estoque.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function get_estoque(id) {
    try {
        const estoque = await fetch(`http://localhost:3000/api/estoque/single/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resultado = await estoque.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function create_estoque(nome, data_aquisicao, valor_unitario, quantidade) {
    try {
        const estoque = await fetch("http://localhost:3000/api/estoque/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, data_aquisicao, valor_unitario, quantidade }),
        });

        const resultado = await estoque.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}


export async function update_estoque(id, nome, data_aquisicao, valor_unitario, quantidade) {
    try {
        const estoque = await fetch("http://localhost:3000/api/estoque/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nome, data_aquisicao, valor_unitario, quantidade }),
        });

        const resultado = await estoque.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function update_quantidade(id, action, qtd) {
    try {
        const estoque = await fetch("http://localhost:3000/api/estoque/change", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, action, qtd }),
        });

        const resultado = await estoque.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}
