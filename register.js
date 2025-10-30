// Novo endpoint para o cadastro de usuário
const REGISTER_BACKEND_URL = "http://sua-url-do-backend-aqui/register"; 

document.addEventListener("DOMContentLoaded", function() {
    
    const registerForm = document.getElementById("register-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const messageElement = document.getElementById("message");

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = type;
    }

    registerForm.addEventListener("submit", async function(event) {
        
        event.preventDefault();

        showMessage("", ""); 

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

       
        if (password !== confirmPassword) {
            showMessage("As senhas digitadas não são idênticas. Por favor, verifique.", "error");
            return; 
        }

        
        const registerData = {
            username: username,
            email: email,
            password: password 
        };
        
        try {
            showMessage("Cadastrando usuário, aguarde...", "");
            
            const response = await fetch(REGISTER_BACKEND_URL, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(registerData) 
            });

            if (response.ok) {
                
                const data = await response.json(); 
                
                showMessage("Cadastro realizado com sucesso! Você pode fazer login agora.", "success");
                
                
                setTimeout(() => {
                    window.location.href = "index.html"; 
                }, 2000);

            } else {
                
                const errorData = await response.json();
                
                showMessage("Erro no Cadastro: " + (errorData.message || "Não foi possível criar a conta."), "error");
            }

        } catch (error) {
            console.error('Erro de rede ou servidor:', error);
            showMessage("Não foi possível conectar ao servidor. Tente novamente mais tarde.", "error");
        }
    });
});