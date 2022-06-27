const mongoose = require(`mongoose`);
const { Schema } = mongoose;

//create a schema
const prodSchema = new Schema(
    {
                itemStaff:{
                        type: Schema.Types.Mixed
                },
                staffId:{
                        type: Schema.Types.Mixed
                },
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