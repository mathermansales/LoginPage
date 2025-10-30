const BACKEND_URL = "http://sua-url-do-backend-aqui/login"; 

document.addEventListener("DOMContentLoaded", function() {
    
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const messageElement = document.getElementById("message");

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = type;
    }

    loginForm.addEventListener("submit", async function(event) {
        
        event.preventDefault();

        showMessage("", ""); 

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

        const loginData = {
            username: username,
            password: password
        };
        
        try {
            showMessage("Enviando dados, aguarde...", "");
            
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(loginData) 
            });

            if (response.ok) {
                const data = await response.json(); 
                
                showMessage("Login bem-sucedido! Bem-vindo(a), " + data.user.name, "success");
                
                // Exemplo de ações futuras:
                // localStorage.setItem('authToken', data.token); 
                // window.location.href = "/dashboard.html"; 

            } else {
                const errorData = await response.json();
                
                showMessage("Erro de Login: " + (errorData.message || "Credenciais inválidas."), "error");
            }

        } catch (error) {
            console.error('Erro de rede ou servidor:', error);
            showMessage("Não foi possível conectar ao servidor. Verifique a URL.", "error");
        }
    });
});