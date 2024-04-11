import mongoose from 'mongoose';
import 'dotenv/config';
import { test, assert, describe, onTestFinished } from 'vitest';
import Receipt from '../server/models/models.js';

describe('Database', function () {
	describe('testing database connection', function () {
		test('can we connect?', async function () {
			onTestFinished(() => mongoose.disconnect());
			assert.ok(
				await mongoose.connect(process.env.MONGO_URI),
				'should connect to database'
			);
		});
	});

	describe('testing memorize', function () {
		test("test's to see if we can find img filename in database", async function () {
      const controlVar = 'Target-pic-2-1024x999.jpg';
			onTestFinished(() => mongoose.disconnect());
      await mongoose.connect(process.env.MONGO_URI);
			const test = await Receipt.findOne({ fileName: controlVar });
			assert.ok(
				test,
				'should return database entry filename if its in database'
			);
		});
	});
});
