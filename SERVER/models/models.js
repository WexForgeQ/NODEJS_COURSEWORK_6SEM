const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// Модель User
const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING(200),
    },
    access_token: {
      type: DataTypes.STRING(200),
    }
  },
  {timestamps: false}
);
  
  // Модель UserProfile
  const UserProfile = sequelize.define('userprofile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      }
    },
    fio: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(30),
    },
    registration_date: {
      type: DataTypes.DATE,
    }
  },
  {timestamps: false});
  
  // Модель Car
  const Car = sequelize.define('car', {
    number: {
      type: DataTypes.STRING(15),
      primaryKey: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    driver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {timestamps: false});
  
  // Модель Cargo
  const Cargo = sequelize.define('cargo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {timestamps: false});
  
  // Модель Orders
  const Orders = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    car_id: {
      type: DataTypes.STRING(15),
      references: {
        model: Car,
        key: 'number'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departure_point: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    destination_point: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    order_status: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {timestamps: false});
  
  // Модель OrderCargo
  const OrderCargo = sequelize.define('ordercargo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cargo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cargo,
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Orders,
        key: 'id'
      }
    }
  },
  {timestamps: false});

  const GenerationKey = sequelize.define('generationkey', {
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    key: {
      type: DataTypes.INTEGER
    }
  },
  {timestamps: false});
  
  // Определение связей между моделями
  UserProfile.belongsTo(User, { foreignKey: 'id', targetKey: 'id' });
  User.hasOne(UserProfile, { foreignKey: 'id', sourceKey: 'id' });
  
  Car.belongsTo(User, { foreignKey: 'driver_id', targetKey: 'id' });
  User.hasMany(Car, { foreignKey: 'driver_id', sourceKey: 'id' });
  
  Cargo.belongsTo(User, { foreignKey: 'owner_id', targetKey: 'id' });
  User.hasMany(Cargo, { foreignKey: 'owner_id', sourceKey: 'id' });
  
  Orders.belongsTo(Car, { foreignKey: 'car_id', targetKey: 'number' });
  Car.hasMany(Orders, { foreignKey: 'car_id', sourceKey: 'number' });
  
  Orders.belongsTo(User, { foreignKey: 'customer_id', targetKey: 'id' });
  User.hasMany(Orders, { foreignKey: 'customer_id', sourceKey: 'id' });
  
  OrderCargo.belongsTo(Cargo, { foreignKey: 'cargo_id', targetKey: 'id' });
  Cargo.hasMany(OrderCargo, { foreignKey: 'cargo_id', sourceKey: 'id' });
  
  OrderCargo.belongsTo(Orders, { foreignKey: 'order_id', targetKey: 'id' });
  Orders.hasMany(OrderCargo, { foreignKey: 'order_id', sourceKey: 'id' });

  GenerationKey.belongsTo(User, { foreignKey: 'userid', targetKey: 'id' })
  User.hasOne(GenerationKey, { foreignKey: 'userid', targetKey: 'id' })

  module.exports = {
    User,
    UserProfile,
    Car,
    Cargo,
    Orders,
    OrderCargo, 
    GenerationKey
}
  