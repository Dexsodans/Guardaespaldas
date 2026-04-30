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
      }}
    >
      Choques: {collisions}
    </div>
  );
}

export default CollisionCounter;