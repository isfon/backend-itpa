import Product from './model'

const create = async (req, res) => {
  const newProduct = await Product.create({
     name: req.body.name,
     quantity: req.body.quantity,
     brand: req.body.brand,
     price: req.body.price
  })

  if (!newProduct)
    return res.status(400).json({
      status: 'failed',
      message: `Can't create product due to invalid details`,
    })

  res.status(200).json({
    status: 'success',
    product: newProduct
  })
}

const update = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

 res.status(200).json({
    status: 'success',
    product: updatedProduct
 })
}

const getList = async (req, res) => {
  console.log('get products')
  const products = await Product.find()

 res.status(200).json({
    status: 'success',
    data: products
 })
}

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)

 res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully'
 })
}


const controller = {
  create,
  update,
  getList,
  deleteProduct
}

export default controller
