import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [memes, setMemes] = useState(() => {
    const saved = localStorage.getItem("memes");
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: "ehh matram hint iste chalu", url: "/memes/ehh matram hint iste chalu.jpeg" },
      { id: 2, name: "Eda dorkina santha ra edhi", url: "/memes/edi ekadi santha.jpeg" },
      { id: 3, name: "esesadu baga esesadu", url: "/memes/esesadu baga esesadu.jpeg" },
      { id: 4, name: "edo tedda ga undi enti.?", url: "/memes/edho tedda ga undi.jpeg" },
      { id: 5, name: "edichav le po avthalki", url: "/memes/edichav le po avthalki.jpeg" },
      { id: 6, name: "orey apara", url: "/memes/orey apara.jpeg" },
      { id: 7, name: "evey taginchukunte manchidi", url: "/memes/evey taginchukunte manchidi.jpeg" },
      { id: 8, name: "abba sairam", url: "/memes/abba sairam.jpeg" },
      { id: 9, name: "ushhh", url: "/memes/ushhh.jpeg" },
      { id: 10, name: "delete chey bro", url: "/memes/delete chey bro.jpeg" },
      { id: 11, name: "bp bp tepinchaku", url: "/memes/bp bp tepinchaku.jpeg" },
      { id: 12, name: "entraa in prblm enti?", url: "/memes/entraa ni prblm.jpeg" },
      { id: 13, name: "good morning", url: "/memes/gud mrng.jpeg" },
      { id: 14, name: "khopdi tord sale ka", url: "/memes/kopdi todh sale ki.jpeg" },
      { id: 15, name: "abhi maza ayenga na biddu", url: "/memes/abhi maaza ayenga na biddu.jpeg" },
      { id: 16, name: "neelo edi asal expect cheyale bro", url: "/memes/neelo edi asal expect cheyale bro.jpeg" },
      { id: 17, name: "jai sri ram", url: "/memes/drlin.jpeg" }
    ];
  });

  const [newMeme, setNewMeme] = useState({ name: "", url: "" });

  useEffect(() => {
    localStorage.setItem("memes", JSON.stringify(memes));
  }, [memes]);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  const addMeme = (e) => {
    e.preventDefault();
    if (!newMeme.name || !newMeme.url) return;

    const memeToAdd = {
      id: Date.now(),
      name: newMeme.name,
      url: newMeme.url
    };

    setMemes([memeToAdd, ...memes]);
    setNewMeme({ name: "", url: "" });
  };

  const downloadMeme = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${name.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback for CORS issues
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = name + ".jpg";
      link.click();
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Meme<span>Mash</span></h1>
        <p className="subtitle">Download & Add Your Favorite Stickers</p>
      </header>

      <section className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search stickers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <form className="add-form" onSubmit={addMeme}>
          <input
            type="text"
            placeholder="Meme Name"
            value={newMeme.name}
            required
            onChange={(e) => setNewMeme({ ...newMeme, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Paste Image URL here..."
            value={newMeme.url}
            required
            onChange={(e) => setNewMeme({ ...newMeme, url: e.target.value })}
          />
          <button type="submit" className="add-btn">Add Sticker ✨</button>
        </form>
      </section>

      <main className="meme-grid">
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <div key={meme.id} className="meme-card">
              <div className="image-wrap">
                <img src={meme.url} alt={meme.name} loading="lazy" />
              </div>
              <div className="card-info">
                <p>{meme.name}</p>
                <button 
                  className="download-btn" 
                  onClick={() => downloadMeme(meme.url, meme.name)}
                >
                  Download ↓
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No stickers found for "{search}" 😅</p>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 MemeMash by Bora Akshaya Raju</p>
      </footer>
    </div>
  );
}

export default App;
