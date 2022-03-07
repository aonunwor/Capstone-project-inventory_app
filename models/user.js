const mongoose = require(`mongoose`);
const { Schema } = mongoose;

// create a schema for register form

const userSchema = new Schema(
        {
                Firstname:{
                        type: String,
                        required: true,
                },
                Lastname:{
                    type: String,
                    required: true,
                },
                Email:{
                    type: Schema.Types.Mixed,
                    required: true,
                },
                PhoneNumber:{
                    type: Number,
                    maxlength: 11
                },
                Gender:{
                    type: String,
                    enum: [`Male`, `Female`, `Dash`]
                },
                DOB:{
                    type: Date,
                    required: true,
                },
                Address:{
                    type: String,
                    maxlength: 50,
                    required: true,
                },
                City:{
                    type: String,
                    maxlength: 20,
                    required: true,
                },
                State:{
                    type: String,
                    maxlength: 30,
                    required: true,
                },
                Password:{
                    type: Schema.Types.Mixed,
                    required: true,
                    minlength: 20
                },
                ConfirmPassword:{
                    type: Schema.Types.Mixed,
                    required: true,
                    minlength: 20
                },
        },
        {
                timestamps: true,
        }
)

//Create Model
const User= mongoose.model('User', userSchema);

//Export Model
module.exports = User;