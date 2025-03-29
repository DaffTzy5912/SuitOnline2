export default function handler(req, res) {
  if (req.method === 'POST') {
    const { roomCode, player, choice } = req.body;
    if (!rooms[roomCode]) {
      return res.status(404).json({ error: "Room tidak ditemukan" });
    }
    
    rooms[roomCode].choices[player] = choice;
    
    const players = rooms[roomCode].players;
    const choices = rooms[roomCode].choices;
    
    if (Object.keys(choices).length === 2) {
      const [p1, p2] = players;
      const result = determineWinner(choices[p1], choices[p2]);
      res.status(200).json({ result });
    } else {
      res.status(200).json({ message: "Menunggu pemain lain" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

function determineWinner(choice1, choice2) {
  const rules = { batu: "gunting", gunting: "kertas", kertas: "batu" };
  if (choice1 === choice2) return "Seri";
  return rules[choice1] === choice2 ? "P1 Menang" : "P2 Menang";
}
