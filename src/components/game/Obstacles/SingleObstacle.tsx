

export const SingleObstacle = ({ position }) => {
  return (
    <mesh position={position}>
      {/* Definimos la forma: un cubo de 1x1x1 */}
      <boxGeometry args={[1, 1, 1]} />
      {/* Definimos el material y color */}
      <meshStandardMaterial color="red" />
    </mesh>
  )
}