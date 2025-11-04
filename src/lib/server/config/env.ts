import 'dotenv/config'


const $ = process.env;

export const ENV = {
    postgresql: {
        host: $.POSTGRES_HOST || "localhost",
        port: +($.POSTGRES_PORT || 5432),
        dbName: $.POSTGRES_DB_NAME,
        user: $.POSTGRES_USER,
        password: $.POSTGRES_PASSWORD,
    }
}

export default ENV;


function checkENVEl(el: [unknown, number | string, ...unknown[]], stack: string[]) {
    return checkENVEntry(el[0], [...stack, el[1].toString()])
}

function checkENVEntry(entry: unknown, stack: string[] = []) {
    if (entry === null) return;
    if (entry === undefined) {
        throw new Error("An environment variable is missing: " + stack.join(":"));
    };

    if (typeof entry === "object") {    
        if (Array.isArray(entry)) {
            return entry.forEach((...v) => checkENVEl(v, stack));
        }

        return Object
            .entries(entry)
            .forEach((v) => checkENVEl(v.reverse() as any, stack));
    }
}

checkENVEntry(ENV);