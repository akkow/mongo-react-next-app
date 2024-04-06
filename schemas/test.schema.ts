import { Schema, model, models, Document, Model } from "mongoose";

export interface ITest extends Document {
    _id?: string;
    questions: string[];
    answers: string[];
}

const TestSchema: Schema = new Schema({
    id: { type: String },
    questions: [{ type: String }],
    answers: [{ type: String }]
});

export const Test: Model<ITest, {}, {}, {}, any> = 
    models.test || model<ITest>("tests", TestSchema)