import { useEffect, useState } from "react";

export default function ArticleViewer() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil 1 artikel dari BekasiHitz
    fetch("https://bekasihitz.com/wp-json/wp/v2/posts/1935?_embed")
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.centerScreen}>
        <p style={{ color: "#555" }}>Memuat artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={styles.centerScreen}>
        <p style={{ color: "red" }}>Artikel tidak ditemukan 😢</p>
      </div>
    );
  }

  const featuredImage =
    article._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/800x400?text=No+Image";

  const authorName =
    article._embedded?.author?.[0]?.name || "Penulis Tidak Diketahui";

  const publishedDate = new Date(article.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={styles.container}>
      {/* Gambar utama */}
      <img
        src={featuredImage}
        alt={article.title.rendered}
        style={styles.featuredImage}
      />

      {/* Judul */}
      <h1
        style={styles.title}
        dangerouslySetInnerHTML={{ __html: article.title.rendered }}
      />

      {/* Info penulis */}
      <div style={styles.metaInfo}>
        <span>✍️ {authorName}</span>
        <span style={styles.dot}>•</span>
        <span>{publishedDate}</span>
      </div>

      {/* Isi artikel */}
      <div
        style={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content.rendered }}
      />

      {/* Tombol share */}
      <div style={styles.buttons}>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            article.link
          )}`}
          target="_blank"
          rel="noreferrer"
          style={{
            ...styles.button,
            backgroundColor: "#1DA1F2",
            color: "#fff",
          }}
        >
          Bagikan ke X
        </a>
        <a
          href={article.link}
          target="_blank"
          rel="noreferrer"
          style={{
            ...styles.button,
            backgroundColor: "#e0e0e0",
            color: "#333",
          }}
        >
          Baca di Situs Asli
        </a>
      </div>
    </div>
  );
}

// === Inline Styles ===
const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    lineHeight: "1.7",
    fontFamily: "'Segoe UI', sans-serif",
  },
  featuredImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "10px",
  },
  metaInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#777",
    marginBottom: "25px",
  },
  dot: {
    fontWeight: "bold",
  },
  content: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "40px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.2s ease-in-out",
  },
  centerScreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
};
