async function getPlayerStats() {
  const playerName = document.getElementById("playerName").value.trim();
  const statsDiv = document.getElementById("stats");
  const errorDiv = document.getElementById("error");
  statsDiv.classList.add("hidden");
  errorDiv.textContent = "";

  if (!playerName) {
    errorDiv.textContent = "Please enter a player name.";
    return;
  }

  try {
    const res = await fetch("http://sgp-free-4.sryzen.cloud:26577/players");
    const players = await res.json();

    const player = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());

    if (!player) {
      errorDiv.textContent = "Player not found.";
      return;
    }

    const kdr = player.deaths === 0 ? player.kills : (player.kills / player.deaths).toFixed(2);
    const playtimeMin = Math.floor(player.playtime / 60);
    const hours = Math.floor(playtimeMin / 60);
    const mins = playtimeMin % 60;
    const playtimeStr = `${hours > 0 ? hours + " hr " : ""}${mins} min`;

    document.getElementById("name").textContent = player.name;
    document.getElementById("kills").textContent = player.kills;
    document.getElementById("deaths").textContent = player.deaths;
    document.getElementById("kdr").textContent = kdr;
    document.getElementById("playtime").textContent = playtimeStr;

    statsDiv.classList.remove("hidden");
  } catch (err) {
    errorDiv.textContent = "Failed to load data. " + err;
  }
}
