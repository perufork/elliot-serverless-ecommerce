import { products } from 'data'

export default ({ query: { id } }, res) => {
  const filtered = products.filter(p => p.id === id)

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res.status(404).json({ message: `Product with id: ${id} not found.` })
  }
}