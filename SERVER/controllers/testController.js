const { User, UserProfile, Car, Cargo, OrderCargo, Orders } = require('../models/models');

class TestController {
  async getUsers(req, res) {
    try {
        const newUser = await User.findAll();
        const users = await UserProfile.findAll();
        const orders = await OrderCargo.findAll();
        const orderss = await Orders.findAll();
        const cars = await Car.findAll();
        const cargos = await Cargo.findAll()
        const data = {newUser, users, orders, orderss, cars, cargos}
        return res.json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new TestController();
