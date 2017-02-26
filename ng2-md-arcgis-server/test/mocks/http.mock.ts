/**
 * Created by najorcruzcruz on 13/7/16.
 */


export class HttpMock {

    public returnedData: any;

    public toPromise = {
        toPromise: () => new Promise((fulfill, reject) => {
            fulfill({
                json: () => {
                    return this.returnedData;
                }
            })
        }),
        subscribe: () => {

        }
    };

    setReturnedData (data: any) {
        this.returnedData = data;
    }

    get(): any {
        return this.toPromise;
    }

    post(): any {
        return this.toPromise;
    }

    delete(): any {
        return this.toPromise;
    }

    put(): any {
        return this.toPromise;
    }

}