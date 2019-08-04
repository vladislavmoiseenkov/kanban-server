const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const hashPassword = (user) => {
  const SALT_FACTOR = 10;

  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.set('password', hash);
};

const User = new Schema({
  id: Schema.ObjectId,
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [
      {
        validator: function (value) {
          return this.deleted
            ? true
            : /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Укажите, пожалуйста, корректный email.',
      }
    ],
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

User.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.methods.getUser = function() {
  return {
    _id: this._id,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

User.pre('save', function (next) {
  if(this.isModified()){
    const SALT_FACTOR = 10;

    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    const hash = bcrypt.hashSync(this.password, salt);
    this.set('password', hash);
  }

  next();
});

module.exports = mongoose.model('User', User);
