module.exports = {
  getAllUser: async (req, res) => {
    const users = await User.findAll()
    res.json({
      message: "Success get data",
      data: users
    })
  },

  getUserByID: async (req, res) => {
    const { id } = req.params
    const user = await User.findOne(id)
    res.json({
      message: "Success get data",
      data: user
    })
  },

  addUser: (req, res) => {
    const data = req.body

    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash

    const user = new User(data)

    // console.log(user)
    user.save()

    res.json({
      message: "data has been created!!",
    })
  },

  deleteUserByID: async (req, res) => {
    const { id } = req.params
    const user = await User.destroy(id)
    res.json({
      message: "Success delete data",
      data: user
    })
  },

  updateUserByID: async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    
    try {
      const data = await User.find(id);
      if (data) {
        const update = await User.update(
          {
            email: updateData.email, 
            password: updateData.password, 
            updatedAt: updateData.updatedAt,
          })

          update.save()
          
          res.json({
            message: "Success update data",
            data: update
          })
      } else {
        res.json({
          message: 'gagal update data'
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  },

  login: async (req, res) => {
    const data = req.body

    const user = await User.findOne({email: data.email})

    const checkPwd = bcrypt.compareSync(data.password, user.password)

    if (checkPwd) {
      res.json({
        message: "anda berhasil login",
        token: "masukkan token"
      })
    } else {
      res.json({
        message: "gagal login",
      })
    }
  },
}