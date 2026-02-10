import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const [memes, setMemes] = useState([
    { id: 1, name: "ehh matram hint iste chalu", url: "/ehh matram hint iste chalu.jpeg" },
    { id: 2, name: "Eda dorkina santha ra edhi", url: "/edi ekadi santha.jpeg" },
    { id: 3, name: "esesadu baga esesadu", url: "/esesadu baga esesadu.jpeg" },
    { id: 4, name: "edo tedda ga undi enti.?", url: "/edho tedda ga undi.jpeg" },
    { id: 5, name: "edichav le po avthalki", url: "/edichav le po avthalki.jpeg" },
    { id: 6, name: "orey apara", url: "/orey apara.jpeg" },
    { id: 7, name: "evey taginchukunte manchidi", url: "/evey taginchukunte manchidi.jpeg" },
    { id: 8, name: "abba sairam", url: "/abba sairam.jpeg" },
    { id: 9, name: "ushhh", url: "/ushhh.jpeg" },
    { id: 10, name: "delete chey bro", url: "/delete chey bro.jpeg" },
    { id: 11, name: "bp bp tepinchaku", url: "/bp bp tepinchaku.jpeg" },
    { id: 12, name: "entraa in prblm enti?", url: "/entraa ni prblm.jpeg" },
    { id: 13, name: "good morning", url: "/gud mrng.jpeg" },
    { id: 14, name: "khopdi tord sale ka", url: "/kopdi todh sale ki.jpeg" },
    { id: 15, name: "abhi maza ayenga na biddu", url: "/abhi maaza ayenga na biddu.jpeg" },
    { id: 16, name: "neelo edi asal expect cheyale bro", url: "/neelo edi asal expect cheyale bro.jpeg" },
    { id: 17, name: "jai sri ram", url: "/drlin.jpeg" }

  ]);

  const [newMeme, setNewMeme] = useState({ name: "", url: "" });

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  const addMeme = (e) => {
    e.preventDefault();
    if (!newMeme.name || !newMeme.url) return;

    const memeToAdd = {
      id: memes.length + 1,
      name: newMeme.name,
      url: newMeme.url
    };

    setMemes([...memes, memeToAdd]);
    setNewMeme({ name: "", url: "" });
  };

  const downloadMeme = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name + ".jpg";
    link.click();
  };

  return (
    <div className="App">
      <h1>MemeMash</h1>

      <input
        type="text"
        placeholder="Search memes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={addMeme}>
        <input
          type="text"
          placeholder="Meme Name"
          value={newMeme.name}
          onChange={(e) =>
            setNewMeme({ ...newMeme, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL or /memes/image.jpg"
          value={newMeme.url}
          onChange={(e) =>
            setNewMeme({ ...newMeme, url: e.target.value })
          }
        />

        <button type="submit">Add Meme</button>
      </form>

      <div className="memes">
        {filteredMemes.map((meme) => (
          <div key={meme.id} className="card">
            <img src={meme.url} alt={meme.name} />
            <p>{meme.name}</p>
            <button onClick={() => downloadMeme(meme.url, meme.name)}>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
