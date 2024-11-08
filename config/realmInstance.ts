import Realm from 'realm';

// Define your schema models here
export class ActivityMd extends Realm.Object<ActivityMd> {
    _id!: Realm.BSON.ObjectId;
    user_id!: number;
    email!: string;

    static schema: Realm.ObjectSchema = {
        name: 'ActivityMd',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            user_id: 'number',
            email: 'string',
        },
    };
}

// Local Realm configuration (without sync)
export const getRealm = async (): Promise<Realm> => {
    const config: Realm.Configuration = {
        schema: [ActivityMd], // Add your schemas here
        schemaVersion: 1, // Increment this if you update the schema
    };

    return Realm.open(config);
};
