export async function get_all_os() {
    try {
        const os = await fetch("http://localhost:3000/api/os", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resultado = await os.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function get_os(id) {
    try {
        const os = await fetch(`http://localhost:3000/api/os/single/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resultado = await os.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function create_os(valor, descricao, cliente_id, pecas) {
    try {
        const os = await fetch("http://localhost:3000/api/os/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ valor, descricao, cliente_id, pecas }),
        });

        const resultado = await os.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}


export async function update_os(id, nome, telefone, cpf) {
    try {
        const os = await fetch("http://localhost:3000/api/os/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nome, telefone, cpf }),
        });

        const resultado = await os.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}
