export class Result<T, E = Error> {
    public static Ok<T, E>(arg: T): Result<T, E> {
        return new Result<T, E>(arg, false);
    }
    public static Error<T, E>(err: E): Result<T, E> {
        return new Result<T, E>(err, true);
    }
    constructor(private value: T | E, private isError: boolean) { }
    public match(): Promise<T> {
        return new Promise((resolve, reject) => {
            if (this.isError) {
                reject(this.value as E);
            } else {
                resolve(this.value as T);
            }
        });
    }
    public unwrap(): T {
        if (this.isError) {
            throw this.value as E;
        } else {
            return this.value as T;
        }
    }
}
