const mongoose = require(`mongoose`);
const { Schema } = mongoose;

//create a schema
const prodSchema = new Schema(
    {
            itemImage:{
                    data: Buffer,
                    contentType: String
            },
            itemName:{
                    type: String,
                    //required: true
            },
            itemCategory:{
                    type: String,
                    enum: ['One', 'Two', 'Three']
            },
            itemSize:{
                    type: Number
            },
            itemQty:{
                type:Number
            }

    },
    {
            timestamps: true
    }
);

//Create Model
const Items = mongoose.model('Items', prodSchema);

//Export Model
module.exports = Items;