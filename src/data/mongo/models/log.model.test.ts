import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugins";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('LogModel', () => {
  beforeAll( async() => {
    await MongoDatabase.connect(envs.MONGO_URL);
  });

  afterAll(()=>{
    mongoose.connection.close();
  });

  it('returns LogModel', async() => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'test-message',
      level: 'low'
    }

    const log = await LogModel.create(logData);
    expect(log).toEqual(expect.objectContaining({
      ...logData,
      createdAt: expect.any(Date),
      id: expect.any(String)
    }));

    await LogModel.findByIdAndDelete( log.id );
  });

  it('returns valid schema object', () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual(expect.objectContaining({
      message: { type: expect.any(Function), required: true },
      origin: { type: expect.any(Function) },
      level: {
        type: expect.any(Function),
        enum: [ 'low', 'medium', 'high' ],
        default: 'low'
      },
      createdAt: expect.any(Object)
    }));
  });
});
