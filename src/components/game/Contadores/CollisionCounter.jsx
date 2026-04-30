function CollisionCounter({ collisions }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "60px",
        left: "20px",
        color: "#ff4d4d",
        fontSize: "24px",
        fontWeight: "bold",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.6)",
        padding: "10px 16px",
        borderRadius: "10px",
        border: "2px solid #ff4d4d",
      }}
    >
      💥 Choques: {collisions}
    </div>
  );
}

export default CollisionCounter;