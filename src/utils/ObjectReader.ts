import LineByLine = require('n-readlines');

export default class ObjectReader {
    private _filepath: string;

    constructor(filepath: string) {
        this._filepath = filepath;
    }

    public readObject = (): any[] => {
        /* using n-readlines module to read file line by line */
        const liner = new LineByLine(this._filepath);

        let line: any;

        /* create lists to which data will be pushed from file */
        const vertex_list: number[][] = [];
        const normal_list: number[][] = [];
        const index_list: number[][][] = [];

        /* read lines untill end of file */
        while (line = liner.next()) {
            /* if line is empty or comment - skip it */
            const words_in_line: string[] = line.toString().split(' ').filter((word: string) => word !== '')
            if (words_in_line.length === 0 || words_in_line[0] === '#') continue;

            /* get first word from line that corresponds to list of vertices, list of vertex normals or vertex indices */
            const parameter: string | undefined = words_in_line.shift();

            /* push data from line in corresponding list */
            switch (parameter) {
                case 'v':
                    const vertecies: number[] = [];
                    words_in_line.map(_ => vertecies.push(Number(_)));
                    vertex_list.push(vertecies);
                    break;
                case 'vn':
                    const normals: number[] = [];
                    words_in_line.map(_ => normals.push(Number(_)))
                    normal_list.push(normals);
                    break;
                case 'f':
                    const indexes_wrapper: number[][] = [];
                    words_in_line.map(word => {
                        const indexes: number[] = [];
                        word.split('/').filter((indx: string) => indx !== '').map(_ => indexes.push(Number(_)));
                        indexes_wrapper.push(indexes)
                    });
                    index_list.push(indexes_wrapper);
                    break;
                default:
                    break;
            }
        }

        console.log(`Finished reading file ${this._filepath}`)
        return [vertex_list, normal_list, index_list];
    }
}