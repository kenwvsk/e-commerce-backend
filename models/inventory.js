const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  warehousetype: {
    type: String,
    required: [true, "Please add Warehouse"],
  },
  availableamount: {
    type: Number,
    required: [true, "Please add amount"],
  },
  sku: {
    type: mongoose.Schema.ObjectId,
    ref: "Sku",
    required: true,
  },
});

InventorySchema.pre("remove", async function (next) {
  console.log(`Stocks being removed from Inventory ${this._id}`);
  await this.model("Stock").updateMany(
    {},
    {
      '$pull': {
        'items': {
          'inventory': { _id : this._id},
        },
      },
    }
  );
  next();
});
//objectId product sku

module.exports = mongoose.model("Inventory", InventorySchema);
