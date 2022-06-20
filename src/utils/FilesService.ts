export default class FilesService {
    private _default_path: string;

    constructor(default_path: string) {
        this._default_path = default_path;
    }

    /* returns path to input and output files */
    public getFiles = (): string[] => {
        let input_file: string = "";
        let output_file: string = "";

        const args = require('minimist')(process.argv.slice(2));
        if ('source' in args) input_file = this._default_path + args.source;
        if ('output' in args) output_file = this._default_path + args.output;

        return [input_file, output_file];
    }
}