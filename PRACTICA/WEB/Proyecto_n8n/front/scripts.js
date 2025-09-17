    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById("submitBtn");
      const alertMessage = document.getElementById("alertMessage");
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      
      // Mostrar estado de carga
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
      alertMessage.classList.remove("show");
      
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        
        const data = await res.json();
        
        // Mostrar mensaje
        alertMessage.textContent = data.message;
        alertMessage.className = res.ok ? "alert success" : "alert error";
        alertMessage.classList.add("show");
        
      } catch (error) {
        alertMessage.textContent = "Error de conexión. Intenta nuevamente.";
        alertMessage.className = "alert error";
        alertMessage.classList.add("show");
      } finally {
        // Quitar estado de carga
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
    });