import AJV from "ajv";
import { Result } from "./result";

const ajv = new AJV();

type ValidatorFunc<T> = (obj: any) => obj is T;

function validator<T>(schema: object): Result<ValidatorFunc<T>> {
    try {
        const valid = ajv.compile(schema);
        return Result.Ok((obj: any): obj is T => {
            return valid(obj) === true;
        });
    } catch (e) {
        return Result.Error(e);
    }
}

export class Validator<T> {
    public validate: ValidatorFunc<T>;
    constructor(schema: object) {
        this.validate = validator<T>(schema).unwrap();
    }
    public factory(obj: object): Result<T> {
        if (this.validate(obj)) {
            return Result.Ok(obj as T);
        } else {
            return Result.Error(new Error("Object did not validate against schema."));
        }
    }
}
