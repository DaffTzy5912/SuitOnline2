document.getElementById("createRoom").addEventListener("click", async () => {
  const res = await fetch("/api/createRoom", { method: "POST" });
  const data = await res.json();
  alert(`Kode Room: ${data.roomCode}`);
});

document.getElementById("joinRoom").addEventListener("click", async () => {
  const roomCode = document.getElementById("roomCode").value;
  const player = prompt("Masukkan nama Anda:");

  const res = await fetch("/api/joinRoom", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomCode, player }),
  });

  const data = await res.json();
  if (data.error) {
    alert(data.error);
  } else {
    document.getElementById("game").style.display = "block";
    document.getElementById("status").innerText = "Pilih suit!";
    
    document.querySelectorAll(".choice").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const choice = btn.getAttribute("data-choice");
        const playRes = await fetch("/api/play", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomCode, player, choice }),
        });
        const playData = await playRes.json();
        alert(playData.result || playData.message);
      });
    });
  }
});
